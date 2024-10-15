"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PrincipalCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(1000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [results, setResults] = useState(null)

  const calculatePrincipal = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const principal = monthlyPayment / ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1))

    let balance = principal
    const amortizationSchedule = []

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyRate
      const principalPayment = monthlyPayment - interest
      balance -= principalPayment

      if (i % 12 === 0 || i === 1) {
        amortizationSchedule.push({
          year: i === 1 ? 0 : i / 12,
          balance: balance,
          totalInterest: i === 1 ? 0 : principal - balance - principalPayment * (i - 1)
        })
      }
    }

    setResults({
      principal: principal,
      amortizationSchedule: amortizationSchedule
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Principal Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your desired monthly payment and loan terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment">Desired Monthly Payment ($)</Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
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
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculatePrincipal}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your principal and amortization schedule</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="text-2xl font-bold mb-4">Principal Amount: ${results.principal.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.amortizationSchedule}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Remaining Balance" />
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
            <CardTitle>Understanding Principal Calculation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The principal calculator helps you determine how much you can borrow based on your desired monthly payment, interest rate, and loan term.</p>
            <h3 className="text-xl font-semibold mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Principal:</strong> The initial amount borrowed or the amount still owed on a loan.</li>
              <li><strong>Monthly Payment:</strong> The amount paid each month, including both principal and interest.</li>
              <li><strong>Interest Rate:</strong> The cost of borrowing money, expressed as a percentage of the principal.</li>
              <li><strong>Loan Term:</strong> The length of time to repay the loan, typically in years.</li>
            </ul>
            <p>The chart above illustrates how your loan balance decreases over time (amortization) and how much total interest you'll pay throughout the loan term. In the early years of your loan, a larger portion of your payment goes towards interest. As time passes, more of your payment goes towards the principal, helping you build equity faster.</p>
            <p className="mt-4">Remember that this calculation doesn't include other potential costs such as property taxes, insurance, or private mortgage insurance (PMI). These additional expenses should be considered when budgeting for a home purchase.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}