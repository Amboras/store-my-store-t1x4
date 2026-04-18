'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/use-products'
import { formatPrice } from '@/lib/utils/format-price'

interface ProductVariant {
  id?: string
  calculated_price?: { calculated_amount?: number; currency_code?: string } | number
}

interface FeaturedProduct {
  id: string
  handle: string
  title: string
  subtitle?: string | null
  thumbnail?: string | null
  variants?: ProductVariant[]
  description?: string | null
}

function getLowestPrice(product: FeaturedProduct): { amount: number; currency: string } | null {
  const variants = product.variants || []
  let best: { amount: number; currency: string } | null = null
  for (const v of variants) {
    const cp = v.calculated_price
    if (!cp) continue
    const amount = typeof cp === 'number' ? cp : cp.calculated_amount
    const currency =
      (typeof cp !== 'number' ? cp.currency_code : undefined) || 'sgd'
    if (amount == null) continue
    if (!best || amount < best.amount) {
      best = { amount, currency }
    }
  }
  return best
}

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts({ limit: 6 })
  const products = ((data || []) as unknown) as FeaturedProduct[]

  return (
    <section className="py-section bg-amber-50/40">
      <div className="container-custom">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-700 font-semibold">
              Our Catalogue
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-slate-950">
              This Week&apos;s Sealed Stock
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every pack, box, and ETB you see is in stock in our Singapore store today. No pre-orders, no mystery boxes — just sealed product ready to ship.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-950 border-b-2 border-amber-400 pb-1 hover:border-slate-950 transition-colors"
            prefetch={true}
          >
            View Full Catalogue
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => {
              const price = getLowestPrice(product)
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-background border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all"
                  prefetch={true}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {product.thumbnail && (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-3 left-3 bg-slate-950 text-amber-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      In Stock · SG
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-heading text-lg font-semibold text-slate-950 group-hover:text-amber-700 transition-colors">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {product.description.replace(/<[^>]*>/g, '').slice(0, 120)}
                      </p>
                    )}
                    <div className="mt-4 flex items-end justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
                        {price ? (
                          <p className="font-heading text-xl font-bold text-slate-950">
                            {formatPrice(price.amount, price.currency)}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">—</p>
                        )}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 group-hover:underline">
                        Shop →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
