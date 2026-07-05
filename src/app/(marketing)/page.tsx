import Link from "next/link"
import { getAllChefs, getEventTypes } from "@/lib/data-access"
import { ChefCard } from "@/components/chefs/ChefCard"
import { EVENT_ICONS } from "@/lib/icons"

interface Props {
  searchParams: Promise<{ event?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { event: activeEvent } = await searchParams
  const chefs = await getAllChefs()
  const eventTypes = await getEventTypes()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Browse chefs
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {chefs.length} home chef{chefs.length !== 1 ? "s" : ""} near you
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !activeEvent
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-brand-primary hover:text-brand-primary"
          }`}
        >
          All
        </Link>
        {eventTypes.map((et) => (
          <Link
            key={et.id}
            href={`/?event=${et.slug}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeEvent === et.slug
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-brand-primary hover:text-brand-primary dark:hover:border-brand-primary"
            }`}
          >
            {(() => {
              const Icon = EVENT_ICONS[et.name]
              return Icon ? <Icon className="w-3.5 h-3.5" /> : null
            })()}
            {et.name}
          </Link>
        ))}
      </div>

      {/* Chefs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs
          .filter((chef) => !activeEvent || chef.eventTypes?.some((et) => et.slug === activeEvent))
          .map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </div>
  )
}
