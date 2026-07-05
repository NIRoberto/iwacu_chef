"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/types"
import { Plus, Check, ShoppingCart } from "lucide-react"

interface Props {
  item: MenuItem
  variant?: "compact" | "full"
}

export function AddToCartButton({ item, variant = "full" }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleAdd}
        className={`shrink-0 inline-flex items-center justify-center rounded-md w-5 h-5 transition-all ${
          added
            ? "bg-brand-secondary/10 text-brand-secondary"
            : "text-neutral-400 dark:text-neutral-500 hover:text-brand-primary"
        }`}
        title="Add to cart"
      >
        {added ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm ${
        added
          ? "bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20"
          : "bg-brand-primary text-white hover:bg-brand-primary-hover border border-brand-primary"
      }`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          Add
        </>
      )}
    </button>
  )
}
