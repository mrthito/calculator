"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ExtraPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [extraPayment, setExtraPayment] = useState(100)
  const [results, setResults] = useState(null)

  const calculateExtraPayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    let balance = loanAmount
    let month = 0
    const scheduleWithExtra = []
    const scheduleWithoutExtra = []

    while (balance > 0) {
      month++
      const interest = balance * monthlyRate
      let principal = monthlyPayment - interest

      if (principal > balance) {
        principal = balance
      }

      balance -= principal

      if (extraPayment > 0 && balance > 0) {
        if (balance > extraPayment) {
          balance -= extraPayment
        } else {
          balance = 0
        }
      }

      if (month % 12 === 0 || balance === 0) {
        scheduleWithExtra.push({
          year: Math.ceil(month / 12),
          balance: balance
        })
      }
    }

    const yearsWithExtra = Math.ceil(month / 12)
    const totalInterestWithExtra = month * monthlyPayment - loanAmount + (yearsWithExtra * 12 - month) * monthlyPayment

    balance = loanAmount
    month = 0

    while (balance > 0) {
      month++
      const interest = balance * monthlyRate
      let principal = monthlyPayment - interest

      if (principal > balance) {
        principal = balance
      }

      balance -= principal

      if (month % 12 === 0 || balance === 0) {
        scheduleWithoutExtra.push({
          year: Math.ceil(month / 12),
          balance: balance
        })
      }
    }

    const yearsWithoutExtra = Math.ceil(month / 12)
    const totalInterestWithoutExtra = month * monthlyPayment - loanAmount + (yearsWithoutExtra * 12 - month) * monthlyPayment

    setResults({
      yearsWithExtra,
      yearsWithoutExtra,
      totalInterestWithExtra,
      totalInterestWithoutExtra,
      scheduleWithExtra,
      scheduleWithoutExtra
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Extra Payment Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your loan details and extra payment amount</CardDescription>
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
                <div className="space-y-2">
                  <Label htmlFor="extraPayment">Extra Monthly Payment ($)</Label>
                  <Input
                    id="extraPayment"
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateExtraPayment}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Impact of extra payments on your loan</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Loan Term with Extra Payments: {results.yearsWithExtra} years</p>
                  <p className="mb-2">Original Loan Term: {results.yearsWithoutExtra} years</p>
                  <p className="mb-2">Time Saved: {results.yearsWithoutExtra - results.yearsWithExtra} years</p>
                  <p className="mb-2">Total Interest with Extra Payments: ${results.totalInterestWithExtra.toFixed(2)}</p>
                  <p className="mb-4">Total Interest without Extra Payments: ${results.totalInterestWithoutExtra.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" type="number" domain={[0, 'dataMax']} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line data={results.scheduleWithExtra} type="monotone" dataKey="balance" stroke="#8884d8" name="With Extra Payments" />
                      <Line data={results.scheduleWithoutExtra} type="monotone" dataKey="balance" stroke="#82ca9d" name="Without Extra Payments" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Extra Mortgage Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Making extra payments on your mortgage can significantly reduce the time it takes to pay off your loan and save you money on interest over the life of the loan.</p>
            <h3 className="text-xl font-semibold mb-2">Key Benefits:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Shorter Loan Term:</strong> Extra payments reduce your principal faster, shortening the overall loan term.</li>
              <li><strong>Interest Savings:</strong> By paying off your loan faster, you pay less interest over time.</li>
              <li><strong>Build Equity Faster:</strong> Extra payments increase your home equity more quickly.</li>
              <li><strong>Flexibility:</strong> You can make extra payments when you can afford to, without committing to a higher monthly payment.</li>
            </ul>
            <p>The chart above shows how extra payments can accelerate your loan payoff compared to making only the required monthly payments. Even small extra payments can make a significant difference over time.</p>
            <p className="mt-4">Before making extra payments, check with your lender to ensure there are no prepayment penalties and that extra payments will be applied directly to the principal.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}