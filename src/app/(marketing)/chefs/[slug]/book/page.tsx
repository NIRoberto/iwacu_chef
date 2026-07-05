import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getChefBySlug, getEventTypes } from "@/lib/data-access"
import { BookingForm } from "./BookingForm"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) return { title: "Chef Not Found" }
  return { title: `Book ${chef.name} — Iwacu Chef` }
}

export default async function BookChefPage({ params }: Props) {
  const { slug } = await params
  const chef = await getChefBySlug(slug)
  if (!chef) notFound()

  const eventTypes = await getEventTypes()

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Book {chef.name}
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        Tell us about your event and we&apos;ll get back to you
      </p>
      <BookingForm chef={chef} eventTypes={eventTypes} />
    </div>
  )
}
