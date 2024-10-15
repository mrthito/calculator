"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function InterestOnlyCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [interestOnlyPeriod, setInterestOnlyPeriod] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [results, setResults] = useState(null)

  const calculateInterestOnly = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const interestOnlyPayment = loanAmount * monthlyRate
    const fullPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments - interestOnlyPeriod * 12)) / (Math.pow(1 + monthlyRate, numberOfPayments - interestOnlyPeriod * 12) - 1)

    const schedule = []
    let balance = loanAmount
    let totalInterest = 0

    for (let year = 1; year <= loanTerm; year++) {
      if (year <= interestOnlyPeriod) {
        totalInterest += interestOnlyPayment * 12
      } else {
        const yearlyInterest = balance * (Math.pow(1 + monthlyRate, 12) - 1)
        const yearlyPrincipal = fullPayment * 12 - yearlyInterest
        balance -= yearlyPrincipal
        totalInterest += yearlyInterest
      }

      schedule.push({
        year,
        balance,
        totalInterest
      })
    }

    setResults({
      interestOnlyPayment,
      fullPayment,
      schedule
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Interest-Only Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your loan details for interest-only calculation</CardDescription>
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
                  <Label htmlFor="interestOnlyPeriod">Interest-Only Period (years)</Label>
                  <Input
                    id="interestOnlyPeriod"
                    type="number"
                    value={interestOnlyPeriod}
                    onChange={(e) => setInterestOnlyPeriod(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Total Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateInterestOnly}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your interest-only loan calculation results</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Interest-Only Payment: ${results.interestOnlyPayment.toFixed(2)}</p>
                  <p className="mb-4">Full Payment after Interest-Only Period: ${results.fullPayment.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.schedule}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Loan Balance" />
                      <Line type="monotone" dataKey="totalInterest" stroke="#82ca9d" name="Total Interest Paid" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Interest-Only Mortgages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">An interest-only mortgage is a type of home loan where you only pay the interest for a set period, typically 5 to 10 years. After this period, you start paying both principal and interest.</p>
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Lower Initial Payments:</strong> During the interest-only period, your monthly payments are lower because you're not paying down the principal.</li>
              <li><strong>Payment Increase:</strong> After the interest-only period, your payments will increase significantly as you start paying both principal and interest.</li>
              <li><strong>No Equity Build-up:</strong> During the interest-only period, you're not building equity in your home unless the property value increases.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Pros and Cons:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Pro:</strong> Lower initial payments can free up cash for other investments or expenses.</li>
              <li><strong>Pro:</strong> Can be beneficial for those with irregular income or expecting significant income increases.</li>
              <li><strong>Con:</strong> Higher risk if property values decline, as you're not building equity.</li>
              <li><strong>Con:</strong> Larger payments after the interest-only period can be a shock to your budget.</li>
            </ul>
            <p>Interest-only mortgages can be complex financial products. They're not suitable for everyone and come with significant risks. Always consult with a financial advisor before choosing an interest-only mortgage.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}