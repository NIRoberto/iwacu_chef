import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const chef = await prisma.chef.findUnique({ where: { slug } })
  if (!chef) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType),
  })
}
