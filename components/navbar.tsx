import Link from 'next/link'
import { Button } from '@/components/ui/button'

const pages = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
  { name: 'Refinance Calculator', href: '/refinance-calculator' },
  { name: 'Extra Payment Calculator', href: '/extra-payment-calculator' },
  { name: 'How much home can I afford?', href: '/home-affordability' },
  { name: 'Principal Calculator', href: '/principal-calculator' },
  { name: 'Tax Benefits of Buying', href: '/tax-benefits' },
  { name: 'What\'s my APR?', href: '/apr-calculator' },
  { name: 'Interest-Only Calculator', href: '/interest-only-calculator' },
  { name: 'Should I pay Points?', href: '/points-calculator' },
  { name: 'How much income to qualify?', href: '/income-qualifier' },
]

export function Navbar() {
  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">MortgageCalc</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {pages.map((page) => (
                <Link key={page.name} href={page.href}>
                  <Button variant="ghost">{page.name}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}