import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const chef = await prisma.chef.findUnique({ where: { slug }, select: { id: true } })
  if (!chef) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const items = await prisma.menuItem.findMany({ where: { chefId: chef.id }, orderBy: [{ category: "asc" }, { name: "asc" }] })
  return NextResponse.json(items.map(parseItem))
}

function parseItem(item: { dietary: string } & Record<string, unknown>) {
  return {
    ...item,
    dietary: JSON.parse(item.dietary as string),
  }
}
