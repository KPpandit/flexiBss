"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  useTheme,
  Paper,
} from "@mui/material"
import {
  Refresh as RefreshIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as RevenueIcon,
  AccountBalanceWallet as WalletIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Generate random data for live effect
const generateDailyActivations = () => {
  const data = []
  const startDate = new Date("2025-09-07")
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString().split("T")[0],
      prepaid: 180 + Math.random() * 80,
      postpaid: 45 + Math.random() * 25,
    })
  }
  return data
}

const generateRechargeData = () => {
  const data = []
  const startDate = new Date("2025-09-16")
  for (let i = 0; i < 22; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString().split("T")[0],
      value: 140000 + Math.random() * 60000,
    })
  }
  return data
}

const generateUsageData = () => {
  const data = []
  const startDate = new Date("2025-09-07")
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString().split("T")[0],
      dataGB: 600 + Math.random() * 600,
      voiceMin: 3800 + Math.random() * 1000,
    })
  }
  return data
}

const generateTroubleTickets = () => {
  const data = []
  const startDate = new Date("2025-09-07")
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString().split("T")[0],
      open: 45 + Math.random() * 30,
      closed: 40 + Math.random() * 25,
    })
  }
  return data
}

const updateDataPoint = (data, maxPoints = 30) => {
  const newData = [...data]
  // Remove oldest point and add new point
  newData.shift()
  const lastPoint = newData[newData.length - 1]
  const newDate = new Date(lastPoint.date)
  newDate.setDate(newDate.getDate() + 1)

  // Generate new data point with smooth transition from last value
  const newPoint = { ...lastPoint, date: newDate.toISOString().split("T")[0] }

  // Smooth random walk for each metric
  Object.keys(newPoint).forEach((key) => {
    if (key !== "date" && key !== "name" && key !== "color") {
      const change = (Math.random() - 0.5) * (newPoint[key] * 0.1) // 10% max change
      newPoint[key] = Math.max(0, newPoint[key] + change)
    }
  })

  newData.push(newPoint)
  return newData
}

