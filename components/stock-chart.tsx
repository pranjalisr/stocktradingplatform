"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

// Mock stock data for different time periods
const generateStockData = (symbol: string, days: number) => {
  const data = []
  let basePrice =
    symbol === "AAPL" ? 175 : symbol === "GOOGL" ? 2850 : symbol === "MSFT" ? 378 : symbol === "TSLA" ? 248 : 875

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Add some realistic price movement
    const change = (Math.random() - 0.5) * (basePrice * 0.05)
    basePrice += change

    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.max(basePrice, basePrice * 0.8), // Prevent negative prices
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    })
  }

  return data
}

interface StockChartProps {
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
}

export default function StockChart({ symbol, name, currentPrice, change, changePercent }: StockChartProps) {
  const [timeframe, setTimeframe] = useState("1M")

  const timeframes = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "1Y": 365,
  }

  const chartData = generateStockData(symbol, timeframes[timeframe as keyof typeof timeframes])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{symbol}</CardTitle>
            <p className="text-muted-foreground">{name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${currentPrice.toFixed(2)}</div>
            <div className={`flex items-center gap-1 ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="font-semibold">
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)} ({changePercent >= 0 ? "+" : ""}
                {changePercent.toFixed(2)}%)
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={change >= 0 ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: change >= 0 ? "#22c55e" : "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="font-semibold">{(chartData[chartData.length - 1]?.volume || 0).toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-semibold">$2.8T</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">P/E Ratio</div>
            <div className="font-semibold">28.5</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">52W High</div>
            <div className="font-semibold">$198.23</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
