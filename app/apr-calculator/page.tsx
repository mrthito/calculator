"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function APRCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [originationFee, setOriginationFee] = useState(1000)
  const [otherFees, setOtherFees] = useState(2000)
  const [results, setResults] = useState(null)

  const calculateAPR = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalFees = originationFee + otherFees
    const actualLoanAmount = loanAmount - totalFees

    // Calculate APR using Newton's method
    let aprGuess = interestRate / 100
    const tolerance = 0.0000001
    let iteration = 0
    const maxIterations = 100

    while (iteration < maxIterations) {
      const monthlyAPR = aprGuess / 12
      const presentValue = actualLoanAmount - (monthlyPayment * (1 - Math.pow(1 + monthlyAPR, -numberOfPayments)) / monthlyAPR)

      if (Math.abs(presentValue) < tolerance) {
        break
      }

      const derivative = (numberOfPayments * monthlyPayment * Math.pow(1 + monthlyAPR, -numberOfPayments - 1)) / 12

      aprGuess -= presentValue / derivative
      iteration++
    }

    const apr = aprGuess * 100

    setResults({
      apr: apr,
      monthlyPayment: monthlyPayment,
      totalInterest: (monthlyPayment * numberOfPayments) - loanAmount,
      totalFees: totalFees
    })
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">What's my APR?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your loan details to calculate the APR</CardDescription>
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
                  <Label htmlFor="originationFee">Origination Fee ($)</Label>
                  <Input
                    id="originationFee"
                    type="number"
                    value={originationFee}
                    onChange={(e) => setOriginationFee(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherFees">Other Fees ($)</Label>
                  <Input
                    id="otherFees"
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(Number(e.target.value))}
                  />
                </div>
                <Button onClick={calculateAPR}>Calculate APR</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>APR Results</CardTitle>
              <CardDescription>Your calculated APR and loan cost breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {results && (
                <div>
                  <p className="text-2xl font-bold mb-4">APR: {results.apr.toFixed(3)}%</p>
                  <p className="mb-2">Monthly Payment: ${results.monthlyPayment.toFixed(2)}</p>
                  <p className="mb-4">Total Fees: ${results.totalFees.toFixed(2)}</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: loanAmount },
                          { name: 'Total Interest', value: results.totalInterest },
                          { name: 'Fees', value: results.totalFees },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1, 2].map((entry, index) => (
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
            <CardTitle>Understanding APR (Annual Percentage Rate)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">APR, or Annual Percentage Rate, is a more comprehensive measure of the cost of borrowing money than the simple interest rate. It includes not only the interest rate but also other costs associated with the loan.</p>
            <h3 className="text-xl font-semibold mb-2">Key Components of APR:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Interest Rate:</strong> The basic cost of borrowing money, expressed as a percentage of the loan amount.</li>
              <li><strong>Origination Fees:</strong> Charges by the lender for processing the loan application and underwriting.</li>
              <li><strong>Discount Points:</strong> Optional fees paid to lower the interest rate.</li>
              <li><strong>Other Closing Costs:</strong> Various fees such as appraisal fees, title insurance, and attorney fees.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Why APR Matters:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>True Cost Comparison:</strong> APR allows you to compare the true cost of different loans, even if they have different fee structures.</li>
              <li><strong>Regulatory Requirement:</strong> Lenders are required to disclose the APR to help borrowers make informed decisions.</li>
              <li><strong>Long-term Cost Insight:</strong> APR gives you a better understanding of the long-term cost of your loan, including fees.</li>
            </ul>
            <p>When comparing loans, pay attention to both the interest rate and the APR. A loan with a lower interest rate but higher fees might have a higher APR than a loan with a slightly higher interest rate but lower fees. Always consider your specific financial situation and how long you plan to keep the loan when making decisions based on APR.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}