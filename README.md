# 📈 TradePro — Paper Trading Platform

A professional-grade **paper trading simulator** built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. TradePro lets users practise stock trading with simulated funds, track portfolio performance, analyse risk metrics, manage orders, and follow market news — all without risking real money.

🔗 **Live Demo:** [stocktradingplatform.vercel.app](https://stocktradingplatform.vercel.app)

---

## 📸 Pages at a Glance

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Portfolio snapshot, market indices, watchlist, gainers & losers |
| Portfolio Analysis | `/portfolio` | Performance charts, sector allocation, risk analytics |
| Trading Center | `/trading` | Place trades, manage active/historical orders |
| Market News | `/news` | Categorised news feed with impact ratings |
| Stock Detail | `/stock/[ticker]` | Individual stock chart and trade panel |

---

## ✨ Features

### 🏠 Dashboard
- **Portfolio Summary Cards** — Total Value (`$125,430.50`), Day's Gain/Loss (`+$3,125.50 / +2.56%`), Buying Power (`$24,569.50`), and All-Time Return (`+$25,430.50 / +25.43%`)
- **Market Indices** — Live-style tickers for SPX, DJI, IXIC (NASDAQ), and RUT (Russell 2000) with price and day-change
- **Top Gainers & Losers** — Ranked lists showing NVDA, TSLA, AMD (gainers) and META, NFLX, GOOGL (losers) with absolute and percentage change
- **Tabbed Market Panel** — Switches between Market Overview, Watchlist, Positions, Orders, and Market News in a single view

### 📊 Portfolio Analysis (`/portfolio`)
- **Performance Chart** — Interactive time-frame selector: 1W, 1M, 3M, 6M, 1Y, ALL — powered by Recharts
- **Sector Allocation Breakdown** — Technology (45%), Healthcare (20%), Financial (15%), Consumer (12%), Energy (5%), Cash (3%) displayed as a visual breakdown
- **Top Holdings Table** — AAPL (14.9%), MSFT (12.3%), NVDA (10.2%), GOOGL (7.4%), TSLA (6.7%) with dollar values and sector tags
- **Performance Metrics Panel** — Total Return, Day Change, Week Change, and Month Change with absolute and percentage values
- **Risk Analytics** — Beta (`1.15`), Sharpe Ratio (`1.42`), Volatility (`18.5%`), Max Drawdown (`-8.2%`), VaR 95% (`-2.3%`)
- **Portfolio Fundamentals** — Dividend Yield (1.8%), P/E Ratio (24.5), P/B Ratio (3.2), Debt/Equity (0.45)
- **Risk Assessment Narrative** — Plain-English summary of portfolio risk profile

### 💹 Trading Center (`/trading`)
- **Quick Trade Panel** — Displays AAPL, GOOGL, MSFT, TSLA, NVDA, AMZN with live-style prices and day-change indicators
- **Per-Stock Actions** — Trade button and link to the full stock chart page for each instrument
- **Order Management** — Tabbed view of Active Orders and Order History; each order shows ticker, share count, price, order type (Market/Limit), and status (Pending / Partially Filled)
- **Order Cancellation** — Cancel active orders directly from the order management panel

### 📰 Market News (`/news`)
- **Category Filters** — All, Breaking, Earnings, Markets, Analysis, Watchlist
- **Impact Badges** — HIGH IMPACT, HIGH, MEDIUM, LOW colour-coded labels per article
- **Rich Cards** — Each article shows headline image, source, author, estimated read time, publish date, related ticker tags (e.g. `AAPL`, `MSFT`, `NVDA`), and category
- **Sample Coverage** — Tech earnings rallies, Federal Reserve policy shifts, NVIDIA AI chip launches, Apple iPhone sales, energy sector trends, healthcare FDA approvals

### 📉 Stock Detail (`/stock/[ticker]`)
- Dynamic route for any stock ticker (e.g. `/stock/aapl`, `/stock/nvda`)
- Individual price chart and trade interface per stock

---

## 🗂️ Project Structure

```
stocktradingplatform/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Dashboard (/)
│   ├── portfolio/
│   │   └── page.tsx            # Portfolio Analysis (/portfolio)
│   ├── trading/
│   │   └── page.tsx            # Trading Center (/trading)
│   ├── news/
│   │   └── page.tsx            # Market News (/news)
│   ├── stock/
│   │   └── [ticker]/
│   │       └── page.tsx        # Stock Detail (/stock/[ticker])
│   └── layout.tsx              # Root layout with nav + providers
│
├── components/                 # Reusable UI components (shadcn/ui)
│   └── ui/                     # Button, Card, Tabs, Badge, Table, etc.
│
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions (cn, formatters, etc.)
├── public/                     # Static assets (news images)
├── styles/                     # Global CSS
│
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 🧱 Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | Next.js | 14.2.16 |
| Language | TypeScript | ^5 |
| UI Library | React | ^18 |
| Styling | Tailwind CSS | ^4.1.9 |
| Component System | shadcn/ui | via `components.json` |
| Primitives | Radix UI | Full suite |
| Charts | Recharts | latest |
| Icons | Lucide React | ^0.454.0 |
| Font | Geist | latest |
| Notifications | Sonner | ^1.7.4 |
| Forms | React Hook Form + Zod | ^7.60.0 / 3.25.67 |
| Themes | next-themes | ^0.4.6 |
| Carousel | Embla Carousel React | 8.5.1 |
| Date Utilities | date-fns | 4.1.0 |
| Analytics | Vercel Analytics | latest |
| Deployment | Vercel | — |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm (both lock files are present)

### Installation

```bash
# Clone the repository
git clone https://github.com/pranjalisr/stocktradingplatform.git
cd stocktradingplatform

# Install dependencies
npm install
# or, with pnpm
pnpm install
```

### Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 🗺️ App Routes

| Route | Component | Description |
|---|---|---|
| `/` | Dashboard | Main overview — portfolio cards, market data, watchlist |
| `/portfolio` | Portfolio Analysis | Charts, holdings, risk metrics |
| `/trading` | Trading Center | Quick trade + order management |
| `/news` | Market News | Categorised news feed |
| `/stock/[ticker]` | Stock Detail | Per-stock chart and trade panel |

---

## 📊 Data & State

The platform uses **simulated/mock data** for all prices, portfolio values, and news — making it a safe environment for learning and practising trading strategies with no real financial risk.

Key simulated data points:
- Starting capital: `$100,000` (paper money)
- Portfolio value: `$125,430.50` (+25.43% all-time return)
- Supported tickers: AAPL, GOOGL, MSFT, TSLA, NVDA, AMZN, META, NFLX, AMD, and more
- Market indices: SPX, DJI (Dow Jones), IXIC (NASDAQ), RUT (Russell 2000)

---

## 🎨 UI System

Built on **shadcn/ui** with the full **Radix UI** primitive suite and **Tailwind CSS v4**. Components used across the app include:

- `Card`, `CardHeader`, `CardContent` — portfolio metric panels
- `Tabs`, `TabsList`, `TabsTrigger` — market view and news category switching
- `Badge` — impact labels, sector tags, ticker tags
- `Button` — trade actions, order cancellation
- `Table` — holdings and order history
- `Select`, `Input` — trade forms
- `ScrollArea` — scrollable watchlist and news feeds
- `Tooltip` — contextual data labels on charts

Dark/light mode switching via **next-themes**.

---

## 📈 Charts & Visualisations

Portfolio performance and stock charts are built with **Recharts**:

- **Area Chart** — portfolio value over time with time-frame selectors (1W, 1M, 3M, 6M, 1Y, ALL)
- **Sector Allocation** — visual percentage breakdown bars
- **Individual Stock Charts** — per-ticker price history on `/stock/[ticker]`

---

## 🧠 Risk Analytics Explained

The Portfolio Analysis page surfaces institutional-grade risk metrics:

| Metric | Value | Meaning |
|---|---|---|
| **Beta** | 1.15 | Portfolio moves ~15% more than the broader market |
| **Sharpe Ratio** | 1.42 | Good risk-adjusted return (>1 is generally considered good) |
| **Volatility** | 18.5% | Annualised standard deviation of returns |
| **Max Drawdown** | -8.2% | Largest peak-to-trough decline |
| **VaR (95%)** | -2.3% | Worst expected daily loss 95% of the time |

---

## 🗺️ Roadmap

- [ ] User authentication (sign up / login)
- [ ] Persistent portfolio state (database integration)
- [ ] Real-time stock price feeds via WebSocket or polling
- [ ] Advanced order types (Stop Loss, Trailing Stop)
- [ ] Paper trading leaderboard
- [ ] Mobile-responsive polish
- [ ] Export portfolio report as PDF

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

```bash
# Fork the repo and create your branch
git checkout -b feature/your-feature

# Make your changes, then commit
git commit -m "feat: add your feature"

# Push and open a Pull Request
git push origin feature/your-feature
```

Please follow the existing TypeScript and Tailwind conventions. Run `npm run lint` before opening a PR.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---


🌐 **Live:** [stocktradingplatform.vercel.app](https://stocktradingplatform.vercel.app)
