import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 })
  }
  initDb()
  const db = getDb()
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email)
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }
  const id = `user-${Date.now()}`
  db.prepare("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, 'customer')").run(id, name, email, password)
  const user = db.prepare("SELECT id, name, email, role, chefId FROM users WHERE id = ?").get(id)
  return NextResponse.json({ user }, { status: 201 })
}
