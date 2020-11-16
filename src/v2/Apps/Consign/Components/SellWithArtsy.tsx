import React from "react"
import { Box, Button, Flex, Image, Link, Text, color } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

export const SellWithArtsy: React.FC = () => {
  return (
    <SectionContainer
      borderBottom={`1px solid ${color("black10")}`}
      borderTop={`1px solid ${color("black10")}`}
      py={0}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box pr={[2, 9]}>
          <Text variant="largeTitle" mb={1}>
            Get the Artsy iOS app
          </Text>
          <Text variant="text" color="black60" mb={4}>
            A Smarter, Faster Way to Sell Your Art.
          </Text>
          <Link
            href="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
            target="_blank"
          >
            <Button>Download the app</Button>
          </Link>
        </Box>
        <Box>
          <Media greaterThanOrEqual="sm">
            <Image
              height={320}
              width="auto"
              src="https://files.artsy.net/consign/banner-large.jpg"
            />
          </Media>
          <Media lessThan="sm">
            <Image
              height={270}
              width="auto"
              src="https://files.artsy.net/consign/banner-small.jpg"
            />
          </Media>
        </Box>
      </Flex>
    </SectionContainer>
  )
}
