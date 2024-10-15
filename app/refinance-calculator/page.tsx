"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function RefinanceCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState(200000)
  const [currentInterestRate, setCurrentInterestRate] = useState(4.5)
  const [currentLoanTerm, setCurrentLoanTerm] = useState(30)
  const [newInterestRate, setNewInterestRate] = useState(3.5)
  const [newLoanTerm, setNewLoanTerm] = useState(30)
  const [closingCosts, setClosingCosts] = useState(3000)
  const [results, setResults] = useState(null)

  const calculateRefinance = () => {
    const currentMonthlyPayment = calculateMonthlyPayment(currentLoanBalance, currentInterestRate, currentLoanTerm)
    const newMonthlyPayment = calculateMonthlyPayment(currentLoanBalance, newInterestRate, newLoanTerm)
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment
    const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)
    const lifetimeSavings = (currentMonthlyPayment * currentLoanTerm * 12) - (newMonthlyPayment * newLoanTerm * 12) - closingCosts

    setResults({
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings
    })
  }

  const calculateMonthlyPayment = (principal, rate, term) => {
    const monthlyRate = rate / 100 / 12
    const numberOfPayments = term * 12
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }

  const chartData = results ? [
    { name: 'Current Loan', payment: results.currentMonthlyPayment },
    { name: 'New Loan', payment: results.newMonthlyPayment },
  ] : []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Refinance Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Refinance Details</CardTitle>
              <CardDescription>Enter your current and new loan details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentLoanBalance">Current Loan Balance ($)</Label>
                  <Input
                    id="currentLoanBalance"
                    type="number"
                    value={currentLoanBalance}
                    onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                  <Input
                    id="currentInterestRate"
                    type="number"
                    step="0.1"
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentLoanTerm">Current Loan Term (years)</Label>
                  <Input
                    id="currentLoanTerm"
                    type="number"
                    value={currentLoanTerm}
                    onChange={(e) => setCurrentLoanTerm(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
                  <Input
                    id="newInterestRate"
                    type="number"
                    step="0.1"
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newLoanTerm">New Loan Term (years)</Label>
                  <Input
                    id="newLoanTerm"
                    type="number"
                    value={newLoanTerm}
                    onChange={(e) => setNewLoanTerm(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                  <Input
                    id="closingCosts"
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateRefinance}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your refinance calculation results</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Current Monthly Payment: ${results.currentMonthlyPayment.toFixed(2)}</p>
                  <p className="mb-2">New Monthly Payment: ${results.newMonthlyPayment.toFixed(2)}</p>
                  <p className="mb-2">Monthly Savings: ${results.monthlySavings.toFixed(2)}</p>
                  <p className="mb-2">Break-even Point: {results.breakEvenMonths} months</p>
                  <p className="mb-4">Lifetime Savings: ${results.lifetimeSavings.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="payment" fill="#8884d8" name="Monthly Payment" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Refinancing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Refinancing is the process of replacing an existing mortgage with a new loan, often to secure better terms or lower interest rates.</p>
            <h3 className="text-xl font-semibold mb-2">Key Considerations:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Interest Rate:</strong> A lower rate can significantly reduce your monthly payments and overall interest paid.</li>
              <li><strong>Loan Term:</strong> Changing the term affects both monthly payments and total interest paid over the life of the loan.</li>
              <li><strong>Closing Costs:</strong> These are the fees associated with refinancing, which can impact the overall benefit of refinancing.</li>
              <li><strong>Break-even Point:</strong> The time it takes for the savings from lower payments to offset the closing costs.</li>
            </ul>
            <p>When considering refinancing, it's important to weigh the short-term costs against the long-term savings. If you plan to stay in your home beyond the break-even point, refinancing could lead to significant savings over time.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}