import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllChefs, getMenuByChefId } from "@/lib/data-access"
import type { MenuItemRecord } from "@/lib/data-access"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Chef Plans — Iwacu Chef",
  description: "See what local chefs are cooking this week. Plan your meals and pre-order.",
}

export default async function ChefPlansPage() {
  const chefs = await getAllChefs()
  const allMenus = await Promise.all(chefs.map((c) => getMenuByChefId(c.id)))
  const chefMenuMap = new Map<string, MenuItemRecord[]>()
  chefs.forEach((c, i) => chefMenuMap.set(c.id, allMenus[i]))

  const today = new Date()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayName = dayNames[today.getDay()]
  const tomorrowName = dayNames[(today.getDay() + 1) % 7]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Weekly Chef Plans
        </h1>
        <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
          See what each chef is planning to cook this week. Pre-order your favourite dishes before they sell out.
        </p>
      </div>

      <div className="space-y-8">
        {chefs.map((chef) => {
          const menu = chefMenuMap.get(chef.id) ?? []

          // Pick a few items from their menu as "this week's planned dishes"
          const planned = menu
            .filter((item) => item.available)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

          return (
            <div key={chef.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-64 p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                      <Image
                        src={chef.photo}
                        alt={chef.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <Link href={`/chefs/${chef.slug}`} className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-brand-primary transition-colors">
                        {chef.name}
                      </Link>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{chef.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{todayName}&apos;s menu</span>
                  </div>
                </div>

                <div className="flex-1 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      This week&apos;s planned dishes
                    </h3>
                    <Link
                      href={`/chefs/${chef.slug}`}
                      className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover transition-colors inline-flex items-center gap-1"
                    >
                      Full menu <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {planned.map((item) => (
                      <div key={item.id} className="rounded-lg border border-neutral-100 dark:border-neutral-800 p-3">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{item.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-brand-primary font-semibold">
                            {new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF", maximumFractionDigits: 0 }).format(item.price)}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-neutral-400 dark:text-neutral-500">
                            <Clock className="w-3 h-3" />
                            {item.prepTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
                    Available {todayName} &amp; {tomorrowName} · Pre-order now
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
