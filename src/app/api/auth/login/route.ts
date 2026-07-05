import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 })
  }
  const user = await prisma.user.findFirst({
    where: { email, password },
    select: { id: true, name: true, email: true, role: true, chefId: true },
  })
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }
  return NextResponse.json({ user })
}
