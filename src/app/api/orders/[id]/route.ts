import { NextResponse } from "next/server"
import { getDb, initDb } from "@/lib/db"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { status } = await request.json()
  if (!status) {
    return NextResponse.json({ error: "Status required" }, { status: 400 })
  }
  initDb()
  const db = getDb()
  const result = db.prepare("UPDATE orders SET status = ?, updatedAt = datetime('now') WHERE id = ?").run(status, id)
  if (result.changes === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as Record<string, unknown>
  return NextResponse.json(parseOrder(order))
}

function parseOrder(order: Record<string, unknown>) {
  return {
    ...order,
    items: JSON.parse(order.items as string),
  }
}
