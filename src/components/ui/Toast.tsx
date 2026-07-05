"use client"

import { useEffect, useRef } from "react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  show: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = "info", show, onClose, duration = 4000 }: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (show) {
      timerRef.current = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timerRef.current)
    }
  }, [show, duration, onClose])

  const colors = {
    success: "bg-brand-secondary text-white",
    error: "bg-accent-error text-white",
    info: "bg-neutral-900 text-white",
  }

  return show ? (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 shadow-lg transition-all duration-300 ${colors[type]}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="opacity-70 hover:opacity-100" aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  ) : null
}
