import createLogger from "v2/Utils/logger"
import RelayQueryResponseCache from "relay-runtime/lib/network/RelayQueryResponseCache"
import { isServer } from "lib/environment"
import { cache } from "lib/relayCacheClient"

import {
  GraphQLResponse,
  QueryResponseCache,
  CacheConfig as RelayCacheConfig,
  Variables as RelayVariables,
} from "relay-runtime"

const logger = createLogger("v2/Artsy/middleware/cache/Cache")

export interface CacheConfig {
  size: number
  ttl: number // in milliseconds
  disableServerSideCache?: boolean
}

export class Cache {
  cacheConfig: CacheConfig
  enableServerSideCache: boolean
  relayCache: RelayQueryResponseCache

  constructor(cacheConfig: CacheConfig) {
    this.cacheConfig = cacheConfig
    this.enableServerSideCache =
      isServer && !this.cacheConfig.disableServerSideCache
    this.initRelayCache()
  }

  initRelayCache() {
    this.relayCache = new QueryResponseCache(this.cacheConfig)
  }

  getCacheKey(queryId: string, variables: RelayVariables) {
    const cacheKey = JSON.stringify({ queryId, variables })
    return cacheKey
  }

  async get(queryId: string, variables: RelayVariables) {
    let cachedRes = this.relayCache.get(queryId, variables)

    // No cache in relay store, check redis
    if (this.enableServerSideCache && !cachedRes) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        cachedRes = JSON.parse(await cache.get(cacheKey))
        if (cachedRes) {
          logger.log("\n[RelayCache#get] Success", cacheKey)
        }
      } catch (error) {
        logger.error("[RelayCache#get] Error", cacheKey, error)
      }
    }

    return cachedRes
  }

  async set(
    queryId: string,
    variables: RelayVariables,
    res: GraphQLResponse,
    options: { cacheConfig: RelayCacheConfig }
  ) {
    this.relayCache.set(queryId, variables, res)

    // Store in redis during server-side pass
    if (this.enableServerSideCache && !options?.cacheConfig?.force) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        /**
         * Set a value with an expiry in MS.
         * @see https://redis.io/commands/set
         * @see https://github.com/NodeRedis/node-redis/issues/1000#issuecomment-193155582
         */
        await cache.set(
          cacheKey,
          JSON.stringify(res),
          "PX",
          this.cacheConfig.ttl
        )
        logger.log("\n[RelayCache#set] Success", cacheKey)
      } catch (error) {
        logger.error("[RelayCache#set] Error", cacheKey, error)
      }
    }
  }

  async clear() {
    this.relayCache.clear()

    if (isServer) {
      // TODO: How should we handle clear's here?
      // await this.redisCache.flushall()
    }
  }
}
