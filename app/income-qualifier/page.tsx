"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function IncomeQualifier() {
  const [homePrice, setHomePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [propertyTax, setPropertyTax] = useState(3000)
  const [homeInsurance, setHomeInsurance] = useState(1200)
  const [hoa, setHoa] = useState(0)
  const [results, setResults] = useState(null)

  const calculateRequiredIncome = () => {
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyMortgagePayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const monthlyPropertyTax = propertyTax / 12
    const monthlyHomeInsurance = homeInsurance / 12
    const monthlyHoa = hoa / 12

    const totalMonthlyPayment = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa

    const requiredYearlyIncome28 = (totalMonthlyPayment / 0.28) * 12
    const requiredYearlyIncome36 = (totalMonthlyPayment / 0.36) * 12

    const monthlyExpenses = [
      { name: 'Mortgage', value: monthlyMortgagePayment },
      { name: 'Property Tax', value: monthlyPropertyTax },
      { name: 'Home Insurance', value: monthlyHomeInsurance },
      { name: 'HOA', value: monthlyHoa },
    ]

    setResults({
      totalMonthlyPayment,
      requiredYearlyIncome28,
      requiredYearlyIncome36,
      monthlyExpenses
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">How Much Income to Qualify?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Home Purchase Details</CardTitle>
              <CardDescription>Enter details about the home you want to purchase</CardDescription>
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
                  <Label htmlFor="homeInsurance">Annual Home Insurance ($)</Label>
                  <Input
                    id="homeInsurance"
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hoa">Monthly HOA Fees ($)</Label>
                  <Input
                    id="hoa"
                    type="number"
                    value={hoa}
                    onChange={(e) => setHoa(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateRequiredIncome}>Calculate</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Required income to qualify for this home</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="mb-2">Total Monthly Payment: ${results.totalMonthlyPayment.toFixed(2)}</p>
                  <p className="mb-2">Required Yearly Income (28% rule): ${results.requiredYearlyIncome28.toFixed(2)}</p>
                  <p className="mb-4">Required Yearly Income (36% rule): ${results.requiredYearlyIncome36.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.monthlyExpenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Understanding Income Requirements for Mortgages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Lenders use various ratios to determine how much income you need to qualify for a mortgage. The two most common are the 28/36 rule:</p>
            <h3 className="text-xl font-semibold mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>28% Rule (Front-End Ratio):</strong> Your monthly mortgage payment shouldn't exceed 28% of your gross monthly income.</li>
              <li><strong>36% Rule (Back-End Ratio):</strong> Your total monthly debt payments (including mortgage) shouldn't exceed 36% of your gross monthly income.</li>
              <li><strong>PITI:</strong> Principal, Interest, Taxes, and Insurance - the components of a typical mortgage payment.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Factors Affecting Required Income:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Home Price:</strong> Higher home prices require higher incomes to qualify.</li>
              <li><strong>Down Payment:</strong> Larger down payments reduce the loan amount, potentially lowering the required income.</li>
              <li><strong>Interest Rate:</strong> Higher rates increase monthly payments, requiring higher income to qualify.</li>
              <li><strong>Other Debts:</strong> Existing debts reduce the amount you can put towards a mortgage.</li>
            </ul>
            <p>Remember, these are general guidelines. Some loan programs may allow higher debt-to-income ratios. Always consult with a mortgage professional to understand your specific situation and options.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}