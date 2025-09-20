"use client"

import { use } from "react"
import StockChart from "@/components/stock-chart"
import TradeModal from "@/components/trade-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock stock data
const stockData = {
  AAPL: { name: "Apple Inc.", price: 175.43, change: +2.15, changePercent: +1.24 },
  GOOGL: { name: "Alphabet Inc.", price: 2847.52, change: -15.23, changePercent: -0.53 },
  MSFT: { name: "Microsoft Corp.", price: 378.85, change: +5.67, changePercent: +1.52 },
  TSLA: { name: "Tesla Inc.", price: 248.42, change: +12.35, changePercent: +5.23 },
  NVDA: { name: "NVIDIA Corp.", price: 875.28, change: +23.45, changePercent: +2.75 },
}

export default function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params)
  const stock = stockData[symbol.toUpperCase() as keyof typeof stockData]

  if (!stock) {
    return <div>Stock not found</div>
  }

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
        </div>

        {/* Stock Chart */}
        <StockChart
          symbol={symbol.toUpperCase()}
          name={stock.name}
          currentPrice={stock.price}
          change={stock.change}
          changePercent={stock.changePercent}
        />

        {/* Trading Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TradeModal
              symbol={symbol.toUpperCase()}
              name={stock.name}
              currentPrice={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
            >
              <Button size="lg" className="w-full">
                Trade {symbol.toUpperCase()}
              </Button>
            </TradeModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open:</span>
                <span className="font-semibold">${(stock.price - 2.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High:</span>
                <span className="font-semibold">${(stock.price + 5.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Low:</span>
                <span className="font-semibold">${(stock.price - 3.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-semibold">2.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Volume:</span>
                <span className="font-semibold">3.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap:</span>
                <span className="font-semibold">$2.8T</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
