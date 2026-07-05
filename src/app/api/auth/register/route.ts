import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 })
  }
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }
  const id = `user-${Date.now()}`
  const user = await prisma.user.create({
    data: { id, name, email, password, role: "customer" },
    select: { id: true, name: true, email: true, role: true, chefId: true },
  })
  return NextResponse.json({ user }, { status: 201 })
}
