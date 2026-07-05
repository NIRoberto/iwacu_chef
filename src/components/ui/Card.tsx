import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "section"
}

export function Card({ children, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag className={`rounded-2xl bg-neutral-50 border border-neutral-100 overflow-hidden ${className}`}>
      {children}
    </Tag>
  )
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 pt-0 ${className}`}>{children}</div>
}
