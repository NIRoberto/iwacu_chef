import type { Metadata } from "next"
import Link from "next/link"
import { orders } from "@/lib/data/orders"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chef Dashboard",
  description: "Manage your chef profile, menu, and orders.",
}

export default function DashboardPage() {
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total orders", value: totalOrders },
          { label: "Revenue", value: formatCurrency(totalRevenue) },
          { label: "Pending", value: pendingOrders },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 bg-white p-5">
            <p className="text-sm text-neutral-400">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Recent orders</h2>
      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => (
          <div key={order.id} className="rounded-xl border border-neutral-100 bg-white p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Order #{order.id}</p>
              <p className="text-sm text-neutral-400">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">{formatCurrency(order.total)}</p>
              <span className="text-xs font-medium text-brand-secondary capitalize">{order.status}</span>
            </div>
          </div>
        ))}
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
