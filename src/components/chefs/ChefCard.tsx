import Link from "next/link"
import Image from "next/image"
import type { Chef } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { StarRating } from "@/components/ui/StarRating"
import { EVENT_ICONS } from "@/lib/icons"

interface ChefCardProps {
  chef: Chef
}

export function ChefCard({ chef }: ChefCardProps) {
  return (
    <Link href={`/chefs/${chef.slug}`} className="group block">
      <article className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 transition-shadow hover:shadow-lg dark:hover:shadow-neutral-900/60">
        <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={chef.coverImage}
            alt={`${chef.name}'s kitchen`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs font-semibold bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-neutral-700 dark:text-neutral-300 shadow-sm">
              {chef.priceRange === 1 ? "$" : chef.priceRange === 2 ? "$$" : "$$$"}
            </span>
          </div>
          {chef.featured && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold bg-brand-primary text-white rounded-full px-3 py-1 shadow-sm">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-brand-primary transition-colors">
              {chef.name}
            </h3>
            <StarRating rating={chef.rating} size="sm" />
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{chef.title}</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{chef.location}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {chef.eventTypes?.slice(0, 2).map((et) => (
              <Badge key={et.id} className="text-xs border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-600 dark:text-neutral-400">
                {(() => {
                  const Icon = EVENT_ICONS[et.name]
                  return Icon ? <Icon className="w-3 h-3 inline mr-0.5" /> : null
                })()}
                {et.name}
              </Badge>
            ))}
            {(chef.eventTypes?.length ?? 0) > 2 && (
              <span className="text-xs text-neutral-400 dark:text-neutral-500 self-center">+{chef.eventTypes!.length - 2} more</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
