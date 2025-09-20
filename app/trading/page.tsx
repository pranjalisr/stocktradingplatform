"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import OrderManagement from "@/components/order-management"
import TradeModal from "@/components/trade-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: +2.15, changePercent: +1.24 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.52, change: -15.23, changePercent: -0.53 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: +5.67, changePercent: +1.52 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.42, change: +12.35, changePercent: +5.23 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: +23.45, changePercent: +2.75 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3234.56, change: -8.9, changePercent: -0.27 },
]

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Trading Center</h1>
        </div>

        {/* Quick Trade Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularStocks.map((stock) => (
                <div key={stock.symbol} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                    <Badge variant={stock.change >= 0 ? "default" : "destructive"}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </Badge>
                  </div>

                  <div className="text-xl font-bold mb-3">${stock.price.toFixed(2)}</div>

                  <div className="flex gap-2">
                    <TradeModal
                      symbol={stock.symbol}
                      name={stock.name}
                      currentPrice={stock.price}
                      change={stock.change}
                      changePercent={stock.changePercent}
                    >
                      <Button size="sm" className="flex-1">
                        Trade
                      </Button>
                    </TradeModal>
                    <Link href={`/stock/${stock.symbol.toLowerCase()}`}>
                      <Button variant="outline" size="sm">
                        Chart
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Management */}
        <OrderManagement />
      </div>
    </div>
  )
}
