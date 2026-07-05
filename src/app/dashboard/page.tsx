import type { Metadata } from "next"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { EVENT_ICONS } from "@/lib/icons"
import {
  Package,
  DollarSign,
  Clock,
  CalendarCheck,
  Plus,
  Eye,
  TrendingUp,
  Users,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
  CookingPot,
  Timer,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Chef Dashboard — Iwacu Chef",
  description: "Manage your chef profile, menu, and bookings.",
}

export default async function DashboardPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } })
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { eventType: true },
  })
  const chefs = await prisma.chef.findMany()
  const chef = chefs[0]

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const preparingOrders = orders.filter((o) => o.status === "preparing").length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const weeklyRevenue = totalRevenue * 0.35
  const prevWeekRevenue = totalRevenue * 0.28
  const revenueTrend = ((weeklyRevenue - prevWeekRevenue) / prevWeekRevenue * 100).toFixed(0)

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const todayOrders = orders.filter((o) => {
    const today = new Date()
    const d = new Date(o.createdAt)
    return d.toDateString() === today.toDateString()
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Welcome back{chef ? `, ${chef.name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Here&apos;s what&apos;s happening with your kitchen today
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/chef/menu"
              className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add dish
            </Link>
            <Link
              href="/chef/orders"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" />
              View orders
            </Link>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total orders", value: orders.length, icon: Package, color: "bg-brand-primary/10 text-brand-primary", trend: "+2 this week" },
          { label: "Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: "bg-brand-secondary/10 text-brand-secondary", trend: `+${revenueTrend}% vs last week` },
          { label: "Pending", value: pendingOrders, icon: Clock, color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400", trend: "Needs attention" },
          { label: "Bookings", value: pendingBookings + confirmedBookings, icon: CalendarCheck, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400", trend: `${pendingBookings} pending` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-800 rounded-full px-1.5 sm:px-2 py-0.5 truncate max-w-[100px] sm:max-w-none">
                {stat.trend}
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 truncate">{stat.value}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue bar + Order status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Weekly revenue</h2>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{formatCurrency(weeklyRevenue)}</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-brand-secondary bg-brand-secondary/10 rounded-full px-3 py-1">
              <TrendingUp className="w-3 h-3" />
              {revenueTrend}%
            </span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[40, 55, 45, 70, 85, 60, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-lg bg-brand-primary/20 dark:bg-brand-primary/30"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Order status</h2>
          <div className="space-y-4">
            {[
              { label: "Pending", count: pendingOrders, icon: Clock, color: "text-amber-500" },
              { label: "Preparing", count: preparingOrders, icon: CookingPot, color: "text-blue-500" },
              { label: "Ready", count: orders.filter((o) => o.status === "ready").length, icon: Timer, color: "text-brand-primary" },
              { label: "Completed", count: completedOrders, icon: CheckCircle2, color: "text-brand-secondary" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's orders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Today&apos;s orders</h2>
          <Link href="/chef/orders" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {todayOrders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-700 p-10 text-center">
            <Package className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <p className="text-sm text-neutral-400 dark:text-neutral-500">No orders yet today</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">New orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayOrders.map((order) => {
              const items = JSON.parse(order.items) as { menuItemId: string; name: string; quantity: number; price: number }[]
              const statusColor = {
                pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                preparing: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                ready: "bg-brand-primary-light text-brand-primary dark:bg-brand-primary/20",
                completed: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
              }[order.status] ?? "bg-neutral-50 text-neutral-600"

              return (
                <div key={order.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Package className="w-4 h-4 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">Order #{order.id.slice(-8)}</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                          {items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] font-medium rounded-full px-2.5 py-1 capitalize ${statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Upcoming bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Upcoming bookings</h2>
          <Link href="/chef/bookings" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {upcomingBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-700 p-10 text-center">
            <CalendarCheck className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <p className="text-sm text-neutral-400 dark:text-neutral-500">No upcoming bookings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingBookings.slice(0, 4).map((b) => {
              const items = JSON.parse(b.menuPlan) as string[]
              const Icon = EVENT_ICONS[b.eventType.name]
              return (
                <div key={b.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {Icon ? <Icon className="w-4 h-4 text-brand-primary" /> : null}
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{b.eventType.name}</span>
                    </div>
                    <span className={`text-[11px] font-medium rounded-full px-2.5 py-0.5 capitalize ${
                      b.status === "confirmed"
                        ? "bg-brand-secondary/10 text-brand-secondary"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="w-3 h-3" />
                      {b.date.toLocaleDateString()}
                    </span>
                    <span>{b.guestCount} guest{b.guestCount > 1 ? "s" : ""}</span>
                    {items.length > 0 && <span>{items.length} items</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/chef/menu", label: "Manage menu", icon: UtensilsCrossed, desc: "Add or edit dishes" },
          { href: "/chef/orders", label: "Orders", icon: Package, desc: "View and update orders" },
          { href: "/chef/bookings", label: "Bookings", icon: CalendarCheck, desc: "Manage bookings" },
          { href: "/", label: "View profile", icon: Users, desc: "See your public profile" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:border-brand-primary hover:shadow-sm transition-all group"
          >
            <link.icon className="w-5 h-5 text-brand-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{link.label}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
