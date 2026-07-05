import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-32 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-neutral-900">Page not found</h1>
        <p className="mt-2 text-neutral-500">The page you are looking for does not exist or has been moved.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-primary-hover transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
