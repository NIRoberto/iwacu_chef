import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "./LoginForm"
import { ChefHat } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Iwacu Chef account.",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm px-4 py-10 sm:py-16">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-6 h-6 text-brand-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Welcome back</h1>
          <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">Sign in to your account</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-neutral-400 dark:text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
