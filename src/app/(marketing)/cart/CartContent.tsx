"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"
import type { Order } from "@/types"

export function CartContent() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🛒</div>
        <p className="text-neutral-400 dark:text-neutral-500 text-lg">Your cart is empty.</p>
        <p className="text-neutral-300 dark:text-neutral-500 text-sm mt-1">Browse chefs and add items to get started.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Browse chefs
        </Link>
      </div>
    )
  }

  function handlePlaceOrder() {
    const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]")
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      customerId: "customer-1",
      chefId: items[0].menuItem.chefId,
      items: items.map((i) => ({
        menuItemId: i.menuItem.id,
        name: i.menuItem.name,
        quantity: i.quantity,
        price: i.menuItem.price,
      })),
      status: "pending",
      total,
      createdAt: new Date().toISOString(),
      pickupTime: "12:00",
      note: "",
    }
    orders.unshift(newOrder)
    localStorage.setItem("orders", JSON.stringify(orders))
    clearCart()
    router.push("/my-orders")
  }

  return (
    <div>
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div
            key={item.menuItem.id}
            className="flex items-center justify-between rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <div className="flex-1">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.menuItem.name}</p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">{formatCurrency(item.menuItem.price)} each</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
                >
                  −
                </button>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.menuItem.id)}
                  className="ml-4 text-xs text-accent-error hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {formatCurrency(item.menuItem.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-4 mb-6">
        <div className="flex justify-between font-bold text-lg text-neutral-900 dark:text-neutral-100">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={handlePlaceOrder}>
        Place order
      </Button>
    </div>
  )
}
