import type { Metadata } from "next"
import Link from "next/link"
import { getDb, initDb } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chef Dashboard",
  description: "Manage your chef profile, menu, and orders.",
}

interface OrderRow {
  id: string
  items: string
  total: number
  status: string
}

export default function DashboardPage() {
  initDb()
  const db = getDb()
  const rows = db.prepare("SELECT id, items, total, status FROM orders ORDER BY createdAt DESC").all() as OrderRow[]

  const totalOrders = rows.length
  const totalRevenue = rows.reduce((sum, r) => sum + r.total, 0)
  const pendingOrders = rows.filter((r) => r.status === "pending").length

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total orders", value: totalOrders },
          { label: "Revenue", value: formatCurrency(totalRevenue) },
          { label: "Pending", value: pendingOrders },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
            <p className="text-sm text-neutral-400 dark:text-neutral-500">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent orders</h2>
      <div className="space-y-3">
        {rows.slice(0, 5).map((row) => {
          const items = JSON.parse(row.items) as { menuItemId: string; name: string; quantity: number; price: number }[]
          return (
            <div key={row.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">Order #{row.id.slice(-8)}</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">{items.length} item{items.length > 1 ? "s" : ""}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(row.total)}</p>
                <span className="text-xs font-medium text-brand-secondary capitalize">{row.status}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <Link
          href="/chef/orders"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          View all orders &rarr;
        </Link>
      </div>
    </div>
  )
}
