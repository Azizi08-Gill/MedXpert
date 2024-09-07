import RegisterForm from '@/components/forms/RegisterForm'
import * as Sentry from "@sentry/nextjs"
import { getUser } from '@/lib/actions/patient.actions'
import Head from 'next/head'

const Register = async ({ params: { userId } }: { params: { userId: string } }) => {
  const user = await getUser(userId);

  // Track the registration view event
  Sentry.metrics.set("user_view_register", user.name);

  return (
    <>
      {/* Inject the Google Font via the <Head> component */}
      <Head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');`}
        </style>
      </Head>

      {/* Main container with the Ubuntu font applied */}
      <div className="flex h-screen max-h-screen font-ubuntu">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col">
            {/* Registration Form */}
            <RegisterForm user={user} />

            {/* Footer */}
            <p className="copyright py-12">
              © 2024 MedXpert
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default Register
