"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, TrendingUp, Building2, Globe, Zap } from "lucide-react"

const mockNews = [
  {
    id: 1,
    title: "Tech Stocks Rally on Strong Earnings Reports",
    summary:
      "Major technology companies report better-than-expected quarterly earnings, driving market optimism and sector-wide gains.",
    content:
      "Technology stocks surged in after-hours trading following a series of strong quarterly earnings reports from major players in the sector. Apple, Microsoft, and Google all exceeded analyst expectations, with cloud computing and AI services driving significant revenue growth. The positive sentiment has lifted the entire tech sector, with the NASDAQ composite gaining over 2% in extended trading.",
    source: "MarketWatch",
    author: "Sarah Johnson",
    publishedAt: "2024-01-15T14:30:00Z",
    category: "Technology",
    tags: ["AAPL", "MSFT", "GOOGL", "Earnings"],
    imageUrl: "/tech-stocks-rally.jpg",
    readTime: "3 min read",
    impact: "high",
  },
  {
    id: 2,
    title: "Federal Reserve Hints at Interest Rate Changes",
    summary:
      "Fed officials suggest potential policy shifts in upcoming meetings, causing volatility in bond and equity markets.",
    content:
      "Federal Reserve officials have indicated that interest rate policy may see adjustments in the coming months, citing evolving economic conditions and inflation data. The comments have led to increased volatility in both bond and equity markets, with investors reassessing their positions ahead of the next FOMC meeting.",
    source: "Reuters",
    author: "Michael Chen",
    publishedAt: "2024-01-15T12:15:00Z",
    category: "Economics",
    tags: ["Fed", "Interest Rates", "Monetary Policy"],
    imageUrl: "/federal-reserve-building.png",
    readTime: "4 min read",
    impact: "high",
  },
  {
    id: 3,
    title: "NVIDIA Announces New AI Chip Architecture",
    summary:
      "The semiconductor giant unveils next-generation processors designed for artificial intelligence workloads.",
    content:
      "NVIDIA has announced its latest AI chip architecture, promising significant performance improvements for machine learning and artificial intelligence applications. The new processors feature enhanced parallel processing capabilities and improved energy efficiency, targeting both data center and edge computing markets.",
    source: "TechCrunch",
    author: "Alex Rivera",
    publishedAt: "2024-01-15T10:45:00Z",
    category: "Technology",
    tags: ["NVDA", "AI", "Semiconductors"],
    imageUrl: "/nvidia-ai-chip.jpg",
    readTime: "5 min read",
    impact: "medium",
  },
  {
    id: 4,
    title: "Apple Reports Record iPhone Sales",
    summary: "Strong demand for the latest iPhone models drives Apple to record quarterly revenue figures.",
    content:
      "Apple has reported record iPhone sales for the quarter, with the latest models showing particularly strong demand in international markets. The company's services division also showed robust growth, contributing to overall revenue that exceeded analyst expectations by a significant margin.",
    source: "Bloomberg",
    author: "Jennifer Liu",
    publishedAt: "2024-01-15T08:20:00Z",
    category: "Technology",
    tags: ["AAPL", "iPhone", "Earnings"],
    imageUrl: "/apple-iphone-sales.jpg",
    readTime: "3 min read",
    impact: "medium",
  },
  {
    id: 5,
    title: "Energy Sector Sees Renewed Interest",
    summary: "Rising oil prices and renewable energy investments drive investor attention back to energy stocks.",
    content:
      "The energy sector is experiencing renewed investor interest as oil prices stabilize at higher levels and renewable energy projects receive increased funding. Traditional energy companies are adapting their strategies to include more sustainable practices while maintaining profitability.",
    source: "Wall Street Journal",
    author: "David Thompson",
    publishedAt: "2024-01-15T06:30:00Z",
    category: "Energy",
    tags: ["Energy", "Oil", "Renewable"],
    imageUrl: "/energy-sector-renewable.jpg",
    readTime: "4 min read",
    impact: "medium",
  },
  {
    id: 6,
    title: "Healthcare Stocks Gain on Drug Approval",
    summary: "FDA approval of breakthrough treatments boosts pharmaceutical and biotech company valuations.",
    content:
      "Several healthcare and pharmaceutical companies saw significant gains following FDA approval of new breakthrough treatments. The approvals span multiple therapeutic areas including oncology and rare diseases, providing new revenue opportunities for the companies involved.",
    source: "CNBC",
    author: "Dr. Maria Rodriguez",
    publishedAt: "2024-01-14T16:45:00Z",
    category: "Healthcare",
    tags: ["Healthcare", "FDA", "Pharmaceuticals"],
    imageUrl: "/healthcare-drug-approval.jpg",
    readTime: "3 min read",
    impact: "low",
  },
]

export default function NewsFeed() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImpact, setSelectedImpact] = useState("all")

  const categories = ["all", "Technology", "Economics", "Energy", "Healthcare", "Finance"]
  const impacts = ["all", "high", "medium", "low"]

  const filteredNews = mockNews.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesImpact = selectedImpact === "all" || article.impact === selectedImpact

    return matchesSearch && matchesCategory && matchesImpact
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology":
        return <Zap className="h-4 w-4" />
      case "Economics":
        return <TrendingUp className="h-4 w-4" />
      case "Energy":
        return <Building2 className="h-4 w-4" />
      case "Healthcare":
        return <Globe className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Market News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedImpact} onValueChange={setSelectedImpact}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Impact" />
              </SelectTrigger>
              <SelectContent>
                {impacts.map((impact) => (
                  <SelectItem key={impact} value={impact}>
                    {impact === "all" ? "All Impact" : impact.charAt(0).toUpperCase() + impact.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="breaking">Breaking</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Featured Article */}
          {filteredNews.length > 0 && (
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={filteredNews[0].imageUrl || "/placeholder.svg"}
                    alt={filteredNews[0].title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getImpactColor(filteredNews[0].impact)}>
                      {filteredNews[0].impact.toUpperCase()} IMPACT
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(filteredNews[0].category)}
                      {filteredNews[0].category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{filteredNews[0].title}</h2>
                  <p className="text-muted-foreground mb-4">{filteredNews[0].summary}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{filteredNews[0].source}</span>
                    <span>•</span>
                    <span>{filteredNews[0].author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(filteredNews[0].publishedAt)}
                    </span>
                    <span>•</span>
                    <span>{filteredNews[0].readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {filteredNews[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.slice(1).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getImpactColor(article.impact)} className="text-xs">
                      {article.impact.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No news articles found matching your criteria</div>
          )}
        </TabsContent>

        <TabsContent value="breaking" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredNews
              .filter((article) => article.impact === "high")
              .map((article) => (
                <Card key={article.id} className="p-4 border-l-4 border-l-red-500">
                  <div className="flex items-start gap-4">
                    <img
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="destructive" className="text-xs">
                          BREAKING
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredNews
              .filter((article) => article.tags.includes("Earnings"))
              .map((article) => (
                <Card key={article.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          EARNINGS
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews
              .filter((article) => article.category === "Economics" || article.tags.includes("Markets"))
              .map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        MARKETS
                      </Badge>
                      <Badge variant={getImpactColor(article.impact)} className="text-xs">
                        {article.impact.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{article.summary}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">Analysis articles coming soon</div>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">Personalized watchlist news coming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
