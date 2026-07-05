import type { Review } from "@/types"
import { Avatar } from "@/components/ui/Avatar"
import { StarRating } from "@/components/ui/StarRating"

interface ReviewSectionProps {
  reviews: Review[]
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  if (reviews.length === 0) {
    return (
        <div className="text-center py-10">
        <p className="text-neutral-400 dark:text-neutral-500">No reviews yet. Be the first to order and leave a review!</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
          <Avatar src={review.customerPhoto} name={review.customerName} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{review.customerName}</h4>
              <span className="text-xs text-neutral-300">{review.date}</span>
            </div>
            <StarRating rating={review.rating} size="sm" showValue={false} />
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
