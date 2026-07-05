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
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { eventType: true },
    })
    return NextResponse.json(parseBooking(booking))
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}

function parseBooking(booking: { menuPlan: string } & Record<string, unknown>) {
  return {
    ...booking,
    menuPlan: JSON.parse(booking.menuPlan as string),
  }
}
