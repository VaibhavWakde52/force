import { FC } from "react"
import { Spacer, Box } from "@artsy/palette"
import { useRouter } from "v2/System/Router/useRouter"
import { OnboardingProvider } from "v2/Components/Onboarding/useOnboardingContext"
import { OnboardingDebug } from "v2/Components/Onboarding/Components/OnboardingDebug"
import { OnboardingSteps } from "v2/Components/Onboarding/Components/OnboardingSteps"

export const OnboardingApp: FC = () => {
  const { router } = useRouter()

  const handleDone = () => {
    router.push("/")
  }

  return (
    <OnboardingProvider onDone={handleDone}>
      <OnboardingDebug />

      <Spacer mt={2} />

      <Box height={700} border="1px dotted" borderColor="black10">
        <OnboardingSteps />
      </Box>
    </OnboardingProvider>
  )
}
