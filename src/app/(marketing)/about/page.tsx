import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Heart, Users, Shield, Sun, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About — Iwacu Chef",
  description: "Learn about Iwacu Chef — connecting Rwandan home chefs with food lovers.",
}

const VALUES = [
  { icon: Heart, title: "Authenticity", desc: "Real chefs, real home kitchens, real food. No shortcuts, no factories — just genuine home cooking made with love." },
  { icon: Users, title: "Community", desc: "We strengthen the bonds between neighbours through food. Every meal supports a local home chef and their family." },
  { icon: Shield, title: "Trust", desc: "Transparent profiles, verified reviews, and reliable service. You always know exactly who is cooking your meal." },
  { icon: Sun, title: "Warmth", desc: "Every dish carries the feeling of being welcomed into someone's home. That's the Iwacu difference." },
]

const STATS = [
  { number: "6+", label: "Expert home chefs" },
  { number: "45+", label: "Signature dishes" },
  { number: "50+", label: "Events catered" },
  { number: "4.9", label: "Average rating" },
]

const TEAM = [
  { name: "Mama Keziah", role: "Head Chef", photo: "https://images.unsplash.com/photo-1556911220-bffb3a9f3e9d?w=200&h=200&fit=crop" },
  { name: "Chef Pierre", role: "Fusion Specialist", photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop" },
  { name: "Amina Spices", role: "Coastal Cuisine Chef", photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop" },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-primary/5 dark:bg-brand-primary/10 border-b border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            About Iwacu Chef
          </h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            <strong className="text-neutral-700 dark:text-neutral-300">Iwacu</strong> (ee-WAH-tsoo) means
            &ldquo;our home&rdquo; in Kinyarwanda. We connect you with local home chefs who cook
            real food with real love — from our home to yours.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-neutral-100 dark:border-neutral-800 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-brand-primary">{s.number}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Our story</h2>
        <div className="space-y-5 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
          <p>
            Iwacu Chef was born in a small kitchen in Kigali. We noticed something beautiful happening —
            neighbours sharing meals, home chefs cooking extra portions to sell, and a growing appetite for
            food that tastes like home.
          </p>
          <p>
            We built Iwacu Chef to make it easy for anyone to discover and order from the incredible
            home chefs cooking in their neighbourhood. No restaurants, no chains — just real people
            cooking from their hearts in their home kitchens.
          </p>
          <p>
            Today, we connect dozens of home chefs with hundreds of customers across Kigali, and
            we&apos;re just getting started. Every order supports a local chef, every meal tells a story,
            and every review helps someone discover their new favourite dish.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-10">
            What we believe in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-10">
          Meet our chefs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 mx-auto mb-4">
                <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="96px" />
              </div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">{member.name}</p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to taste the difference?</h2>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
            Browse local chefs, explore their menus, and order homemade meals delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-primary px-8 py-3 font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Browse chefs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white px-8 py-3 font-medium hover:border-white/70 transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
