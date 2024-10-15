import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-center mb-8">Mortgage Calculators</h1>
          <p className="text-xl text-center mb-12">Choose a calculator to get started with your mortgage planning</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/mortgage-calculator">
              <Button className="w-full h-24 text-lg">Mortgage Calculator</Button>
            </Link>
            <Link href="/refinance-calculator">
              <Button className="w-full h-24 text-lg">Refinance Calculator</Button>
            </Link>
            <Link href="/extra-payment-calculator">
              <Button className="w-full h-24 text-lg">Extra Payment Calculator</Button>
            </Link>
            <Link href="/home-affordability">
              <Button className="w-full h-24 text-lg">How much home can I afford?</Button>
            </Link>
            <Link href="/principal-calculator">
              <Button className="w-full h-24 text-lg">Principal Calculator</Button>
            </Link>
            <Link href="/tax-benefits">
              <Button className="w-full h-24 text-lg">Tax Benefits of Buying</Button>
            </Link>
            <Link href="/apr-calculator">
              <Button className="w-full h-24 text-lg">What's my APR?</Button>
            </Link>
            <Link href="/interest-only-calculator">
              <Button className="w-full h-24 text-lg">Interest-Only Calculator</Button>
            </Link>
            <Link href="/points-calculator">
              <Button className="w-full h-24 text-lg">Should I pay Points?</Button>
            </Link>
            <Link href="/income-qualifier">
              <Button className="w-full h-24 text-lg">How much income to qualify?</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}