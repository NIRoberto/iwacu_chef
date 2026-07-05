import type { Metadata } from "next"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { EVENT_ICONS } from "@/lib/icons"

export const metadata: Metadata = {
  title: "Chef Dashboard",
  description: "Manage your chef profile, menu, and bookings.",
}

export default async function DashboardPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } })
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { eventType: true },
  })

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending")

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Orders", value: orders.length },
          { label: "Revenue", value: formatCurrency(totalRevenue) },
          { label: "Pending orders", value: pendingOrders },
          { label: "Booking requests", value: pendingBookings },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
            <p className="text-sm text-neutral-400 dark:text-neutral-500">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Upcoming bookings</h2>
      <div className="space-y-3 mb-10">
        {upcomingBookings.length === 0 ? (
          <p className="text-sm text-neutral-400 dark:text-neutral-500">No upcoming bookings.</p>
        ) : (
          upcomingBookings.slice(0, 5).map((b) => {
            const items = JSON.parse(b.menuPlan) as string[]
            return (
              <div key={b.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                    {(() => {
                      const Icon = EVENT_ICONS[b.eventType.name]
                      return Icon ? <Icon className="w-4 h-4 inline mr-1" /> : null
                    })()}
                    {b.eventType.name}
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {b.date.toLocaleDateString()} · {b.guestCount} guest{b.guestCount > 1 ? "s" : ""} · {items.length} menu items
                  </p>
                </div>
                <span className={`text-xs font-medium rounded-full px-3 py-1 capitalize ${
                  b.status === "confirmed" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}>
                  {b.status}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Recent orders */}
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent orders</h2>
      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => {
          const items = JSON.parse(order.items) as { menuItemId: string; name: string; quantity: number; price: number }[]
          return (
            <div key={order.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">Order #{order.id.slice(-8)}</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">{items.length} item{items.length > 1 ? "s" : ""}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(order.total)}</p>
                <span className="text-xs font-medium text-brand-secondary capitalize">{order.status}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/chef/orders"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          View all orders &rarr;
        </Link>
        <Link
          href="/chef/bookings"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          View all bookings &rarr;
        </Link>
      </div>
    </div>
  )
}
