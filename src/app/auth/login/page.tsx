import type { Metadata } from "next"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Iwacu Chef account.",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>
        <p className="mt-2 text-neutral-500">Sign in to your Iwacu Chef account</p>
      </div>
      <LoginForm />
    </div>
  )
}
