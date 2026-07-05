"use client"

import { useState } from "react"
import { Check, Clock, Plus, X, Save } from "lucide-react"

interface MenuItemBrief {
  id: string
  name: string
  category: string
  price: number
  prepTime: string
}

interface PlanData {
  dayOfWeek: number
  items: string[]
}

interface Props {
  chefName: string
  items: MenuItemBrief[]
  initialPlans: PlanData[]
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function PlanEditor({ chefName, items, initialPlans }: Props) {
  const [plans, setPlans] = useState<PlanData[]>(
    DAY_NAMES.map((_, i) => initialPlans.find((p) => p.dayOfWeek === i) ?? { dayOfWeek: i, items: [] })
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeDay, setActiveDay] = useState<number | null>(null)

  async function savePlan() {
    setSaving(true)
    try {
      await fetch("/api/chef/plans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert("Failed to save")
    }
    setSaving(false)
  }

  function toggleItem(dayIndex: number, itemId: string) {
    setPlans((prev) =>
      prev.map((p) =>
        p.dayOfWeek === dayIndex
          ? { ...p, items: p.items.includes(itemId) ? p.items.filter((id) => id !== itemId) : [...p.items, itemId] }
          : p
      )
    )
  }

  const categories = [...new Set(items.map((i) => i.category))]

  return (
    <div>
      {/* Day tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-thin pb-1">
        {DAY_NAMES.map((name, i) => {
          const count = plans[i]?.items.length ?? 0
          const isToday = i === new Date().getDay()
          return (
            <button
              key={name}
              onClick={() => setActiveDay(activeDay === i ? null : i)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                activeDay === i
                  ? "bg-brand-primary text-white shadow-sm"
                  : isToday
                  ? "bg-brand-primary-light text-brand-primary"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              <span>{name.slice(0, 3)}</span>
              <span className={`text-[10px] ${activeDay === i ? "text-white/70" : "text-neutral-400"}`}>
                {count} item{count !== 1 ? "s" : ""}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active day editor */}
      {activeDay !== null && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {DAY_NAMES[activeDay]} menu
            </h3>
            <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2.5 py-1">
              {plans[activeDay].items.length} of {items.length} selected
            </span>
          </div>

          {categories.map((cat) => {
            const catItems = items.filter((i) => i.category === cat)
            const selected = catItems.filter((i) => plans[activeDay].items.includes(i.id))
            if (selected.length === 0 && activeDay !== activeDay) return null
            return (
              <div key={cat} className="mb-4 last:mb-0">
                <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{cat}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {catItems.map((item) => {
                    const isSelected = plans[activeDay].items.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(activeDay, item.id)}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                          isSelected
                            ? "border-brand-primary bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary"
                            : "border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-brand-primary bg-brand-primary" : "border-neutral-300 dark:border-neutral-600"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-neutral-400 flex items-center gap-1">
                            <span>{new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF", maximumFractionDigits: 0 }).format(item.price)}</span>
                            <span>·</span>
                            <Clock className="w-3 h-3" />
                            <span>{item.prepTime}</span>
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={savePlan}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-medium text-white hover:bg-brand-primary-hover disabled:opacity-50 transition-colors shadow-sm"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" />
            Saved
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save weekly plan"}
          </>
        )}
      </button>
    </div>
  )
}
