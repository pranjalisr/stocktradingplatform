"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PortfolioChart from "@/components/portfolio-chart"
import PortfolioAllocation from "@/components/portfolio-allocation"
import PortfolioAnalytics from "@/components/portfolio-analytics"

export default function PortfolioPage() {
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
          <h1 className="text-3xl font-bold">Portfolio Analysis</h1>
        </div>

        {/* Portfolio Performance Chart */}
        <PortfolioChart />

        {/* Portfolio Allocation */}
        <PortfolioAllocation />

        {/* Portfolio Analytics */}
        <PortfolioAnalytics />
      </div>
    </div>
  )
}
