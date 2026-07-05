import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Iwacu Chef — connecting Rwandan home chefs with food lovers.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">About Iwacu Chef</h1>

      <section className="mt-8 space-y-6 text-neutral-500 text-lg leading-relaxed">
        <p>
          <strong className="text-neutral-700">Iwacu</strong> (pronounced <em>ee-WAH-tsoo</em>) is a
          Kinyarwanda word meaning <strong className="text-neutral-700">&ldquo;our home.&rdquo;</strong> It captures
          everything we believe in — the warmth, authenticity, and love that comes from a home kitchen.
        </p>

        <p>
          Iwacu Chef was born from a simple idea: the best meals are made at home. We connect
          local home chefs with neighbours who crave real, homemade food. No factories, no
          chains — just real people cooking from their hearts.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 pt-4">Our mission</h2>
        <p>
          To empower every Rwandan home chef to build a thriving food business from their
          own kitchen, while giving customers access to authentic, affordable homemade meals.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 pt-4">Our values</h2>
        <ul className="space-y-4 list-none">
          {[
            { title: "Authenticity", desc: "Real chefs, real home kitchens, real food. No shortcuts." },
            { title: "Community", desc: "We strengthen the bonds between neighbours through food." },
            { title: "Trust", desc: "Transparent profiles, honest reviews, and reliable service." },
            { title: "Warmth", desc: "Every meal carries the feeling of being welcomed home." },
          ].map((v) => (
            <li key={v.title}>
              <strong className="text-neutral-700">{v.title}.</strong> {v.desc}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
