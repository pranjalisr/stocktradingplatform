"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const marketIndices = [
  { name: "S&P 500", symbol: "SPX", value: 4567.89, change: +23.45, changePercent: +0.52 },
  { name: "Dow Jones", symbol: "DJI", value: 35234.12, change: -45.67, changePercent: -0.13 },
  { name: "NASDAQ", symbol: "IXIC", value: 14567.34, change: +67.89, changePercent: +0.47 },
  { name: "Russell 2000", symbol: "RUT", value: 2134.56, change: +12.34, changePercent: +0.58 },
]

const topMovers = {
  gainers: [
    { symbol: "NVDA", name: "NVIDIA Corp", price: 875.28, change: +23.45, changePercent: +2.75 },
    { symbol: "TSLA", name: "Tesla Inc", price: 248.42, change: +12.35, changePercent: +5.23 },
    { symbol: "AMD", name: "Advanced Micro Devices", price: 156.78, change: +8.9, changePercent: +6.02 },
  ],
  losers: [
    { symbol: "META", name: "Meta Platforms", price: 312.45, change: -15.67, changePercent: -4.78 },
    { symbol: "NFLX", name: "Netflix Inc", price: 445.23, change: -12.34, changePercent: -2.7 },
    { symbol: "GOOGL", name: "Alphabet Inc", price: 2847.52, change: -15.23, changePercent: -0.53 },
  ],
}

export default function MarketOverview() {
  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <Card>
        <CardHeader>
          <CardTitle>Market Indices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketIndices.map((index) => (
              <div key={index.symbol} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{index.symbol}</div>
                  <Badge variant={index.change >= 0 ? "default" : "destructive"}>
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {index.changePercent >= 0 ? "+" : ""}
                    {index.changePercent.toFixed(2)}%
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{index.name}</div>
                <div className="text-xl font-bold">{index.value.toLocaleString()}</div>
                <div className={`text-sm ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {index.change >= 0 ? "+" : ""}
                  {index.change.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-500">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMovers.gainers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${stock.price.toFixed(2)}</div>
                    <div className="text-sm text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />+{stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMovers.losers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${stock.price.toFixed(2)}</div>
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
