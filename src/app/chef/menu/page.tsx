import type { Metadata } from "next"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { MenuItemCard } from "@/components/menu/MenuItemCard"
import type { MenuItem } from "@/types"

export const metadata: Metadata = {
  title: "Menu Manager",
  description: "Manage your menu items.",
}

export default async function ChefMenuPage() {
  const rows = await prisma.menuItem.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] })
  const items: MenuItem[] = rows.map(mapMenuItem)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Menu</h1>
        <Link
          href="#"
          className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Add item
        </Link>
      </div>

      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">{items.length} items</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function mapMenuItem(row: { id: string; chefId: string; name: string; description: string; price: number; image: string; category: string; available: boolean; dietary: string; serves: number; prepTime: string }): MenuItem {
  return {
    id: row.id,
    chefId: row.chefId,
    name: row.name,
    description: row.description,
    price: row.price,
    image: row.image,
    category: row.category,
    available: row.available,
    dietary: JSON.parse(row.dietary),
    serves: row.serves,
    prepTime: row.prepTime,
  }
}
