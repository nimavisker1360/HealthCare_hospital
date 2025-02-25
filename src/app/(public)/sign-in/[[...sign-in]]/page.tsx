import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn fallbackRedirectUrl='/admin/dashboard' />
}