"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState([])

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    setMonthlyPayment(monthlyPayment)

    let balance = loanAmount
    const schedule = []

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyRate
      const principal = monthlyPayment - interest
      balance -= principal

      if (i % 12 === 0) {
        schedule.push({
          year: i / 12,
          balance: balance,
          totalInterest: loanAmount - balance - principal * (i - 1)
        })
      }
    }

    setAmortizationSchedule(schedule)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Mortgage Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mortgage Details</CardTitle>
              <CardDescription>Enter your mortgage details to calculate your monthly payment</CardDescription>
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
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateMortgage}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your mortgage calculation results</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={amortizationSchedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Remaining Balance" />
                  <Line type="monotone" dataKey="totalInterest" stroke="#82ca9d" name="Total Interest Paid" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Your Mortgage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">A mortgage is a loan used to purchase a home or property. The calculation above helps you understand your monthly payments and how your loan balance will change over time.</p>
            <h3 className="text-xl font-semibold mb-2">Key Components:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Principal:</strong> The original amount borrowed.</li>
              <li><strong>Interest:</strong> The cost of borrowing money, calculated as a percentage of the principal.</li>
              <li><strong>Term:</strong> The length of time to repay the loan, typically 15 or 30 years.</li>
            </ul>
            <p>The chart above shows how your loan balance decreases over time (amortization) and the total interest paid. In the early years of your mortgage, a larger portion of your payment goes towards interest. As time passes, more of your payment goes towards the principal, helping you build equity faster.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}