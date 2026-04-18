'use client'

import { Check, Gift, Truck, Sparkles, Percent } from 'lucide-react'

const stampRewards: { at: number; label: string; icon: typeof Truck }[] = [
  { at: 4, label: 'Free local delivery on your next order', icon: Truck },
  { at: 7, label: '15% off any Elite Trainer Box', icon: Percent },
  { at: 10, label: 'One FREE booster pack — on us', icon: Gift },
]

export default function RewardsCard() {
  // Demo: visually show 3 filled stamps out of 10
  const filled = 3
  const total = 10

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-10 text-amber-50 shadow-2xl overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Trainer&apos;s Vault Rewards
          </p>
          <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold">
            Your Collector&apos;s Stamp Card
          </h3>
          <p className="mt-2 text-sm text-amber-50/70 max-w-md">
            Earn one stamp for every S$20 spent. Redeem for free delivery, discounts on boxes, and free packs — stack as many rewards as you want.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80">Member No.</span>
          <span className="font-mono text-sm text-amber-200">TV-•• ••••</span>
        </div>
      </div>

      {/* Stamp grid */}
      <div className="relative">
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: total }).map((_, i) => {
            const isFilled = i < filled
            const reward = stampRewards.find((r) => r.at === i + 1)
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 transition-all ${
                    isFilled
                      ? 'border-amber-300 bg-amber-300/10'
                      : 'border-dashed border-amber-50/20 bg-slate-900/40'
                  }`}
                >
                  {isFilled ? (
                    <Check
                      className="h-6 w-6 text-amber-300"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <span className="font-heading text-sm font-semibold text-amber-50/30">
                      {i + 1}
                    </span>
                  )}
                  {reward && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-slate-950">
                      <Sparkles className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                </div>
                {reward && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 text-center">
                    Reward
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Reward legend */}
      <div className="relative mt-8 grid gap-3 sm:grid-cols-3 border-t border-amber-50/10 pt-6">
        {stampRewards.map((r) => {
          const Icon = r.icon
          return (
            <div key={r.at} className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-amber-200">
                  Stamp {r.at}
                </p>
                <p className="text-amber-50/70 leading-relaxed">{r.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
