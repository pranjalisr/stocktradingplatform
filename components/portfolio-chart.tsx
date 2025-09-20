"use client"

import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock portfolio performance data
const generatePortfolioData = (days: number) => {
  const data = []
  let baseValue = 100000 // Starting with $100k

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Add some realistic portfolio growth with volatility
    const change = (Math.random() - 0.45) * (baseValue * 0.02) // Slight upward bias
    baseValue += change

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.max(baseValue, baseValue * 0.7), // Prevent too much loss
      benchmark: 100000 * Math.pow(1.08, i / 365), // 8% annual benchmark
    })
  }

  return data
}

export default function PortfolioChart() {
  const [timeframe, setTimeframe] = useState("1M")

  const timeframes = {
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    ALL: 730,
  }

  const chartData = generatePortfolioData(timeframes[timeframe as keyof typeof timeframes])
  const currentValue = chartData[chartData.length - 1]?.value || 0
  const initialValue = chartData[0]?.value || 0
  const totalReturn = currentValue - initialValue
  const totalReturnPercent = (totalReturn / initialValue) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Portfolio Performance</CardTitle>
            <p className="text-muted-foreground">Track your investment growth over time</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${currentValue.toFixed(2)}</div>
            <div className={`flex items-center gap-1 ${totalReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
              <span className="font-semibold">
                {totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)} ({totalReturnPercent >= 0 ? "+" : ""}
                {totalReturnPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {Object.keys(timeframes).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                domain={["dataMin - 1000", "dataMax + 1000"]}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toFixed(2)}`,
                  name === "value" ? "Portfolio" : "Benchmark",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                fill="url(#benchmarkGradient)"
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
