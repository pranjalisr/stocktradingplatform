"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Newspaper,
  Menu,
  Search,
  Bell,
  Settings,
  User,
  PieChart,
  Activity,
} from "lucide-react"
import MarketOverview from "@/components/market-overview"
import Link from "next/link"

export default function TradingDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">TradePro</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-64 rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-border bg-card">
            <nav className="p-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Link href="/portfolio">
                <Button variant="ghost" className="w-full justify-start">
                  <PieChart className="mr-2 h-4 w-4" />
                  Portfolio Analysis
                </Button>
              </Link>
              <Link href="/trading">
                <Button variant="ghost" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Trading Center
                </Button>
              </Link>
              <Link href="/news">
                <Button variant="ghost" className="w-full justify-start">
                  <Newspaper className="mr-2 h-4 w-4" />
                  Market News
                </Button>
              </Link>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Portfolio Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">Portfolio Overview</h2>
              <div className="flex gap-2">
                <Link href="/portfolio">
                  <Button variant="outline">
                    <PieChart className="mr-2 h-4 w-4" />
                    View Full Analysis
                  </Button>
                </Link>
                <Link href="/trading">
                  <Button>
                    <Activity className="mr-2 h-4 w-4" />
                    Trade Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125,430.50</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+2.5%</span> from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Day's Gain/Loss</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+$3,125.50</div>
                  <p className="text-xs text-muted-foreground">+2.56% today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Buying Power</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,569.50</div>
                  <p className="text-xs text-muted-foreground">Available to trade</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+$25,430.50</div>
                  <p className="text-xs text-muted-foreground">+25.43% all time</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="market" className="space-y-4">
            <TabsList>
              <TabsTrigger value="market">Market Overview</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="news">Market News</TabsTrigger>
            </TabsList>

            <TabsContent value="market" className="space-y-4">
              <MarketOverview />
            </TabsContent>

            <TabsContent value="watchlist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Watchlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: +2.15, changePercent: +1.24 },
                      { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.52, change: -15.23, changePercent: -0.53 },
                      { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: +5.67, changePercent: +1.52 },
                      { symbol: "TSLA", name: "Tesla Inc.", price: 248.42, change: +12.35, changePercent: +5.23 },
                      { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: +23.45, changePercent: +2.75 },
                    ].map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-semibold">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">${stock.price.toFixed(2)}</div>
                            <div
                              className={`text-sm flex items-center gap-1 ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                          <Link href={`/stock/${stock.symbol.toLowerCase()}`}>
                            <Button size="sm">View Chart</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        symbol: "AAPL",
                        shares: 50,
                        avgCost: 165.2,
                        currentPrice: 175.43,
                        totalValue: 8771.5,
                        gainLoss: +511.5,
                      },
                      {
                        symbol: "MSFT",
                        shares: 25,
                        avgCost: 350.0,
                        currentPrice: 378.85,
                        totalValue: 9471.25,
                        gainLoss: +721.25,
                      },
                      {
                        symbol: "NVDA",
                        shares: 10,
                        avgCost: 820.0,
                        currentPrice: 875.28,
                        totalValue: 8752.8,
                        gainLoss: +552.8,
                      },
                    ].map((position) => (
                      <div
                        key={position.symbol}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-semibold">{position.symbol}</div>
                            <div className="text-sm text-muted-foreground">{position.shares} shares</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Avg Cost</div>
                            <div className="font-semibold">${position.avgCost.toFixed(2)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Current</div>
                            <div className="font-semibold">${position.currentPrice.toFixed(2)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Total Value</div>
                            <div className="font-semibold">${position.totalValue.toFixed(2)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Gain/Loss</div>
                            <div
                              className={`font-semibold ${position.gainLoss >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {position.gainLoss >= 0 ? "+" : ""}${position.gainLoss.toFixed(2)}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Sell
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { symbol: "TSLA", type: "BUY", shares: 20, price: 245.0, status: "Filled", time: "10:30 AM" },
                      { symbol: "GOOGL", type: "SELL", shares: 5, price: 2850.0, status: "Pending", time: "09:45 AM" },
                      { symbol: "AAPL", type: "BUY", shares: 10, price: 174.5, status: "Filled", time: "09:15 AM" },
                    ].map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Badge variant={order.type === "BUY" ? "default" : "secondary"}>{order.type}</Badge>
                          <div>
                            <div className="font-semibold">{order.symbol}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.shares} shares @ ${order.price}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={order.status === "Filled" ? "default" : "outline"}>{order.status}</Badge>
                          <div className="text-sm text-muted-foreground">{order.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Market News</CardTitle>
                    <Link href="/news">
                      <Button variant="outline" size="sm">
                        View All News
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Tech Stocks Rally on Strong Earnings Reports",
                        source: "MarketWatch",
                        time: "2 hours ago",
                        impact: "high",
                      },
                      {
                        title: "Federal Reserve Hints at Interest Rate Changes",
                        source: "Reuters",
                        time: "4 hours ago",
                        impact: "high",
                      },
                      {
                        title: "NVIDIA Announces New AI Chip Architecture",
                        source: "TechCrunch",
                        time: "6 hours ago",
                        impact: "medium",
                      },
                      {
                        title: "Apple Reports Record iPhone Sales",
                        source: "Bloomberg",
                        time: "8 hours ago",
                        impact: "medium",
                      },
                    ].map((news, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold flex-1">{news.title}</h3>
                          <Badge
                            variant={news.impact === "high" ? "destructive" : "secondary"}
                            className="ml-2 text-xs"
                          >
                            {news.impact.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{news.source}</span>
                          <span>•</span>
                          <span>{news.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
