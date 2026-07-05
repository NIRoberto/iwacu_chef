import type { Metadata } from "next"
import Link from "next/link"
import { Search, ClipboardList, Truck, UtensilsCrossed, Calendar, CreditCard, Play, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works — Iwacu Chef",
  description: "Learn how to browse, order, and enjoy homemade meals from local chefs near you.",
}

const STEPS = [
  {
    icon: Search,
    title: "Browse chefs",
    description: "Explore profiles of local home chefs. See their menus, ratings, reviews, and what events they cater.",
  },
  {
    icon: ClipboardList,
    title: "Choose your meal",
    description: "Pick from their menu — breakfast, lunch, dinner, or full event catering. Customise portions and dietary needs.",
  },
  {
    icon: Calendar,
    title: "Plan ahead with Chef Plans",
    description: "See what each chef is cooking this week. Pre-order dishes before they sell out.",
  },
  {
    icon: CreditCard,
    title: "Book or order",
    description: "Order individual meals for delivery or book a chef for your event. You won't be charged until confirmed.",
  },
  {
    icon: Truck,
    title: "Get delivery or pickup",
    description: "Choose delivery to your doorstep or pickup from the chef's home kitchen.",
  },
  {
    icon: UtensilsCrossed,
    title: "Enjoy & review",
    description: "Enjoy your homemade meal and leave a review to help the chef grow.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          How It Works
        </h1>
        <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          From browsing to enjoying — here&apos;s how Iwacu Chef connects you with local home chefs.
        </p>
      </div>

      <div className="space-y-8">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-brand-primary" />
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-700 my-2" />
              )}
            </div>
            <div className="pt-2.5">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {i + 1}. {step.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video section */}
      <section className="mt-16 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">Watch</p>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              See Iwacu Chef in action
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
              Watch how home chefs prepare their signature dishes, how customers place orders,
              and how easy it is to bring restaurant-quality home cooking to your table.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors shadow-sm"
              >
                Browse chefs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-video sm:aspect-auto bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-brand-primary ml-0.5" />
            </div>
            <p className="absolute bottom-4 left-4 text-xs text-white/80 font-medium">
              How Iwacu Chef works — 2:34
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