const MISReports = () => {
  const theme = useTheme()
  const [dateFrom, setDateFrom] = useState("2025-09-07")
  const [dateTo, setDateTo] = useState("2025-10-07")
  const [location, setLocation] = useState("National")

  // Live data states
  const [dailyActivations, setDailyActivations] = useState(generateDailyActivations())
  const [rechargeData, setRechargeData] = useState(generateRechargeData())
  const [usageData, setUsageData] = useState(generateUsageData())
  const [troubleTickets, setTroubleTickets] = useState(generateTroubleTickets())

  // KPI states with live updates
  const [kpis, setKpis] = useState({
    totalSubscribers: 202639,
    activeSubscribers: 174270,
    churnRate: 2.92,
    revenue: 15024160,
    arpu: 83,
    eKYCComplete: 91.4,
  })

  // Payment mix data
  const [paymentMix] = useState([
    { name: "Digital Wallet", value: 45, color: "#4A90E2" },
    { name: "Cash", value: 25, color: "#50C878" },
    { name: "Card", value: 20, color: "#E57373" },
    { name: "Bank Transfer", value: 10, color: "#FFB74D" },
  ])

  // Network availability data
  const [networkAvailability] = useState([{ name: "Availability", value: 98.5, fill: "#4A90E2" }])

  useEffect(() => {
    // Daily Activations - updates every 8 seconds
    const activationsInterval = setInterval(() => {
      setDailyActivations((prev) => updateDataPoint(prev))
    }, 8000)

    // Recharge Data - updates every 12 seconds
    const rechargeInterval = setInterval(() => {
      setRechargeData((prev) => updateDataPoint(prev, 22))
    }, 12000)

    // Usage Data - updates every 10 seconds
    const usageInterval = setInterval(() => {
      setUsageData((prev) => updateDataPoint(prev))
    }, 10000)

    // Trouble Tickets - updates every 15 seconds
    const ticketsInterval = setInterval(() => {
      setTroubleTickets((prev) => updateDataPoint(prev))
    }, 15000)

    return () => {
      clearInterval(activationsInterval)
      clearInterval(rechargeInterval)
      clearInterval(usageInterval)
      clearInterval(ticketsInterval)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis((prev) => ({
        totalSubscribers: prev.totalSubscribers + Math.floor(Math.random() * 5),
        activeSubscribers: prev.activeSubscribers + Math.floor(Math.random() * 3 - 1),
        churnRate: Math.max(0, prev.churnRate + (Math.random() - 0.5) * 0.05),
        revenue: prev.revenue + Math.floor(Math.random() * 5000),
        arpu: Math.max(0, prev.arpu + (Math.random() - 0.5) * 1),
        eKYCComplete: Math.min(100, Math.max(0, prev.eKYCComplete + (Math.random() - 0.5) * 0.2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = (dataType) => {
    switch (dataType) {
      case "activations":
        setDailyActivations(generateDailyActivations())
        break
      case "recharge":
        setRechargeData(generateRechargeData())
        break
      case "usage":
        setUsageData(generateUsageData())
        break
      case "tickets":
        setTroubleTickets(generateTroubleTickets())
        break
    }
  }

  const KPICard = ({ title, value, subtitle, icon, trend }) => (
    <Card
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: theme.palette.mode === "dark" ? "0 8px 24px rgba(255,255,255,0.1)" : "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              p: 1,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  const ChartCard = ({ title, children, onRefresh }) => (
    <Card
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: theme.palette.mode === "dark" ? "0 8px 24px rgba(255,255,255,0.1)" : "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            {title}
          </Typography>
          <IconButton size="small" onClick={onRefresh}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
        {children}
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          MIS Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interactive KPIs • Exports • Filters
        </Typography>
      </Box>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          width: "99%",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ width: "20%" }} item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                  filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                  cursor: "pointer",
                },
              }}
            />
          </Grid>
          <Grid sx={{ width: "20%" }} item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                  filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                  cursor: "pointer",
                },
              }}
            />
          </Grid>
          <Grid sx={{ width: "20%" }} item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location">
                <MenuItem value="National">National</MenuItem>
                <MenuItem value="Regional">Regional</MenuItem>
                <MenuItem value="State">State</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ width: "20%" }} item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select defaultValue="All" label="Category">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Prepaid">Prepaid</MenuItem>
                <MenuItem value="Postpaid">Postpaid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ width: "15%" }} item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select defaultValue="All" label="Status">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* KPI Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid sx={{ width: "16%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="Total Subscribers"
            value={kpis.totalSubscribers.toLocaleString()}
            subtitle="Cumulative"
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid sx={{ width: "17%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="Active Subscribers"
            value={kpis.activeSubscribers.toLocaleString()}
            subtitle="Last known"
            icon={<TrendingUpIcon />}
          />
        </Grid>
        <Grid sx={{ width: "16%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="Churn Rate"
            value={`${kpis.churnRate.toFixed(2)}%`}
            subtitle="Period"
            icon={<TrendingDownIcon />}
          />
        </Grid>
        <Grid sx={{ width: "15%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="Revenue"
            value={`$${(kpis.revenue / 100000).toFixed(2)}`}
            subtitle="Selected period"
            icon={<RevenueIcon />}
          />
        </Grid>
        <Grid sx={{ width: "15%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="ARPU (est.)"
            value={`$${Math.round(kpis.arpu)}`}
            subtitle="Monthlyized"
            icon={<WalletIcon />}
          />
        </Grid>
        <Grid sx={{ width: "15%" }} item xs={2} sm={2} md={2}>
          <KPICard
            title="eKYC Complete"
            value={`${kpis.eKYCComplete.toFixed(1)}%`}
            subtitle="Completion"
            icon={<CheckCircleIcon />}
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={2} mb={3}>
        <Grid sx={{ width: "33.5%" }} item xs={12} md={4}>
          <ChartCard title="Daily Activations (Prepaid vs Postpaid)" onRefresh={() => handleRefresh("activations")}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyActivations}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="prepaid"
                  stroke="#4A90E2"
                  name="Prepaid"
                  strokeWidth={2}
                  animationDuration={2000}
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="postpaid"
                  stroke="#50C878"
                  name="Postpaid"
                  strokeWidth={2}
                  animationDuration={2000}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid sx={{ width: "32%" }} item xs={12} md={4}>
          <ChartCard title="Recharge Value ($)" onRefresh={() => handleRefresh("recharge")}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rechargeData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#FFB74D"
                  name="Recharge Value"
                  animationDuration={2000}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid sx={{ width: "32%" }} item xs={12} md={4}>
          <ChartCard title="Usage (Data GB vs Voice Minutes)" onRefresh={() => handleRefresh("usage")}>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="dataGB"
                  stackId="1"
                  stroke="#4A90E2"
                  fill="#4A90E2"
                  name="Data (GB)"
                  animationDuration={2000}
                  isAnimationActive={true}
                />
                <Area
                  type="monotone"
                  dataKey="voiceMin"
                  stackId="1"
                  stroke="#50C878"
                  fill="#50C878"
                  name="Voice (min)"
                  animationDuration={2000}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={2}>
        <Grid sx={{ width: "33.5%" }} item xs={12} md={4}>
          <ChartCard title="Trouble Tickets (Open vs Closed)" onRefresh={() => handleRefresh("tickets")}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={troubleTickets}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Bar dataKey="open" fill="#E57373" name="Open" animationDuration={2000} isAnimationActive={true} />
                <Bar dataKey="closed" fill="#81C784" name="Closed" animationDuration={2000} isAnimationActive={true} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid sx={{ width: "32%" }} item xs={12} md={4}>
          <ChartCard title="Payment Mix" onRefresh={() => {}}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid sx={{ width: "32%" }} item xs={12} md={4}>
          <ChartCard title="Network Availability (Radial)" onRefresh={() => {}}>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart
                cx="50%"
                cy="60%"
                innerRadius="40%"
                outerRadius="100%"
                data={networkAvailability}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  background={{ fill: theme.palette.mode === "dark" ? "#2a2a2a" : "#e0e0e0" }}
                  clockWise
                  dataKey="value"
                  cornerRadius={15}
                  fill="#4A90E2"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    fill: theme.palette.text.primary,
                  }}
                >
                  {networkAvailability[0].value}%
                </text>
                <text
                  x="50%"
                  y="70%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "14px",
                    fill: theme.palette.text.secondary,
                  }}
                >
                  Network Uptime
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MISReports
