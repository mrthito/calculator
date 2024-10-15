"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function HomeAffordability() {
  const [annualIncome, setAnnualIncome] = useState(75000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [downPayment, setDownPayment] = useState(50000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [results, setResults] = useState(null)

  const calculateAffordability = () => {
    const monthlyIncome = annualIncome / 12
    const maxMonthlyPayment = monthlyIncome * 0.28
    const maxTotalMonthlyPayment = monthlyIncome * 0.36 - monthlyDebts

    const affordablePayment = Math.min(maxMonthlyPayment, maxTotalMonthlyPayment)

    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const affordablePrice = (affordablePayment / (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1))) + downPayment

    setResults({
      affordablePrice: affordablePrice,
      monthlyPayment: affordablePayment,
      downPayment: downPayment,
    })
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">How Much Home Can I Afford?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Enter your financial details to calculate home affordability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income ($)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyDebts">Monthly Debts ($)</Label>
                  <Input
                    id="monthlyDebts"
                    type="number"
                    value={monthlyDebts}
                    onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment ($)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
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
                <Button onClick={calculateAffordability}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your home affordability estimate</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="text-2xl font-bold mb-4">Affordable Home Price: ${results.affordablePrice.toFixed(2)}</p>
                  <p className="mb-2">Estimated Monthly Payment: ${results.monthlyPayment.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Loan Amount', value: results.affordablePrice - results.downPayment },
                          { name: 'Down Payment', value: results.downPayment },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Home Affordability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Determining how much home you can afford involves considering various financial factors and following some general guidelines.</p>
            <h3 className="text-xl font-semibold mb-2">Key Factors:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Income:</strong> Your annual income is a primary factor in determining how much you can afford to spend on a home.</li>
              <li><strong>Debts:</strong> Existing debts reduce the amount you can allocate to housing expenses.</li>
              <li><strong>Down Payment:</strong> A larger down payment can increase the home price you can afford and may help you avoid private mortgage insurance (PMI).</li>
              <li><strong>Interest Rate:</strong> Lower interest rates allow you to afford a higher-priced home for the same monthly payment.</li>
              <li><strong>Loan Term:</strong> Longer loan terms typically result in lower monthly payments but higher total interest paid over the life of the loan.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">General Guidelines:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>28% Rule:</strong> Your monthly mortgage payment should not exceed 28% of your gross monthly income.</li>
              <li><strong>36% Rule:</strong> Your total monthly debt payments (including your mortgage) should not exceed 36% of your gross monthly income.</li>
            </ul>
            <p>Remember, these calculations provide a general estimate. Consider additional costs such as property taxes, insurance, maintenance, and utilities when budgeting for a home purchase.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}