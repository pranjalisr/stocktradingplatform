"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TradeModalProps {
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  children: React.ReactNode
}

export default function TradeModal({ symbol, name, currentPrice, change, changePercent, children }: TradeModalProps) {
  const [shares, setShares] = useState(1)
  const [orderType, setOrderType] = useState("market")
  const [limitPrice, setLimitPrice] = useState(currentPrice)
  const [stopPrice, setStopPrice] = useState(currentPrice * 0.95)
  const [timeInForce, setTimeInForce] = useState("day")
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleTrade = (action: "buy" | "sell") => {
    const orderValue = shares * (orderType === "market" ? currentPrice : limitPrice)

    toast({
      title: `${action.toUpperCase()} Order Placed`,
      description: `${action === "buy" ? "Bought" : "Sold"} ${shares} shares of ${symbol} for $${orderValue.toFixed(2)}`,
    })

    setOpen(false)
    setShares(1)
  }

  const estimatedCost = shares * (orderType === "market" ? currentPrice : limitPrice)
  const commission = 0 // Commission-free trading

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Trade {symbol}
            <Badge variant={change >= 0 ? "default" : "destructive"}>
              {change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {change >= 0 ? "+" : ""}
              {changePercent.toFixed(2)}%
            </Badge>
          </DialogTitle>
          <p className="text-muted-foreground">
            {name} • ${currentPrice.toFixed(2)}
          </p>
        </DialogHeader>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="text-green-600">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-red-600">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Buy {symbol}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Shares */}
                  <div className="space-y-2">
                    <Label htmlFor="shares">Shares</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShares(Math.max(1, shares - 1))}
                        disabled={shares <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="shares"
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="text-center"
                        min="1"
                      />
                      <Button variant="outline" size="sm" onClick={() => setShares(shares + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Order Type */}
                  <div className="space-y-2">
                    <Label htmlFor="orderType">Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Loss</SelectItem>
                        <SelectItem value="stop-limit">Stop Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditional Price Fields */}
                  {orderType === "limit" && (
                    <div className="space-y-2">
                      <Label htmlFor="limitPrice">Limit Price</Label>
                      <Input
                        id="limitPrice"
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(Number.parseFloat(e.target.value) || currentPrice)}
                        step="0.01"
                      />
                    </div>
                  )}

                  {(orderType === "stop" || orderType === "stop-limit") && (
                    <div className="space-y-2">
                      <Label htmlFor="stopPrice">Stop Price</Label>
                      <Input
                        id="stopPrice"
                        type="number"
                        value={stopPrice}
                        onChange={(e) => setStopPrice(Number.parseFloat(e.target.value) || currentPrice * 0.95)}
                        step="0.01"
                      />
                    </div>
                  )}

                  {/* Time in Force */}
                  <div className="space-y-2">
                    <Label htmlFor="timeInForce">Time in Force</Label>
                    <Select value={timeInForce} onValueChange={setTimeInForce}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="gtc">Good Till Canceled</SelectItem>
                        <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                        <SelectItem value="fok">Fill or Kill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Symbol:</span>
                      <span className="font-semibold">{symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Action:</span>
                      <Badge className="bg-green-600">BUY</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shares:</span>
                      <span className="font-semibold">{shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Type:</span>
                      <span className="font-semibold capitalize">{orderType.replace("-", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">
                        ${orderType === "market" ? currentPrice.toFixed(2) : limitPrice.toFixed(2)}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <span className="font-semibold">${estimatedCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commission:</span>
                      <span className="font-semibold">${commission.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">${(estimatedCost + commission).toFixed(2)}</span>
                    </div>
                  </div>

                  {orderType !== "market" && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {orderType === "limit" && "Limit orders may not execute immediately"}
                          {orderType === "stop" && "Stop orders will trigger at the stop price"}
                          {orderType === "stop-limit" && "Stop-limit orders combine stop and limit features"}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleTrade("buy")}>
                    Place Buy Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Sell {symbol}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Shares */}
                  <div className="space-y-2">
                    <Label htmlFor="sellShares">Shares</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShares(Math.max(1, shares - 1))}
                        disabled={shares <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="sellShares"
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="text-center"
                        min="1"
                      />
                      <Button variant="outline" size="sm" onClick={() => setShares(shares + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Available: 50 shares</p>
                  </div>

                  {/* Order Type */}
                  <div className="space-y-2">
                    <Label htmlFor="sellOrderType">Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Loss</SelectItem>
                        <SelectItem value="stop-limit">Stop Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditional Price Fields */}
                  {orderType === "limit" && (
                    <div className="space-y-2">
                      <Label htmlFor="sellLimitPrice">Limit Price</Label>
                      <Input
                        id="sellLimitPrice"
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(Number.parseFloat(e.target.value) || currentPrice)}
                        step="0.01"
                      />
                    </div>
                  )}

                  {(orderType === "stop" || orderType === "stop-limit") && (
                    <div className="space-y-2">
                      <Label htmlFor="sellStopPrice">Stop Price</Label>
                      <Input
                        id="sellStopPrice"
                        type="number"
                        value={stopPrice}
                        onChange={(e) => setStopPrice(Number.parseFloat(e.target.value) || currentPrice * 0.95)}
                        step="0.01"
                      />
                    </div>
                  )}

                  {/* Time in Force */}
                  <div className="space-y-2">
                    <Label htmlFor="sellTimeInForce">Time in Force</Label>
                    <Select value={timeInForce} onValueChange={setTimeInForce}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="gtc">Good Till Canceled</SelectItem>
                        <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                        <SelectItem value="fok">Fill or Kill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Symbol:</span>
                      <span className="font-semibold">{symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Action:</span>
                      <Badge variant="destructive">SELL</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shares:</span>
                      <span className="font-semibold">{shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Type:</span>
                      <span className="font-semibold capitalize">{orderType.replace("-", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">
                        ${orderType === "market" ? currentPrice.toFixed(2) : limitPrice.toFixed(2)}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Value:</span>
                      <span className="font-semibold">${estimatedCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commission:</span>
                      <span className="font-semibold">${commission.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Net Proceeds:</span>
                      <span className="font-bold">${(estimatedCost - commission).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleTrade("sell")}>
                    Place Sell Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
