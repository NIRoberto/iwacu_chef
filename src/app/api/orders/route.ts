import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chefId = searchParams.get("chefId")
  const customerId = searchParams.get("customerId")

  let orders
  if (chefId) {
    orders = await prisma.order.findMany({ where: { chefId }, orderBy: { createdAt: "desc" } })
  } else if (customerId) {
    orders = await prisma.order.findMany({ where: { customerId }, orderBy: { createdAt: "desc" } })
  } else {
    orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } })
  }

  return NextResponse.json(orders.map(parseOrder))
}

export async function POST(request: Request) {
  const { customerId, chefId, items, total, note, pickupTime } = await request.json()
  if (!customerId || !chefId || !items) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const id = `order-${Date.now()}`
  const order = await prisma.order.create({
    data: {
      id,
      customerId,
      chefId,
      items: JSON.stringify(items),
      status: "pending",
      total,
      note: note || "",
      pickupTime: pickupTime || "12:00",
    },
  })
  return NextResponse.json(parseOrder(order), { status: 201 })
}

function parseOrder(order: { items: string } & Record<string, unknown>) {
  return {
    ...order,
    items: JSON.parse(order.items as string),
  }
}
