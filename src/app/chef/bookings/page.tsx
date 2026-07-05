import type { Metadata } from "next"
import prisma from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { BookingStatusButton } from "./BookingStatusButton"

export const metadata: Metadata = {
  title: "Booking Manager",
  description: "View and manage booking requests.",
}

export default async function ChefBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { eventType: true },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Booking requests</h1>

      <div className="space-y-4">
        {bookings.map((b) => {
          const items = JSON.parse(b.menuPlan) as string[]
          return (
            <div key={b.id} className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.eventType.icon}</span>
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">{b.eventType.name}</span>
                    <span className="text-sm text-neutral-400 dark:text-neutral-500 ml-2">
                      {b.date.toLocaleDateString()} · {b.guestCount} guest{b.guestCount > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <BookingStatusButton bookingId={b.id} status={b.status} />
              </div>

              <div className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1">
                <p>📍 Customer ID: {b.customerId.slice(-8)}</p>
                {items.length > 0 && <p>🍽️ Menu items selected: {items.length}</p>}
                <p>💰 Total: {formatCurrency(b.total)}</p>
                {b.note && <p className="italic mt-2">&ldquo;{b.note}&rdquo;</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
