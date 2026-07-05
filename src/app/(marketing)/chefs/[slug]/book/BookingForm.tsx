"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import type { Chef, EventTypeInfo } from "@/types"
import { PartyPopper } from "lucide-react"
import { EVENT_ICONS } from "@/lib/icons"

interface Props {
  chef: Chef
  eventTypes: EventTypeInfo[]
}

export function BookingForm({ chef, eventTypes }: Props) {
  const [eventTypeId, setEventTypeId] = useState("")
  const [date, setDate] = useState("")
  const [guestCount, setGuestCount] = useState(1)
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  if (done) {
    return (
      <div className="text-center py-16">
        <PartyPopper className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Request sent!</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          {chef.name} will review your booking request and get back to you soon.
        </p>
        <Button onClick={() => router.push("/my-orders")}>View my bookings</Button>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!eventTypeId || !date) return

    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!user.id) {
      router.push(`/auth/login?redirect=/chefs/${chef.slug}/book`)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chefId: chef.id,
          customerId: user.id,
          eventTypeId,
          date: new Date(date).toISOString(),
          guestCount,
          menuPlan: [],
          note,
          total: 0,
        }),
      })
      if (res.ok) {
        setDone(true)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to submit booking")
      }
    } catch {
      alert("Network error")
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event type */}
      <fieldset>
        <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">What type of event?</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {eventTypes.map((et) => {
            const chefHasEvent = chef.eventTypes?.some((cet) => cet.id === et.id)
            return (
              <button
                key={et.id}
                type="button"
                onClick={() => setEventTypeId(et.id)}
                disabled={!chefHasEvent}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                  eventTypeId === et.id
                    ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                    : chefHasEvent
                    ? "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300"
                    : "border-neutral-100 dark:border-neutral-800 opacity-40 cursor-not-allowed text-neutral-400"
                }`}
              >
                    {(() => {
                      const Icon = EVENT_ICONS[et.name]
                      return Icon ? <Icon className="w-7 h-7" /> : null
                    })()}
                <span className="text-xs font-semibold">{et.name}</span>
              </button>
            )
          })}
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
          Greyed out = this chef doesn&apos;t cater this event type
        </p>
      </fieldset>

      {/* Date */}
      <Input
        label="When is your event?"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {/* Guests */}
      <Input
        label="Number of guests"
        type="number"
        value={guestCount}
        onChange={(e) => setGuestCount(Number(e.target.value))}
        min={1}
        max={500}
        required
      />

      {/* Note */}
      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-1.5">
          Anything special? (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Dietary requirements, preferences, allergies..."
          rows={4}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 resize-none"
        />
      </div>

      <Button type="submit" disabled={submitting || !eventTypeId || !date} className="w-full">
        {submitting ? "Submitting..." : "Send booking request"}
      </Button>
    </form>
  )
}
