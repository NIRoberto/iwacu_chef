"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"

export function CartContent() {
  const [items] = useState<{ name: string; price: number; quantity: number }[]>([])

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🛒</div>
        <p className="text-neutral-400 text-lg">Your cart is empty.</p>
        <p className="text-neutral-300 text-sm mt-1">Browse chefs and add items to get started.</p>
        <Link
          href="/chefs"
          className="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Browse chefs
        </Link>
      </div>
    )
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div>
      <div className="space-y-3 mb-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-4">
            <div>
              <p className="font-medium text-neutral-900">{item.name}</p>
              <p className="text-sm text-neutral-400">Qty: {item.quantity}</p>
            </div>
            <span className="font-medium text-neutral-900">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 mb-6">
        <div className="flex justify-between font-bold text-lg text-neutral-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Button className="w-full">Place order</Button>
    </div>
  )
}
