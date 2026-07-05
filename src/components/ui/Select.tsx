import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
}

export function Select({ label, options, error, id, className = "", ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary ${error ? "border-accent-error" : "border-neutral-300"} ${className}`}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-accent-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
