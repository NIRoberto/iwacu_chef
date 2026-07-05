import type { Metadata } from "next"
import prisma from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusBadge } from "./OrderStatusBadge"

export const metadata: Metadata = {
  title: "Order Manager",
  description: "View and manage customer orders.",
}

export default async function ChefOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Orders</h1>

      <div className="space-y-3">
        {orders.map((row: { id: string; chefId: string; customerId: string; items: string; status: string; total: number; note: string; pickupTime: string; createdAt: Date }) => {
          const items = JSON.parse(row.items) as { menuItemId: string; name: string; quantity: number; price: number }[]
          return (
            <div key={row.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">Order #{row.id.slice(-8)}</span>
                  <span className="text-sm text-neutral-400 dark:text-neutral-500 ml-3 whitespace-nowrap">{row.createdAt.toLocaleDateString()}</span>
                </div>
                <OrderStatusBadge orderId={row.id} status={row.status} />
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.menuItemId} className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">{item.quantity}x {item.name}</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{row.note ? `Note: ${row.note}` : ""}</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formatCurrency(row.total)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
