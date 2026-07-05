"use client"

import { useTransition } from "react"

interface Props {
  bookingId: string
  status: string
}

export function BookingStatusButton({ bookingId, status }: Props) {
  const [pending, startTransition] = useTransition()

  async function handleStatus(newStatus: string) {
    startTransition(async () => {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      window.location.reload()
    })
  }

  if (status === "pending") {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleStatus("confirmed")}
          disabled={pending}
          className="text-xs font-medium rounded-full px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={() => handleStatus("cancelled")}
          disabled={pending}
          className="text-xs font-medium rounded-full px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
        >
          Decline
        </button>
      </div>
    )
  }

  return (
    <span className={`text-xs font-medium rounded-full px-3 py-1 capitalize ${
      status === "confirmed" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : status === "cancelled" ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    }`}>
      {status}
    </span>
  )
}
