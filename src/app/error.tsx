"use client"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 flex items-center justify-center py-32 px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="text-2xl font-bold text-neutral-900">Something went wrong</h1>
        <p className="mt-2 text-neutral-500">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
