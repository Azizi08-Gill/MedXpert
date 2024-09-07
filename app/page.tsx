import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Link from "next/link";
import { GridBackground } from "@/components/ui/GridBackground";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <GridBackground>
      <div className="flex items-center justify-center h-screen">
        {isAdmin && <PassKeyModal />}
        
        <div className="max-w-[496px] w-full text-center">
          <h1 className="mb-12 text-2xl font-bold">Welcome to CarePulse</h1>

          <PatientForm />

          <div className="text-sm mt-8 flex justify-between">
            <p className="text-dark-600">
              © 2024 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
