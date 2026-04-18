'use client'

import { useState } from 'react'
import { X, ShieldCheck } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-slate-950 text-amber-50">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm tracking-wide">
        <ShieldCheck className="h-4 w-4 text-amber-300 flex-shrink-0" strokeWidth={2} />
        <p className="text-center">
          <span className="font-semibold text-amber-300">100% Authentic</span>
          <span className="mx-2 opacity-50">•</span>
          <span>Free local delivery over S$60</span>
          <span className="mx-2 opacity-50 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Price-matched across Singapore</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
