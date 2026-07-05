"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"

interface OrderItem {
  menuItemId: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customerId: string
  chefId: string
  items: OrderItem[]
  status: string
  total: number
  note: string
  pickupTime: string
  createdAt: string
}

const statusBadge: Record<string, "warning" | "info" | "success" | "default" | "error"> = {
  pending: "warning",
  confirmed: "info",
  preparing: "info",
  ready: "success",
  completed: "default",
  declined: "error",
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!user.id) {
      setLoading(false)
      return
    }
    fetch(`/api/orders?customerId=${user.id}`)
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">My orders</h1>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 animate-pulse">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-4" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-2" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">My orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-400 dark:text-neutral-500 text-lg">No orders yet.</p>
          <Link
            href="/"
            className="mt-4 inline-flex text-brand-primary text-sm font-medium hover:text-brand-primary-hover transition-colors"
          >
            Browse chefs &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">Order #{order.id.slice(-8)}</span>
                  <span className="text-sm text-neutral-400 dark:text-neutral-500 ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <Badge variant={statusBadge[order.status]}>{order.status}</Badge>
              </div>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.menuItemId} className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">{item.quantity}x {item.name}</span>
                    <span className="text-neutral-700 dark:text-neutral-300">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              {order.note && (
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500 italic">Note: {order.note}</p>
              )}
              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between font-bold text-neutral-900 dark:text-neutral-100">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
