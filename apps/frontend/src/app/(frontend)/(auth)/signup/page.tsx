'use client'
import { SignupForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-100 flex flex-col">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
