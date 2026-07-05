import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getChefBySlug, getMenuByChefId, getReviewsByChefId } from "@/lib/data-access"
import { ChefProfile } from "@/components/chefs/ChefProfile"
import { MenuList } from "@/components/menu/MenuList"
import { ReviewSection } from "@/components/chefs/ReviewSection"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chef = getChefBySlug(slug)
  if (!chef) return { title: "Chef Not Found" }
  return { title: chef.name, description: chef.title }
}

export default async function ChefDetailPage({ params }: Props) {
  const { slug } = await params
  const chef = getChefBySlug(slug)
  if (!chef) notFound()

  const chefMenu = getMenuByChefId(chef.id)
  const chefReviews = getReviewsByChefId(chef.id)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <ChefProfile chef={chef} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Menu</h2>
        <MenuList items={chefMenu} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          Reviews ({chefReviews.length})
        </h2>
        <ReviewSection reviews={chefReviews} />
      </section>
    </div>
  )
}
