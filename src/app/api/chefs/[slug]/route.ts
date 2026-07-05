import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  initDb()
  const db = getDb()
  const chef = db.prepare("SELECT * FROM chefs WHERE slug = ?").get(slug) as Record<string, unknown> | undefined
  if (!chef) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType as string),
    featured: Boolean(chef.featured),
    deliveryAvailable: Boolean(chef.deliveryAvailable),
    pickupAvailable: Boolean(chef.pickupAvailable),
  })
}
