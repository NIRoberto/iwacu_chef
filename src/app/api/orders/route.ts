import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chefId = searchParams.get("chefId")
  const customerId = searchParams.get("customerId")
  initDb()
  const db = getDb()

  let rows: Record<string, unknown>[]
  if (chefId) {
    rows = db.prepare("SELECT * FROM orders WHERE chefId = ? ORDER BY createdAt DESC").all(chefId) as Record<string, unknown>[]
  } else if (customerId) {
    rows = db.prepare("SELECT * FROM orders WHERE customerId = ? ORDER BY createdAt DESC").all(customerId) as Record<string, unknown>[]
  } else {
    rows = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC").all() as Record<string, unknown>[]
  }

  return NextResponse.json(rows.map(parseOrder))
}

export async function POST(request: Request) {
  const { customerId, chefId, items, total, note, pickupTime } = await request.json()
  if (!customerId || !chefId || !items) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  initDb()
  const db = getDb()
  const id = `order-${Date.now()}`
  db.prepare(
    "INSERT INTO orders (id, customerId, chefId, items, status, total, note, pickupTime) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)"
  ).run(id, customerId, chefId, JSON.stringify(items), total, note || "", pickupTime || "12:00")
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as Record<string, unknown>
  return NextResponse.json(parseOrder(order), { status: 201 })
}

function parseOrder(order: Record<string, unknown>) {
  return {
    ...order,
    items: JSON.parse(order.items as string),
  }
}
