import type { Metadata } from "next"
import { CartContent } from "./CartContent"

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your order before placing it.",
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6 sm:mb-8">Your cart</h1>
      <CartContent />
    </div>
  )
}
