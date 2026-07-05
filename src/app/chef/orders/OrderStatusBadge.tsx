"use client"

import { useState } from "react"

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  preparing: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  ready: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
  declined: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const nextStatuses: Record<string, string[]> = {
  pending: ["confirmed", "declined"],
  confirmed: ["preparing", "declined"],
  preparing: ["ready", "declined"],
  ready: ["completed"],
  completed: [],
  declined: [],
}

interface Props {
  orderId: string
  status: string
}

export function OrderStatusBadge({ orderId, status }: Props) {
  const [current, setCurrent] = useState(status)
  const [loading, setLoading] = useState(false)

  async function transition(newStatus: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) setCurrent(newStatus)
    } catch {
      // silently fail
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-medium rounded-full px-3 py-1 capitalize ${statusColors[current]}`}>
        {current}
      </span>
      {nextStatuses[current]?.length > 0 && (
        <div className="flex gap-1">
          {nextStatuses[current].map((ns) => (
            <button
              key={ns}
              onClick={() => transition(ns)}
              disabled={loading}
              className="text-xs rounded-full px-2 py-0.5 border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors capitalize"
            >
              {ns}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
