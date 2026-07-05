import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllChefs, getMenuByChefId, getWeeklyPlansByChefId } from "@/lib/data-access"
import type { MenuItemRecord } from "@/lib/data-access"
import type { MenuItem } from "@/types"
import { AddToCartButton } from "@/components/menu/AddToCartButton"
import { Clock, ArrowRight, Users, Sparkles, ChefHat } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Weekly Chef Plans — Iwacu Chef",
  description: "See what each chef is cooking every day this week. Plan your meals and pre-order.",
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const LIVE_SESSIONS = [
  { chefSlug: "mama-keziah", chefName: "Mama Keziah", platform: "Instagram Live", time: "Wed 6:00 PM", topic: "Making perfect Isombe" },
  { chefSlug: "chef-pierre", chefName: "Chef Pierre", platform: "YouTube Live", time: "Thu 7:00 PM", topic: "French-Rwandan fusion basics" },
  { chefSlug: "amina-spices", chefName: "Amina Spices", platform: "TikTok Live", time: "Fri 5:00 PM", topic: "Spice blending 101" },
]

export default async function ChefPlansPage() {
  const chefs = await getAllChefs()
  const allMenus = await Promise.all(chefs.map((c) => getMenuByChefId(c.id)))
  const allPlans = await Promise.all(chefs.map((c) => getWeeklyPlansByChefId(c.id)))
  const chefMenuMap = new Map<string, MenuItemRecord[]>()
  const chefPlanMap = new Map<string, { dayOfWeek: number; items: string[] }[]>()
  chefs.forEach((c, i) => {
    chefMenuMap.set(c.id, allMenus[i])
    chefPlanMap.set(c.id, allPlans[i].map((p: { dayOfWeek: number; items: string }) => ({ dayOfWeek: p.dayOfWeek, items: JSON.parse(p.items) as string[] })))
  })

  const today = new Date().getDay()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Weekly Chef Plans
        </h1>
        <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
          See what each chef is cooking every day this week. Pick your favourites and pre-order.
        </p>
      </div>

      {/* Live Cooking Banner */}
      <div className="rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/10 dark:border-brand-primary/20 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-brand-primary" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Live Cooking Sessions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LIVE_SESSIONS.map((session) => (
            <div key={session.chefSlug} className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Live</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{session.topic}</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                by <Link href={`/chefs/${session.chefSlug}`} className="text-brand-primary hover:underline">{session.chefName}</Link>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                <span>{session.platform}</span>
                <span>{session.time}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4 text-center">
          Chefs go live to share cooking tips, answer questions, and take pre-orders. Follow your favourite chefs!
        </p>
      </div>

      {/* Chef Weekly Plans */}
      <div className="space-y-8">
        {chefs.map((chef) => {
          const menu = chefMenuMap.get(chef.id) ?? []
          const plans = chefPlanMap.get(chef.id) ?? []
          const menuItemMap = new Map(menu.map((m) => [m.id, m]))

          // Build day-by-day schedule
          const dayPlan = DAY_NAMES.map((_, dayIndex) => {
            const plan = plans.find((p) => p.dayOfWeek === dayIndex)
            if (!plan) return { dayIndex, items: [] as MenuItemRecord[] }
            return {
              dayIndex,
              items: plan.items.map((id) => menuItemMap.get(id)).filter(Boolean) as MenuItemRecord[],
            }
          })

          return (
            <div key={chef.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
              {/* Chef header */}
              <div className="flex items-center gap-4 p-5 sm:p-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  <Image src={chef.photo} alt={chef.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link href={`/chefs/${chef.slug}`} className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-brand-primary transition-colors">
                      {chef.name}
                    </Link>
                    <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-0.5">{chef.location}</span>
                  </div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{chef.title}</p>
                </div>
                <Link
                  href={`/chefs/${chef.slug}`}
                  className="shrink-0 text-xs font-medium text-brand-primary hover:text-brand-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  Full menu <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Day-by-day grid */}
              <div className="grid grid-cols-7 overflow-x-auto border-b border-neutral-100 dark:border-neutral-800">
                {dayPlan.map((day) => {
                  const isToday = day.dayIndex === today
                  const isPast = day.dayIndex < today
                  return (
                    <div key={day.dayIndex} className={`min-w-[120px] p-2 sm:p-3 ${isToday ? "bg-brand-primary/5 dark:bg-brand-primary/10" : ""} ${isPast ? "opacity-50" : ""}`}>
                      <p className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${isToday ? "text-brand-primary" : "text-neutral-400 dark:text-neutral-500"}`}>
                        {DAY_NAMES[day.dayIndex].slice(0, 3)}
                        {isToday && <span className="ml-1 text-[9px] sm:text-[10px]">· Today</span>}
                      </p>
                      {day.items.length === 0 ? (
                        <p className="text-[9px] sm:text-[10px] text-neutral-300 dark:text-neutral-600">Not cooking</p>
                      ) : (
                        <div className="space-y-1">
                          {day.items.map((item) => (
                            <div key={item.id} className="text-[10px] sm:text-[11px] leading-tight">
                              <div className="flex items-start justify-between gap-1">
                                <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">{item.name}</p>
                                <AddToCartButton item={item as MenuItem} />
                              </div>
                              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-500">
                                <span>{formatCurrency(item.price)}</span>
                                <span>·</span>
                                <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                                <span>{item.prepTime}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Pre-order CTA */}
              <div className="p-3 sm:p-4 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  <Users className="w-3 h-3 inline mr-1" />
                  Pre-order for today or tomorrow
                </p>
                <Link
                  href={`/chefs/${chef.slug}`}
                  className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  Order now <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA for chefs */}
      <div className="mt-12 rounded-2xl bg-brand-primary p-8 sm:p-10 text-center">
        <ChefHat className="w-8 h-8 mx-auto text-white/80 mb-3" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Are you a home chef?</h2>
        <p className="mt-2 text-white/80 max-w-md mx-auto">
          Set your weekly menu, announce live cooking sessions, and grow your business with Iwacu Chef.
        </p>
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 mt-6 rounded-full bg-white text-brand-primary px-6 py-3 font-semibold hover:bg-neutral-100 transition-colors"
        >
          Become a chef
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
