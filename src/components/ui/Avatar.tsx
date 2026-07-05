import { getInitials } from "@/lib/utils"

interface AvatarProps {
  src?: string
  name: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
      />
    )
  }

  return (
    <div
      className={`rounded-full bg-brand-primary-light text-brand-primary font-semibold flex items-center justify-center ${sizes[size]} ${className}`}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}
