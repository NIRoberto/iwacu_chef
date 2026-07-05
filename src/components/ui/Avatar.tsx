import Image from "next/image"
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

  const sizeMap = { sm: 32, md: 40, lg: 56, xl: 80 }

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={sizeMap[size]}
        height={sizeMap[size]}
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
