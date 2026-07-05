import type { Metadata } from "next"
import { orders } from "@/lib/data/orders"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Order Manager",
  description: "View and manage customer orders.",
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  preparing: "bg-brand-primary-light text-brand-primary",
  ready: "bg-green-50 text-green-700",
  completed: "bg-neutral-100 text-neutral-500",
  declined: "bg-red-50 text-red-700",
}

export default function ChefOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Orders</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-neutral-100 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold text-neutral-900">Order #{order.id}</span>
                <span className="text-sm text-neutral-400 ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`text-xs font-medium rounded-full px-3 py-1 capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.menuItemId} className="flex justify-between text-sm">
                  <span className="text-neutral-500">{item.quantity}x {item.name}</span>
                  <span className="text-neutral-700 font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-xs text-neutral-400">{order.note && `Note: ${order.note}`}</span>
              <span className="font-bold text-neutral-900">{formatCurrency(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
