"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TaxBenefits() {
  const [homePrice, setHomePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [propertyTax, setPropertyTax] = useState(3000)
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [results, setResults] = useState(null)

  const calculateTaxBenefits = () => {
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    let totalInterest = 0
    let balance = loanAmount

    for (let i = 1; i <= 12; i++) {
      const interest = balance * monthlyRate
      totalInterest += interest
      const principal = monthlyPayment - interest
      balance -= principal
    }

    const deductions = totalInterest + propertyTax
    const taxSavings = deductions * 0.22 // Assuming 22% tax bracket

    setResults({
      annualMortgagePayments: monthlyPayment * 12,
      annualInterest: totalInterest,
      annualPropertyTax: propertyTax,
      totalDeductions: deductions,
      estimatedTaxSavings: taxSavings
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Tax Benefits of Buying a Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Home Purchase Details</CardTitle>
              <CardDescription>Enter information about your home purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="homePrice">Home Price ($)</Label>
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
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
                <div className="space-y-2">
                  <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
                  <Input
                    id="propertyTax"
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income ($)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateTaxBenefits}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tax Benefit Results</CardTitle>
              <CardDescription>Estimated tax benefits of your home purchase</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Annual Mortgage Payments: ${results.annualMortgagePayments.toFixed(2)}</p>
                  <p className="mb-2">Annual Interest Paid: ${results.annualInterest.toFixed(2)}</p>
                  <p className="mb-2">Annual Property Tax: ${results.annualPropertyTax.toFixed(2)}</p>
                  <p className="mb-2">Total Deductions: ${results.totalDeductions.toFixed(2)}</p>
                  <p className="text-2xl font-bold mb-4">Estimated Tax Savings: ${results.estimatedTaxSavings.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: 'Interest', amount: results.annualInterest },
                        { name: 'Property Tax', amount: results.annualPropertyTax },
                        { name: 'Tax Savings', amount: results.estimatedTaxSavings },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Tax Benefits of Home Ownership</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Homeownership can offer several tax benefits that may reduce your overall tax liability. Here are some key points to understand:</p>
            <h3 className="text-xl font-semibold mb-2">Common Tax Deductions:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Mortgage Interest:</strong> You can deduct the interest paid on up to $750,000 of mortgage debt (or $375,000 if married filing separately).</li>
              <li><strong>Property Taxes:</strong> You can deduct up to $10,000 ($5,000 if married filing separately) in state and local taxes, including property taxes.</li>
              <li><strong>Points:</strong> If you paid points to lower your interest rate, these may be deductible in the year you paid them or over the life of the loan.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Important Considerations:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Standard Deduction:</strong> To benefit from these deductions, your total itemized deductions must exceed the standard deduction ($12,950 for single filers, $25,900 for married filing jointly in 2022).</li>
              <li><strong>Tax Brackets:</strong> The value of your deductions depends on your tax bracket. Higher-income earners in higher tax brackets may see more significant savings.</li>
              <li><strong>Limits:</strong> There are limits on how much you can deduct, particularly for high-value homes or in high-tax areas.</li>
            </ul>
            <p>Remember, tax laws can change, and individual situations vary. Always consult with a qualified tax professional for personalized advice on your specific situation.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}