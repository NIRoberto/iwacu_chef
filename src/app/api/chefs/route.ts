import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function GET() {
  initDb()
  const db = getDb()
  const chefs = db.prepare("SELECT * FROM chefs ORDER BY featured DESC, rating DESC").all() as Record<string, unknown>[]
  return NextResponse.json(chefs.map(parseChef))
}

function parseChef(chef: Record<string, unknown>) {
  return {
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType as string),
    featured: Boolean(chef.featured),
    deliveryAvailable: Boolean(chef.deliveryAvailable),
    pickupAvailable: Boolean(chef.pickupAvailable),
  }
}
