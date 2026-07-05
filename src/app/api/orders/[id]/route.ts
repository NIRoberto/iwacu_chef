import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { status } = await request.json()
  if (!status) {
    return NextResponse.json({ error: "Status required" }, { status: 400 })
  }
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    })
    return NextResponse.json(parseOrder(order))
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}

function parseOrder(order: { items: string } & Record<string, unknown>) {
  return {
    ...order,
    items: JSON.parse(order.items as string),
  }
}
