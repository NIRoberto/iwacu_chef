import type { Metadata } from "next"
import { Search, ClipboardList, Truck, UtensilsCrossed, Calendar, CreditCard } from "lucide-react"

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
    </div>
  )
}
