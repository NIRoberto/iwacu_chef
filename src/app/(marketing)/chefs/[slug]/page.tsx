import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getChefBySlug, getMenuByChefId, getReviewsByChefId } from "@/lib/data-access"
import { MenuList } from "@/components/menu/MenuList"
import { ReviewSection } from "@/components/chefs/ReviewSection"
import { StarRating } from "@/components/ui/StarRating"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { CUISINE_COLORS } from "@/lib/constants"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) return { title: "Chef Not Found" }
  return { title: `${chef.name} — Iwacu Chef`, description: chef.title }
}

export default async function ChefDetailPage({ params }: Props) {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) notFound()

  const chefMenu = await getMenuByChefId(chef.id)
  const chefReviews = await getReviewsByChefId(chef.id)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Photo gallery */}
      <div className="relative aspect-[3/1] sm:aspect-[3.5/1] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-8">
        <Image
          src={chef.coverImage}
          alt={`${chef.name}'s kitchen`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            <Image
              src={chef.photo}
              alt={chef.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">{chef.name}</h1>
            <p className="text-sm text-white/80 mt-0.5">{chef.title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* About */}
          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">About {chef.name}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">{chef.story}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {chef.cuisineType.map((c) => (
                <Badge key={c} className={CUISINE_COLORS[c] ?? ""}>{c}</Badge>
              ))}
            </div>
          </section>

          {/* What I offer — Event types */}
          {chef.eventTypes && chef.eventTypes.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">What I offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chef.eventTypes.map((et) => (
                  <div key={et.id} className="flex items-start gap-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
                    <span className="text-2xl mt-0.5">{et.icon}</span>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{et.name}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{et.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Menu */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Menu</h2>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">{chefMenu.length} items</span>
            </div>
            <MenuList items={chefMenu} />
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Reviews</h2>
              <span className="flex items-center gap-1 text-sm text-neutral-500">
                <StarRating rating={chef.rating} size="sm" />
                ({chef.reviewCount})
              </span>
            </div>
            <ReviewSection reviews={chefReviews} />
          </section>
        </div>

        {/* Sidebar — Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {chef.priceRange === 1 ? "$" : chef.priceRange === 2 ? "$$" : "$$$"}
              </span>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                {chef.priceRange === 1 ? "Affordable" : chef.priceRange === 2 ? "Moderate" : "Premium"}
              </span>
            </div>

            <div className="flex items-center gap-1 mb-4">
              <StarRating rating={chef.rating} size="sm" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">
                {chef.rating} ({chef.reviewCount} reviews)
              </span>
            </div>

            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{chef.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>{chef.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span>{chef.deliveryAvailable ? "Delivery available" : "Pickup only"}</span>
              </div>
            </div>

            {chef.eventTypes && chef.eventTypes.length > 0 && (
              <>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Caters for</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {chef.eventTypes.map((et) => (
                    <Badge key={et.id} className="bg-brand-primary-light text-brand-primary text-xs">
                      {et.icon} {et.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            <Link href={`/chefs/${chef.slug}/book`}>
              <Button className="w-full">Book {chef.name.split(" ")[0]}</Button>
            </Link>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-3">
              You won&apos;t be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
