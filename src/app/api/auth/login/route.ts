import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 })
  }
  initDb()
  const db = getDb()
  const user = db.prepare("SELECT id, name, email, role, chefId FROM users WHERE email = ? AND password = ?").get(email, password) as Record<string, unknown> | undefined
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }
  return NextResponse.json({ user })
}
