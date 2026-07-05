import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const chef = await prisma.chef.findUnique({ where: { slug }, select: { id: true } })
  if (!chef) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const reviews = await prisma.review.findMany({ where: { chefId: chef.id }, orderBy: { createdAt: "desc" } })
  return NextResponse.json(reviews)
}
