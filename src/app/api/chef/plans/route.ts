import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT(request: Request) {
  const { plans } = await request.json()
  if (!plans || !Array.isArray(plans)) {
    return NextResponse.json({ error: "Invalid plans data" }, { status: 400 })
  }

  try {
    const chef = await prisma.chef.findFirst()
    if (!chef) return NextResponse.json({ error: "No chef found" }, { status: 404 })

    for (const plan of plans) {
      const { dayOfWeek, items } = plan
      const existing = await prisma.weeklyPlan.findUnique({
        where: { chefId_dayOfWeek: { chefId: chef.id, dayOfWeek } },
      })
      if (existing) {
        await prisma.weeklyPlan.update({
          where: { id: existing.id },
          data: { items: JSON.stringify(items) },
        })
      } else {
        await prisma.weeklyPlan.create({
          data: {
            id: `plan-${chef.id}-${dayOfWeek}-${Date.now()}`,
            chefId: chef.id,
            dayOfWeek,
            items: JSON.stringify(items),
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save plans" }, { status: 500 })
  }
}
