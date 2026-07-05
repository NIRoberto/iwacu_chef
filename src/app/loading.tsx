export default function RootLoading() {
  return (
    <div className="flex-1 flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-neutral-100 border-t-brand-primary animate-spin" />
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    </div>
  )
}
