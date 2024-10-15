"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PointsCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [points, setPoints] = useState(1)
  const [loanTerm, setLoanTerm] = useState(30)
  const [results, setResults] = useState(null)

  const calculatePoints = () => {
    const pointCost = (points / 100) * loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const reducedRate = interestRate - (points * 0.25) // Assuming each point reduces rate by 0.25%
    const reducedMonthlyRate = reducedRate / 100 / 12
    const reducedMonthlyPayment = (loanAmount * reducedMonthlyRate * Math.pow(1 + reducedMonthlyRate, numberOfPayments)) / (Math.pow(1 + reducedMonthlyRate, numberOfPayments) - 1)

    const monthlySavings = monthlyPayment - reducedMonthlyPayment
    const breakEvenMonths = Math.ceil(pointCost / monthlySavings)

    const schedule = []
    for (let year = 1; year <= loanTerm; year++) {
      const withPoints = year * 12 * reducedMonthlyPayment + pointCost
      const withoutPoints = year * 12 * monthlyPayment
      schedule.push({
        year,
        withPoints,
        withoutPoints,
      })
    }

    setResults({
      pointCost,
      monthlyPayment,
      reducedMonthlyPayment,
      monthlySavings,
      breakEvenMonths,
      schedule
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Should I Pay Points?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your loan details to calculate the impact of points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    step="0.125"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculatePoints}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Impact of paying points on your mortgage</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Cost of Points: ${results.pointCost.toFixed(2)}</p>
                  <p className="mb-2">Monthly Payment without Points: ${results.monthlyPayment.toFixed(2)}</p>
                  <p className="mb-2">Monthly Payment with Points: ${results.reducedMonthlyPayment.toFixed(2)}</p>
                  <p className="mb-2">Monthly Savings: ${results.monthlySavings.toFixed(2)}</p>
                  <p className="mb-4">Break-even Point: {results.breakEvenMonths} months</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.schedule}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="withPoints" stroke="#8884d8" name="With Points" />
                      <Line type="monotone" dataKey="withoutPoints" stroke="#82ca9d" name="Without Points" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Mortgage Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Mortgage points, also known as discount points, are fees paid directly to the lender at closing in exchange for a reduced interest rate. This is also called "buying down the rate."</p>
            <h3 className="text-xl font-semibold mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Cost:</strong> One point costs 1% of your mortgage amount (or $1,000 for every $100,000).</li>
              <li><strong>Rate Reduction:</strong> Typically, each point lowers your rate by 0.25%, but this can vary by lender.</li>
              <li><strong>Break-even Point:</strong> The time it takes for the savings from the lower interest rate to exceed the cost of the points.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">When to Consider Buying Points:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Long-term Stay:</strong> If you plan to stay in the home beyond the break-even point.</li>
              <li><strong>Cash Available:</strong> If you have extra cash to pay for points after covering down payment and closing costs.</li>
              <li><strong>Lower Monthly Payments:</strong> If you want to reduce your monthly mortgage payments.</li>
            </ul>
            <p>Remember, buying points isn't always the best choice. If you plan to sell or refinance before reaching the break-even point, you might not recoup the cost of the points. Always consider your financial situation and long-term plans when deciding whether to buy points.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}