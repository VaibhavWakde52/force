import { data as sd } from "sharify"
import { fetchDestinations } from "./fetchDestinations"
import { getConsentAndLoad } from "./getConsentAndLoad"

const SEGMENT_WRITE_KEY = sd.SEGMENT_WRITE_KEY
const SEGMENT_MAPPING = "C0001" // assign OneTrust category to Segment itself.

let PREVIOUS_CONSENT = ""
let SEGMENT_DESTINATIONS = []

let ONETRUST_ENABLED = false
if (sd.ONETRUST_SCRIPT_ID) {
  ONETRUST_ENABLED = true
}

export function loadSegment() {
  console.log("loadSegment called")

  if (ONETRUST_ENABLED) {
    // OneTrust is enabled, load Segment based on OneTrust consent.
    fetchDestinations(SEGMENT_WRITE_KEY).then(async destinations => {
      SEGMENT_DESTINATIONS = destinations
      PREVIOUS_CONSENT = await getConsentAndLoad(
        SEGMENT_DESTINATIONS,
        PREVIOUS_CONSENT,
        SEGMENT_MAPPING,
        SEGMENT_WRITE_KEY
      )

      // OneTrust calls OptanonWrapper when there's a consent change. Hook into it.
      window.OptanonWrapper = reconsentHook
    })
  } else {
    // OneTrust is disabled. Load Segment normally - load all Segment destinations.
    // @ts-ignore
    window.analytics.load(SEGMENT_WRITE_KEY)
  }
}

async function reconsentHook() {
  console.log("reconsentHook called")
  PREVIOUS_CONSENT = await getConsentAndLoad(
    SEGMENT_DESTINATIONS,
    PREVIOUS_CONSENT,
    SEGMENT_MAPPING,
    SEGMENT_WRITE_KEY
  )
}
