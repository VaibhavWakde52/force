// @ts-check

import chalk from "chalk"
import merge from "webpack-merge"
import fs from "fs"
import path from "path"
import { bundleAnalyzer } from "./plugins/bundleAnalyzer"
import { env, basePath } from "./utils/env"
import { clientCommonConfig } from "./envs/clientCommonConfig"
import { clientDevelopmentConfig } from "./envs/clientDevelopmentConfig"
import { clientProductionConfig } from "./envs/clientProductionConfig"
import { novoDevelopmentConfig } from "./envs/novoDevelopmentConfig"
import { novoProductionConfig } from "./envs/novoProductionConfig"
import { serverConfig } from "./envs/serverConfig"

const getServerConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment || env.isProduction:
      console.log("[Force Server] Building server-side code...")
      return serverConfig
  }

  throw new Error(`[Force Server] Unsupported environment ${env.nodeEnv}`)
}

const getClientConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment:
      const cacheDirectory = path.resolve(basePath, ".cache")

      if (!env.onCi && !fs.existsSync(cacheDirectory)) {
        console.log(
          chalk.yellow(
            "\n[!] No existing `.cache` directory detected, initial " +
              "launch will take a while.\n"
          )
        )
      }

      return merge.smart(clientCommonConfig, clientDevelopmentConfig)

    case env.isProduction:
      console.log("[Force Client] Building client-side production code...")
      return merge.smart(clientCommonConfig, clientProductionConfig)
  }

  throw new Error(`[Force Client] Unsupported environment ${env.nodeEnv}`)
}

const getNovoClientConfig = () => {
  switch (true) {
    case env.isDevelopment:
      console.log("[Force Novo] Building client-side development code...")
      return novoDevelopmentConfig

    case env.isProduction:
      console.log("[Force Novo] Building client-side production code...")
      return novoProductionConfig
  }

  throw new Error(`[Force Novo] Unsupported environment ${env.nodeEnv}`)
}

function generateEnvBasedConfig() {
  if (process.env.AUTO_CONFIGURE) {
    return {}
  }

  // Verify that only a single build is selected.
  if (
    !env.buildClient &&
    !env.buildServer &&
    !env.buildNovoClient &&
    !env.buildNovoServer
  ) {
    console.log("Must build either the CLIENT or SERVER.")
    process.exit(1)
  } else if (
    (env.buildClient && env.buildServer) ||
    (env.buildNovoClient && env.buildNovoServer)
  ) {
    console.log("Must only build CLIENT or SERVER.")
    process.exit(1)
  }

  // Select the correct base config.
  let config
  if (env.buildClient) {
    config = getClientConfig()
  } else if (env.buildServer) {
    config = getServerConfig()
  } else if (env.buildNovoClient) {
    config = getNovoClientConfig()
  } else {
    console.log(chalk.red("No build selected."))
    process.exit(1)
  }

  // Optionally analyze the bundle
  config = bundleAnalyzer(config)

  // Support configuration dumps for a basic insights into the webpack configuration.
  if (env.enableWebpackDumpConfig) {
    fs.writeFileSync(
      process.env.WEBPACK_DUMP_CONFIG,
      JSON.stringify(config, null, 2)
    )
  }

  return config
}

module.exports = generateEnvBasedConfig()

if (process.env.AUTO_CONFIGURE) {
  module.exports.createConfig = function (config, options) {
    if (config === "novo.dev") {
      return novoDevelopmentConfig
    } else if (config === "novo.prod") {
      return novoProductionConfig
    } else if (config === "force.dev") {
      return merge.smart(clientCommonConfig, clientDevelopmentConfig)
    } else if (config === "force.prod") {
      return merge.smart(clientCommonConfig, clientProductionConfig)
    } else if (config === "server.dev") {
      return serverConfig
    } else if (config === "server.prod") {
      return serverConfig
    }
  }
}
