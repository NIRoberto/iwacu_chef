import Link from "next/link"
import type { Chef } from "@/types"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { StarRating } from "@/components/ui/StarRating"

interface ChefCardProps {
  chef: Chef
}

export function ChefCard({ chef }: ChefCardProps) {
  return (
    <Link href={`/chefs/${chef.slug}`} className="group block">
      <article className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-neutral-900/60">
        <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${chef.coverImage})` }}
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={chef.photo} name={chef.name} size="md" />
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-primary transition-colors">
                  {chef.name}
                </h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">{chef.location}</p>
              </div>
            </div>
            <span className="text-xs text-neutral-300 whitespace-nowrap">{chef.priceRange === 1 ? "$" : chef.priceRange === 2 ? "$$" : "$$$"}</span>
          </div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{chef.title}</p>
          <div className="mt-3 flex items-center justify-between">
            <StarRating rating={chef.rating} size="sm" />
            <Badge>{chef.cuisineType[0]}</Badge>
          </div>
        </div>
      </article>
    </Link>
  )
}
