interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
}

export function StarRating({ rating, size = "sm", showValue = true }: StarRatingProps) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }

  return (
    <span className={`inline-flex items-center gap-1 text-accent-gold ${sizes[size]}`} aria-label={`${rating} out of 5 stars`}>
      <span className="tracking-wide">
        {"★".repeat(Math.floor(rating))}
        {rating % 1 >= 0.5 && "½"}
        {"☆".repeat(5 - Math.ceil(rating))}
      </span>
      {showValue && <span className="text-neutral-500 text-sm font-medium ml-0.5">{rating.toFixed(1)}</span>}
    </span>
  )
}
