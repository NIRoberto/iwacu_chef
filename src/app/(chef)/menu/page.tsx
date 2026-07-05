import type { Metadata } from "next"
import { menuItems } from "@/lib/data/menus"
import { MenuItemCard } from "@/components/menu/MenuItemCard"

export const metadata: Metadata = {
  title: "Menu Manager",
  description: "Manage your menu items.",
}

export default function ChefMenuPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Menu</h1>
        <a
          href="#"
          className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Add item
        </a>
      </div>

      <p className="text-sm text-neutral-400 mb-6">{menuItems.length} items</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
