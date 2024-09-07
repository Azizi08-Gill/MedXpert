import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getUser } from '@/lib/actions/patient.actions'
import * as Sentry from "@sentry/nextjs"

const Register = async ({params : {userId}} : SearchParamProps) => {
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification  | Passkey Modal*/}
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col">
          
          <RegisterForm user = {user}/>

            <p className="copyright py-12">
              © 2024 MedXpert
            </p>
        </div>
      </section>

    </div>
  )
}

export default Register