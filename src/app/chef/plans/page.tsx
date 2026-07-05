import type { Metadata } from "next"
import prisma from "@/lib/prisma"
import { PlanEditor } from "./PlanEditor"

export const metadata: Metadata = {
  title: "Weekly Plans — Chef Dashboard",
  description: "Manage your weekly cooking schedule.",
}

export default async function ChefPlansPage() {
  const chefs = await prisma.chef.findMany()
  const chef = chefs[0]
  if (!chef) return <p className="text-neutral-400">No chef found</p>

  const menuItems = await prisma.menuItem.findMany({
    where: { chefId: chef.id, available: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  })

  const plans = await prisma.weeklyPlan.findMany({
    where: { chefId: chef.id },
    orderBy: { dayOfWeek: "asc" },
  })

  const items = menuItems.map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    price: m.price,
    prepTime: m.prepTime,
  }))

  const planData = plans.map((p) => ({
    dayOfWeek: p.dayOfWeek,
    items: JSON.parse(p.items) as string[],
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Weekly Plans</h1>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
          Set what you cook each day of the week. Customers will see this on the Chef Plans page.
        </p>
      </div>
      <PlanEditor chefName={chef.name} items={items} initialPlans={planData} />
    </div>
  )
}
