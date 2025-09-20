"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Search, X } from "lucide-react"

const mockOrders = [
  {
    id: "ORD001",
    symbol: "AAPL",
    type: "BUY",
    shares: 50,
    price: 175.43,
    orderType: "Market",
    status: "Filled",
    timestamp: "2024-01-15 10:30:00",
    fillPrice: 175.43,
    commission: 0,
  },
  {
    id: "ORD002",
    symbol: "GOOGL",
    type: "SELL",
    shares: 10,
    price: 2850.0,
    orderType: "Limit",
    status: "Pending",
    timestamp: "2024-01-15 09:45:00",
    fillPrice: null,
    commission: 0,
  },
  {
    id: "ORD003",
    symbol: "MSFT",
    type: "BUY",
    shares: 25,
    price: 378.85,
    orderType: "Market",
    status: "Filled",
    timestamp: "2024-01-15 09:15:00",
    fillPrice: 378.85,
    commission: 0,
  },
  {
    id: "ORD004",
    symbol: "TSLA",
    type: "BUY",
    shares: 20,
    price: 245.0,
    orderType: "Stop Loss",
    status: "Canceled",
    timestamp: "2024-01-14 15:30:00",
    fillPrice: null,
    commission: 0,
  },
  {
    id: "ORD005",
    symbol: "NVDA",
    type: "SELL",
    shares: 5,
    price: 875.28,
    orderType: "Limit",
    status: "Partially Filled",
    timestamp: "2024-01-14 14:20:00",
    fillPrice: 875.28,
    commission: 0,
  },
]

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || order.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "filled":
        return "default"
      case "pending":
        return "secondary"
      case "canceled":
        return "destructive"
      case "partially filled":
        return "outline"
      default:
        return "outline"
    }
  }

  const cancelOrder = (orderId: string) => {
    // In a real app, this would make an API call
    console.log(`Canceling order ${orderId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Order Management
        </CardTitle>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="partially filled">Partially Filled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="space-y-3">
              {filteredOrders
                .filter((order) => order.status === "Pending" || order.status === "Partially Filled")
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={order.type === "BUY" ? "default" : "destructive"}>{order.type}</Badge>
                      <div>
                        <div className="font-semibold">{order.symbol}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.shares} shares @ ${order.price.toFixed(2)} • {order.orderType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(order.timestamp).toLocaleString()}
                        </div>
                      </div>

                      {order.status === "Pending" && (
                        <Button variant="outline" size="sm" onClick={() => cancelOrder(order.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

              {filteredOrders.filter((order) => order.status === "Pending" || order.status === "Partially Filled")
                .length === 0 && <div className="text-center py-8 text-muted-foreground">No active orders found</div>}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge variant={order.type === "BUY" ? "default" : "destructive"}>{order.type}</Badge>
                    <div>
                      <div className="font-semibold">{order.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.shares} shares @ ${order.price.toFixed(2)} • {order.orderType}
                      </div>
                      <div className="text-xs text-muted-foreground">Order ID: {order.id}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {new Date(order.timestamp).toLocaleString()}
                    </div>
                    {order.fillPrice && (
                      <div className="text-sm font-semibold">Filled @ ${order.fillPrice.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
