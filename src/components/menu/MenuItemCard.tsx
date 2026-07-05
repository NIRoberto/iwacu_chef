"use client"

import { useState } from "react"
import type { MenuItem } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/Badge"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article className="flex gap-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 transition-shadow hover:shadow-sm">
      <div className="w-24 h-24 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{item.name}</h3>
          <span className="text-sm font-semibold text-brand-primary whitespace-nowrap">
            {formatCurrency(item.price)}
          </span>
        </div>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1.5">
            <Badge variant="info" className="text-[10px]">{item.serves} serving{item.serves > 1 ? "s" : ""}</Badge>
            {item.dietary.map((d) => (
              <Badge key={d} variant="success" className="text-[10px]">{d}</Badge>
            ))}
          </div>
          <button
            onClick={handleAdd}
            className={`text-xs font-medium rounded-full px-3 py-1 transition-colors ${
              added
                ? "bg-brand-secondary text-white"
                : "bg-brand-primary-light text-brand-primary hover:bg-brand-primary hover:text-white"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </article>
  )
}
