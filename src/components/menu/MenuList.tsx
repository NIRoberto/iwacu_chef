"use client"

import { useState } from "react"
import type { MenuItem } from "@/types"
import { MenuItemCard } from "./MenuItemCard"

interface MenuListProps {
  items: MenuItem[]
}

export function MenuList({ items }: MenuListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...new Set(items.map((i) => i.category))]

  const filtered = selectedCategory === "All" ? items : items.filter((i) => i.category === selectedCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-brand-primary text-white"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-400 py-10">No items in this category.</p>
      )}
    </div>
  )
}
