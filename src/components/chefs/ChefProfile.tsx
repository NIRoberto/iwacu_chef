import type { Chef } from "@/types"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { StarRating } from "@/components/ui/StarRating"
import { CUISINE_COLORS } from "@/lib/constants"

interface ChefProfileProps {
  chef: Chef
}

export function ChefProfile({ chef }: ChefProfileProps) {
  return (
    <div>
      <div className="aspect-[3/1] rounded-2xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden mb-6">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${chef.coverImage})` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <Avatar src={chef.photo} name={chef.name} size="xl" className="sm:mt-1" />
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{chef.name}</h1>
          <p className="text-lg text-neutral-400 dark:text-neutral-500 mt-1">{chef.title}</p>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <StarRating rating={chef.rating} size="md" showValue />
            <span className="text-sm text-neutral-400">({chef.reviewCount} reviews)</span>
            <span className="text-neutral-200">|</span>
            <span className="text-sm text-neutral-400">{chef.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {chef.cuisineType.map((c) => (
              <Badge key={c} className={CUISINE_COLORS[c] ?? ""}>{c}</Badge>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-300">🕐</span>
              <span>{chef.operatingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-300">📍</span>
              <span>{chef.deliveryAvailable ? "Delivery available" : "Pickup only"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-300">💰</span>
              <span>{chef.priceRange === 1 ? "Affordable" : chef.priceRange === 2 ? "Moderate" : "Premium"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">About {chef.name}</h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed whitespace-pre-line">{chef.story}</p>
      </div>
    </div>
  )
}
