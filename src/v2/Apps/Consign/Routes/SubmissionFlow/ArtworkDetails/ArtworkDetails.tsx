import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "v2/System/Router/useRouter"
import uuid from "uuid"
import { useSubmission, UtmParams } from "../Utils/useSubmission"
import { artworkDetailsValidationSchema } from "../Utils/validation"
import { BackLink } from "v2/Components/Links/BackLink"

export const ArtworkDetails: React.FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()
  const { submission, saveSubmission, submissionId } = useSubmission(
    id ? id : uuid()
  )

  const handleSubmit = (values: ArtworkDetailsFormModel) => {
    const isLimitedEditionRarity = values.rarity === "limited edition"
    const utmParamsData = sessionStorage.getItem("utmParams")

    const artworkDetailsForm = {
      ...values,
      editionNumber: isLimitedEditionRarity ? values.editionNumber : "",
      editionSize: isLimitedEditionRarity ? values.editionSize : "",
    }

    for (let key in artworkDetailsForm) {
      if (typeof artworkDetailsForm[key] !== "string") {
        artworkDetailsForm[key] = artworkDetailsForm[key] || undefined
      } else {
        artworkDetailsForm[key] =
          artworkDetailsForm[key] && artworkDetailsForm[key].trim()
      }
    }

    if (utmParamsData) {
      const utmParams: UtmParams = utmParamsData && JSON.parse(utmParamsData)
      saveSubmission(
        submission
          ? { ...submission, artworkDetailsForm, utmParams }
          : { artworkDetailsForm, utmParams }
      )
    } else {
      saveSubmission(
        submission
          ? { ...submission, artworkDetailsForm }
          : { artworkDetailsForm }
      )
    }

    router.replace({
      pathname: `/consign/submission/${submissionId}/artwork-details`,
    })
    router.push({
      pathname: `/consign/submission/${submissionId}/upload-photos`,
    })
  }

  return (
    <>
      <BackLink py={2} mb={6} to="/consign">
        Back
      </BackLink>

      <SubmissionStepper currentStep="Artwork Details" />

      <Text mt={4} variant="lg" as="h1">
        Tell us about your artwork
      </Text>

      <Text mt={1} variant="sm" color="black60">
        &#8226; All fields are required to submit a work.
      </Text>
      <Text mb={[2, 6]} variant="sm" color="black60">
        &#8226; Unfortunately we are not accepting consignments directly from
        artists at this time.
      </Text>

      <Formik<ArtworkDetailsFormModel>
        initialValues={getArtworkDetailsFormInitialValues()}
        onSubmit={handleSubmit}
        validationSchema={artworkDetailsValidationSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              width={["100%", "auto"]}
              data-test-id="save-button"
              type="submit"
              size="medium"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Save and Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
