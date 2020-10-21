import { query, setCookie, setupArtistSignUpModal } from "../artistSignupModal"
import * as helpers from "desktop/lib/openAuthModal"

jest.mock("desktop/components/cookies/index.coffee", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))
jest.mock("lib/mediator", () => ({
  mediator: {
    trigger: jest.fn(),
    on: jest.fn(),
  },
}))

const CookiesSetMock = require("desktop/components/cookies/index.coffee")
  .set as jest.Mock

const CookiesGetMock = require("desktop/components/cookies/index.coffee")
  .get as jest.Mock

const mediatorOn = require("lib/mediator").mediator.on as jest.Mock

jest.mock("lib/metaphysics2.coffee", () =>
  jest.fn().mockReturnValue(Promise.resolve({}))
)

jest.spyOn(helpers, "handleScrollingAuthModal")

const handleScrollingAuthModal = require("desktop/lib/openAuthModal")
  .handleScrollingAuthModal
const mockMetaphysics = require("lib/metaphysics2.coffee")

jest.mock("sharify", () => ({
  data: {
    ARTIST_PAGE_CTA_ARTIST_ID: "claes-oldenburg",
    ARTIST_PAGE_CTA_ENABLED: true,
  },
}))

describe("CTA", () => {
  const artist = {
    id: "claes-oldenburg",
    name: "Claes Oldenburg",
    href: "/artist/claes-oldenburg",
    image: {
      thumb: {
        resized: {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
        },
      },
    },
    artists: [
      {
        image: {
          thumb: {
            resized: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
            },
          },
        },
      },
    ],
    filterArtworksConnection: {
      edges: [
        {
          node: {
            image: {
              cropped: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
              },
            },
          },
        },
      ],
    },
  }

  let addEventListener
  beforeEach(() => {
    addEventListener = jest.spyOn(window, "addEventListener")
    mockMetaphysics.mockReturnValue(Promise.resolve({ artist }))
  })

  afterEach(() => {
    mediatorOn.mockClear()
    handleScrollingAuthModal.mockClear()
  })

  it("should get artist data when artist cta is enabled and there is an artist id", async () => {
    await setupArtistSignUpModal()

    expect(mockMetaphysics).toBeCalledWith({
      method: "post",
      query: query,
      variables: { artistID: artist.id },
    })
  })

  it("should set up a scroll event listener", async () => {
    await setupArtistSignUpModal()

    expect(handleScrollingAuthModal).toBeCalledWith({
      copy:
        "Join Artsy to discover new works by Claes Oldenburg and more artists you love",
      destination: "https://artsy.net/",
      image: "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA",
      intent: "viewArtist",
      triggerSeconds: 4,
      contextModule: "popUpModal",
    })

    expect(addEventListener).toHaveBeenCalled()
    expect(addEventListener.mock.calls[0][0]).toBe("scroll")
    expect(addEventListener.mock.calls[0][2]).toEqual({ once: true })
  })
  it("#setCookie sets a cookie", () => {
    setCookie()
    expect(CookiesSetMock).toBeCalledWith("artist-page-signup-dismissed", 1, {
      expires: 3600,
    })
  })
  it("calls set cookie on modal close", async () => {
    await setupArtistSignUpModal()
    expect(mediatorOn).toBeCalledWith("modal:closed", setCookie)
  })

  it("doesn't open the modal if the dismissed modal cookie is set", () => {
    CookiesGetMock.mockReturnValueOnce(true)
    setupArtistSignUpModal()
    expect(handleScrollingAuthModal).not.toHaveBeenCalled()
  })
})
