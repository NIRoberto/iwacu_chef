"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: Record<string, string>) => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      router.push("/")
    } else {
      alert("Invalid email or password.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Enter your password"
        required
        autoComplete="current-password"
      />
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  )
}
