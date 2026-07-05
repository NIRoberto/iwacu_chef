import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getChefBySlug, getMenuByChefId, getWeeklyPlansByChefId } from "@/lib/data-access"
import type { MenuItemRecord } from "@/lib/data-access"
import type { MenuItem } from "@/types"
import { AddToCartButton } from "@/components/menu/AddToCartButton"
import { Clock, ArrowLeft, ChefHat } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) return { title: "Chef Not Found" }
  return { title: `${chef.name}'s Weekly Plan — Iwacu Chef`, description: `See what ${chef.name} is cooking each day this week.` }
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default async function ChefPlanDetailPage({ params }: Props) {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) notFound()

  const menu = await getMenuByChefId(chef.id)
  const plans = await getWeeklyPlansByChefId(chef.id)
  const menuItemMap = new Map(menu.map((m) => [m.id, m]))

  const dayPlan = DAY_NAMES.map((_, dayIndex) => {
    const plan = plans.find((p) => p.dayOfWeek === dayIndex)
    if (!plan) return { dayIndex, items: [] as MenuItemRecord[] }
    const itemIds = JSON.parse(plan.items) as string[]
    return {
      dayIndex,
      items: itemIds.map((id) => menuItemMap.get(id)).filter(Boolean) as MenuItemRecord[],
    }
  })

  const today = new Date().getDay()
  const totalCookingDays = dayPlan.filter((d) => d.items.length > 0).length
  const totalItems = dayPlan.reduce((sum, d) => sum + d.items.length, 0)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Back link */}
      <Link
        href="/chef-plans"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All plans
      </Link>

      {/* Chef header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 shadow-sm">
          <Image src={chef.photo} alt={chef.name} fill className="object-cover" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {chef.name}&apos;s weekly plan
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{chef.title}</span>
            <span>·</span>
            <span>{totalCookingDays} day{totalCookingDays !== 1 ? "s" : ""} · {totalItems} item{totalItems !== 1 ? "s" : ""}</span>
          </div>
        </div>
        <Link
          href={`/chefs/${chef.slug}`}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:border-brand-primary hover:text-brand-primary transition-colors"
        >
          <ChefHat className="w-3.5 h-3.5" />
          Profile
        </Link>
      </div>

      {/* Day-by-day */}
      <div className="space-y-4">
        {dayPlan.map((day) => {
          const isToday = day.dayIndex === today
          const isPast = day.dayIndex < today
          const hasItems = day.items.length > 0

          if (!hasItems && isPast) return null

          return (
            <div
              key={day.dayIndex}
              className={`rounded-2xl border ${
                isToday
                  ? "border-brand-primary/30 bg-brand-primary/[0.03] dark:bg-brand-primary/[0.06] shadow-sm"
                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              } overflow-hidden`}
            >
              {/* Day header */}
              <div className={`flex items-center gap-3 px-5 py-4 ${
                isToday
                  ? "bg-brand-primary/5 dark:bg-brand-primary/10 border-b border-brand-primary/10"
                  : "border-b border-neutral-100 dark:border-neutral-800"
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold ${
                  isToday
                    ? "bg-brand-primary text-white shadow-sm"
                    : hasItems
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    : "bg-neutral-50 dark:bg-neutral-900 text-neutral-300 dark:text-neutral-600"
                }`}>
                  {["S", "M", "T", "W", "T", "F", "S"][day.dayIndex]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <p className={`text-base font-semibold ${isToday ? "text-brand-primary" : "text-neutral-900 dark:text-neutral-100"}`}>
                      {DAY_NAMES[day.dayIndex]}
                    </p>
                    {isToday && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-medium px-2.5 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        Today
                      </span>
                    )}
                    {!hasItems && (
                      <span className="text-xs text-neutral-300 dark:text-neutral-600">Not cooking</span>
                    )}
                  </div>
                  {hasItems && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                      {day.items.length} item{day.items.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>

              {/* Day items */}
              {hasItems && (
                <div className="p-4 sm:p-5">
                  <div className="space-y-3">
                    {day.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 gap-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.name}</p>
                          <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500 mt-1">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{formatCurrency(item.price)}</span>
                            <span>·</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{item.prepTime}</span>
                            {item.serves > 1 && (
                              <>
                                <span>·</span>
                                <span>Serves {item.serves}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <AddToCartButton item={item as MenuItem} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
