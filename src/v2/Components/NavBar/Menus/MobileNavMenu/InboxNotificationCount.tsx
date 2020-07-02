import React, { useContext } from "react"
import { graphql } from "relay-runtime"
import cookie from "cookies-js"
import { isServer } from "lib/environment"
import styled from "styled-components"

import {
  InboxNotificationCountQuery,
  InboxNotificationCountQueryResponse,
} from "v2/__generated__/InboxNotificationCountQuery.graphql"
import { SystemContext } from "v2/Artsy/SystemContext"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

import { Flex, Sans, color } from "@artsy/palette"

const FloatingDot = styled(Flex)`
  background-color: ${color("purple100")};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  left: 19px;
`

const getConversationCount = () =>
  (!isServer && cookie.get("conversation-count")) || 0

const updateConversationCache = (conversationCount?: number) => {
  if (typeof conversationCount === "number") {
    conversationCount === 0
      ? cookie.expire("conversation-count")
      : cookie.set("conversation-count", conversationCount)
  }
}

export const InboxNotificationCount: React.FC<
  { error?: any } & Partial<InboxNotificationCountQueryResponse>
> = ({ error, me }) => {
  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)
  if (getConversationCount() === 0) return null

  return (
    <FloatingDot>
      <Sans size="2" color={color("white100")}>
        {conversationCount}
      </Sans>
    </FloatingDot>
  )
}

export const InboxNotificationCountQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <InboxNotificationCount />
  ) : (
    <QueryRenderer<InboxNotificationCountQuery>
      environment={relayEnvironment}
      query={graphql`
        query InboxNotificationCountQuery {
          me {
            unreadConversationCount
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        return <InboxNotificationCount error={error} {...props} />
      }}
    />
  )
}
