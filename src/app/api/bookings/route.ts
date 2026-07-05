import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chefId = searchParams.get("chefId")
  const customerId = searchParams.get("customerId")

  let bookings
  if (chefId) {
    bookings = await prisma.booking.findMany({
      where: { chefId },
      orderBy: { createdAt: "desc" },
      include: { eventType: true },
    })
  } else if (customerId) {
    bookings = await prisma.booking.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: { eventType: true },
    })
  } else {
    bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, include: { eventType: true } })
  }

  return NextResponse.json(bookings.map(parseBooking))
}

export async function POST(request: Request) {
  const { chefId, customerId, eventTypeId, date, guestCount, menuPlan, note, total } = await request.json()
  if (!chefId || !customerId || !eventTypeId || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const id = `booking-${Date.now()}`
  const booking = await prisma.booking.create({
    data: {
      id,
      chefId,
      customerId,
      eventTypeId,
      date: new Date(date),
      guestCount: guestCount || 1,
      menuPlan: JSON.stringify(menuPlan || []),
      note: note || "",
      status: "pending",
      total: total || 0,
    },
    include: { eventType: true },
  })
  return NextResponse.json(parseBooking(booking), { status: 201 })
}

function parseBooking(booking: { menuPlan: string } & Record<string, unknown>) {
  return {
    ...booking,
    menuPlan: JSON.parse(booking.menuPlan as string),
  }
}
