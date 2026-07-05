"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((u: Record<string, string>) => u.email === email)) {
      alert("An account with this email already exists.")
      return
    }
    const user = { name, email, password }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(user))
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your full name"
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="At least 8 characters"
        required
        minLength={8}
        autoComplete="new-password"
      />
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        By creating an account, you agree to our terms and privacy policy.
      </p>
    </form>
  )
}
