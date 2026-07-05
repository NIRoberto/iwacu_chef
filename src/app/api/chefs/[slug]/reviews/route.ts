import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  initDb()
  const db = getDb()
  const chef = db.prepare("SELECT id FROM chefs WHERE slug = ?").get(slug) as Record<string, unknown> | undefined
  if (!chef) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const reviews = db.prepare("SELECT * FROM reviews WHERE chefId = ? ORDER BY date DESC").all(chef.id) as Record<string, unknown>[]
  return NextResponse.json(reviews)
}
