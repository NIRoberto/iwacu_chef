import Link from "next/link"
import { getAllChefs, getEventTypes } from "@/lib/data-access"
import { ChefCard } from "@/components/chefs/ChefCard"
import { EVENT_ICONS } from "@/lib/icons"

export default async function HomePage() {
  const chefs = await getAllChefs()
  const eventTypes = await getEventTypes()

  const featured = chefs.filter((c) => c.featured)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary-light/50 dark:bg-brand-primary-light/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Find the perfect chef for your event
            </h1>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl">
              Browse local chefs, explore their menus, and book them for weddings, private dinners, corporate events, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {eventTypes.slice(0, 4).map((et) => (
                <Link
                  key={et.id}
                  href={`/?event=${et.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-brand-primary hover:text-brand-primary dark:hover:border-brand-primary transition-colors"
                >
                  {(() => {
                    const Icon = EVENT_ICONS[et.name]
                    return Icon ? <Icon className="w-4 h-4" /> : null
                  })()}
                  {et.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                All events &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured chefs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">Featured chefs</h2>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">Top-rated home chefs ready to cook for your occasion</p>
          </div>
          <Link
            href="/about"
            className="hidden sm:inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      </section>

      {/* Event type categories */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
            What kind of event?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {eventTypes.map((et) => (
              <Link
                key={et.id}
                href={`/?event=${et.slug}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 hover:border-brand-primary dark:hover:border-brand-primary hover:shadow-md transition-all text-center group"
              >
                {(() => {
                  const Icon = EVENT_ICONS[et.name]
                  return Icon ? <Icon className="w-8 h-8 text-brand-primary" /> : null
                })()}
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-primary transition-colors">{et.name}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-2">{et.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All chefs grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
          All chefs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chefs.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="border-t border-neutral-100 dark:border-neutral-800 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { number: "6+", label: "Expert chefs" },
              { number: "45+", label: "Signature dishes" },
              { number: "50+", label: "Events catered" },
              { number: "4.8", label: "Average rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-brand-primary">{s.number}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to find your chef?</h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            Browse profiles, explore menus, and book the perfect chef for your next event.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-primary px-8 py-3 font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white px-8 py-3 font-medium hover:border-white/70 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
