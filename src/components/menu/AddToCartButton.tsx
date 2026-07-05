"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/types"
import { Plus, Check } from "lucide-react"

interface Props {
  item: MenuItem
}

export function AddToCartButton({ item }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${
        added
          ? "bg-brand-secondary/10 text-brand-secondary"
          : "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white"
      }`}
    >
      {added ? (
        <>
          <Check className="w-2.5 h-2.5" />
          Added
        </>
      ) : (
        <>
          <Plus className="w-2.5 h-2.5" />
          Add
        </>
      )}
    </button>
  )
}
