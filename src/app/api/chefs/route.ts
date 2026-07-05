import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const chefs = await prisma.chef.findMany({ orderBy: [{ featured: "desc" }, { rating: "desc" }] })
  return NextResponse.json(chefs.map(parseChef))
}

function parseChef(chef: { cuisineType: string; featured: boolean; deliveryAvailable: boolean; pickupAvailable: boolean } & Record<string, unknown>) {
  return {
    ...chef,
    cuisineType: JSON.parse(chef.cuisineType as string),
  }
}
