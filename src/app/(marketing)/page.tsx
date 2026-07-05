import Link from "next/link"
import { chefs } from "@/lib/data/chefs"
import { ChefCard } from "@/components/chefs/ChefCard"

export default function HomePage() {
  const featuredChefs = chefs.filter((c) => c.featured)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary-light/50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Homemade, from{" "}
              <span className="text-brand-primary">our home</span> to yours
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-neutral-500 max-w-xl leading-relaxed">
              Discover and order from local home chefs in Rwanda. Real people, real
              home kitchens, unforgettable meals.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/chefs"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-base font-medium text-white hover:bg-brand-primary-hover transition-colors"
              >
                Browse chefs
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-primary px-8 py-3.5 text-base font-medium text-brand-primary hover:bg-brand-primary-light transition-colors"
              >
                Become a chef
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              How it works
            </h2>
            <p className="mt-3 text-neutral-500 text-lg">
              Three simple steps to enjoy homemade meals
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse chefs", description: "Explore profiles of local home chefs near you. See their menus, ratings, and story." },
              { step: "2", title: "Place your order", description: "Pick your favourite dishes, choose pickup or delivery, and confirm your order." },
              { step: "3", title: "Enjoy!", description: "Your chef prepares your meal with love. Pick it up or get it delivered to your door." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light text-brand-primary text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-neutral-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                Featured chefs
              </h2>
              <p className="mt-2 text-neutral-500 text-lg">
                Meet our top-rated home chefs
              </p>
            </div>
            <Link
              href="/chefs"
              className="hidden sm:inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              View all chefs &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/chefs"
              className="inline-flex text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              View all chefs &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Ready to share your cooking?
          </h2>
          <p className="mt-3 text-neutral-500 text-lg max-w-xl mx-auto">
            Join Iwacu Chef and turn your home kitchen into a business. We help you
            reach customers who love homemade food.
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-base font-medium text-white hover:bg-brand-primary-hover transition-colors"
          >
            Become a chef today
          </Link>
        </div>
      </section>
    </>
  )
}
