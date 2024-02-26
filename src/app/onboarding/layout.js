import { redirect } from 'next/navigation'

let onboardingComplete = false

export default function RootLayout({ children }) {
  // Check if a user has completed onboarding
  // If yes, redirect them to /calendar
//   if (onboardingComplete === true) {
//     redirect('/calendar')
//   }

  return <>{children}</>
}