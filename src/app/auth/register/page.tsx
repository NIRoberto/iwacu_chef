import type { Metadata } from "next"
import { RegisterForm } from "./RegisterForm"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Iwacu Chef account and start ordering homemade meals.",
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm px-4 py-10 sm:py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Join Iwacu Chef</h1>
        <p className="mt-2 text-neutral-500">Create your account to get started</p>
      </div>
      <RegisterForm />
    </div>
  )
}
