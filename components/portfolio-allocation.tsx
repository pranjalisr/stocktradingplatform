"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const allocationData = [
  { name: "Technology", value: 45, amount: 56437.5, color: "hsl(var(--chart-1))" },
  { name: "Healthcare", value: 20, amount: 25086.1, color: "hsl(var(--chart-2))" },
  { name: "Financial", value: 15, amount: 18814.58, color: "hsl(var(--chart-3))" },
  { name: "Consumer", value: 12, amount: 15051.66, color: "hsl(var(--chart-4))" },
  { name: "Energy", value: 5, amount: 6271.53, color: "hsl(var(--chart-5))" },
  { name: "Cash", value: 3, amount: 3769.13, color: "hsl(var(--muted))" },
]

const topHoldings = [
  { symbol: "AAPL", name: "Apple Inc.", value: 18771.5, percentage: 14.9, sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp.", value: 15471.25, percentage: 12.3, sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA Corp.", value: 12752.8, percentage: 10.2, sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", value: 9234.67, percentage: 7.4, sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc.", value: 8456.23, percentage: 6.7, sector: "Consumer" },
]

export default function PortfolioAllocation() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--card-foreground))",
                  }}
                  formatter={(value: number, name: string) => [`${value}%`, "Allocation"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {allocationData.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                  <span className="text-sm font-medium">{sector.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">${sector.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{sector.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topHoldings.map((holding) => (
              <div key={holding.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${holding.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{holding.percentage}%</div>
                  </div>
                </div>
                <Progress value={holding.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">{holding.sector}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
