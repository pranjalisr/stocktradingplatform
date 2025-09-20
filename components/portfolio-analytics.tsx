"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Shield, Zap, DollarSign } from "lucide-react"

const analyticsData = {
  performance: {
    totalReturn: 25430.5,
    totalReturnPercent: 25.43,
    dayChange: 3125.5,
    dayChangePercent: 2.56,
    weekChange: 8234.67,
    weekChangePercent: 6.89,
    monthChange: 12456.78,
    monthChangePercent: 10.23,
  },
  risk: {
    beta: 1.15,
    sharpeRatio: 1.42,
    volatility: 18.5,
    maxDrawdown: -8.2,
    var95: -2.3,
  },
  metrics: {
    dividendYield: 1.8,
    peRatio: 24.5,
    pbRatio: 3.2,
    debtToEquity: 0.45,
  },
}

export default function PortfolioAnalytics() {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total Return</div>
              <div className="text-xl font-bold text-green-500">
                +${analyticsData.performance.totalReturn.toLocaleString()}
              </div>
              <div className="text-sm text-green-500">+{analyticsData.performance.totalReturnPercent}%</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Day Change</div>
              <div className="text-xl font-bold text-green-500">
                +${analyticsData.performance.dayChange.toLocaleString()}
              </div>
              <div className="text-sm text-green-500">+{analyticsData.performance.dayChangePercent}%</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Week Change</div>
              <div className="text-xl font-bold text-green-500">
                +${analyticsData.performance.weekChange.toLocaleString()}
              </div>
              <div className="text-sm text-green-500">+{analyticsData.performance.weekChangePercent}%</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Month Change</div>
              <div className="text-xl font-bold text-green-500">
                +${analyticsData.performance.monthChange.toLocaleString()}
              </div>
              <div className="text-sm text-green-500">+{analyticsData.performance.monthChangePercent}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Beta</span>
                <Badge variant={analyticsData.risk.beta > 1 ? "destructive" : "default"}>
                  {analyticsData.risk.beta}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sharpe Ratio</span>
                <Badge variant="default">{analyticsData.risk.sharpeRatio}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Volatility</span>
                <Badge variant="outline">{analyticsData.risk.volatility}%</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Max Drawdown</span>
                <Badge variant="destructive">{analyticsData.risk.maxDrawdown}%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">VaR (95%)</span>
                <Badge variant="destructive">{analyticsData.risk.var95}%</Badge>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium mb-2">Risk Assessment</div>
              <div className="text-sm text-muted-foreground">
                Your portfolio shows moderate risk with above-market volatility. Consider diversifying into defensive
                sectors.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Portfolio Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-1">Dividend Yield</div>
              <div className="text-lg font-bold">{analyticsData.metrics.dividendYield}%</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-1">P/E Ratio</div>
              <div className="text-lg font-bold">{analyticsData.metrics.peRatio}</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-1">P/B Ratio</div>
              <div className="text-lg font-bold">{analyticsData.metrics.pbRatio}</div>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-1">Debt/Equity</div>
              <div className="text-lg font-bold">{analyticsData.metrics.debtToEquity}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
