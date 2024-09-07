import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import AppointmentForm from '@/components/forms/AppointmentForm'
import * as Sentry from "@sentry/nextjs"

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen overflow-hidden">
      <section className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="max-w-[860px] w-full flex flex-col items-center">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={40}
            width={160}
            alt="MedXpert Logo"
            className="mb-12"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
            className="w-full max-w-lg"
          />

          <p className="copyright mt-10 py-6 text-gray-600">
            © 2024 MedXpert
          </p>
        </div>
      </section>

      <div className="hidden md:flex items-center justify-center flex-1 bg-blue-50">
        <Image
          src="/assets/images/appointment-img.png"
          height={600}
          width={400}
          alt="Appointment"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default NewAppointment
