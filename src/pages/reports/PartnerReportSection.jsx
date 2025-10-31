"use client"

import { useState, memo } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TablePagination,
  useTheme, // Added useTheme import for dark mode detection
} from "@mui/material"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import DownloadIcon from "@mui/icons-material/Download"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import StoreIcon from "@mui/icons-material/Store"
import BusinessIcon from "@mui/icons-material/Business"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search" // Added SearchIcon import

// Mock data for Total Partner Revenue
const totalPartnerRevenueData = [
  { month: "Jan", revenue: 45000, partners: 12 },
  { month: "Feb", revenue: 52000, partners: 14 },
  { month: "Mar", revenue: 48000, partners: 13 },
  { month: "Apr", revenue: 61000, partners: 16 },
  { month: "May", revenue: 55000, partners: 15 },
  { month: "Jun", revenue: 67000, partners: 18 },
]

const totalPartnerTableData = [
  { id: 1, partner: "John Kila", type: "Telco Shop", revenue: 2800, commission: 280, status: "Active" },
  { id: 2, partner: "Mary Toua store", type: "Telco Shop", revenue: 7000, commission: 700, status: "Active" },
  { id: 3, partner: "Seysor Telco", type: "Telco Shop", revenue: 36400, commission: 3640, status: "Active" },
  {
    id: 4,
    partner: "Peter Nambawan Telco Shop",
    type: "Telco Shop",
    revenue: 60900,
    commission: 6090,
    status: "Active",
  },
  { id: 5, partner: "Gregjunior Telco", type: "Telco Shop", revenue: 100, commission: 10, status: "Pending" },
  { id: 6, partner: "David Pato", type: "External", revenue: 24500, commission: 2450, status: "Active" },
  { id: 7, partner: "Grace Kaupa", type: "Telco Shop", revenue: 13200, commission: 1320, status: "Active" },
]

// Mock data for Telco Shop Revenue
const telcoShopRevenueData = [
  { month: "Jan", revenue: 28000, shops: 8 },
  { month: "Feb", revenue: 32000, shops: 9 },
  { month: "Mar", revenue: 30000, shops: 8 },
  { month: "Apr", revenue: 38000, shops: 10 },
  { month: "May", revenue: 35000, shops: 9 },
  { month: "Jun", revenue: 42000, shops: 11 },
]

const telcoShopTableData = [
  { id: 1, shop: "Shop Alpha", location: "Downtown", revenue: 15000, transactions: 450, status: "Active" },
  { id: 2, shop: "Shop Beta", location: "Uptown", revenue: 12000, transactions: 380, status: "Active" },
  { id: 3, shop: "Shop Gamma", location: "Suburb", revenue: 18000, transactions: 520, status: "Active" },
  { id: 4, shop: "Shop Delta", location: "Mall", revenue: 9000, transactions: 280, status: "Inactive" },
]

// Mock data for External Partner Revenue
const externalPartnerRevenueData = [
  { month: "Jan", revenue: 17000, partners: 4 },
  { month: "Feb", revenue: 20000, partners: 5 },
  { month: "Mar", revenue: 18000, partners: 5 },
  { month: "Apr", revenue: 23000, partners: 6 },
  { month: "May", revenue: 20000, partners: 6 },
  { month: "Jun", revenue: 25000, partners: 7 },
]

const externalPartnerTableData = [
  { id: 1, partner: "External Corp A", category: "Retail", revenue: 8000, commission: 800, status: "Active" },
  { id: 2, partner: "External Corp B", category: "Online", revenue: 12000, commission: 1200, status: "Active" },
  { id: 3, partner: "External Corp C", category: "Retail", revenue: 6000, commission: 600, status: "Pending" },
  { id: 4, partner: "External Corp D", category: "Wholesale", revenue: 10000, commission: 1000, status: "Active" },
]

const packSalesData = {
  "John Kila": [
    {
      name: "John Kila",
      5: 1,
      12: 0,
      25: 1,
      50: 0,
      110: 0,
      145: 0,
      350: 0,
      total: 30,
    },
  ],
  "Mary Toua store": [
    {
      name: "Mary Toua store",
      5: 0,
      12: 2,
      25: 0,
      50: 1,
      110: 0,
      145: 0,
      350: 0,
      total: 74,
    },
  ],
  "Seysor Telco": [
    {
      name: "Seysor Telco",
      5: 0,
      12: 0,
      25: 1,
      50: 1,
      110: 0,
      145: 2,
      350: 0,
      total: 365,
    },
  ],
  "Peter Nambawan Telco Shop": [
    {
      name: "Peter Nambawan Telco Shop",
      5: 0,
      12: 2,
      25: 1,
      50: 0,
      110: 2,
      145: 0,
      350: 1,
      total: 619,
    },
  ],
  "Gregjunior Telco": [
    {
      name: "Gregjunior Telco",
      5: 1,
      12: 0,
      25: 0,
      50: 0,
      110: 0,
      145: 0,
      350: 0,
      total: 5,
    },
  ],
  "David Pato": [
    {
      name: "David Pato",
      5: 0,
      12: 0,
      25: 2,
      50: 1,
      110: 0,
      145: 1,
      350: 0,
      total: 245,
    },
  ],
  "Grace Kaupa": [
    {
      name: "Grace Kaupa",
      5: 2,
      12: 1,
      25: 0,
      50: 0,
      110: 1,
      145: 0,
      350: 0,
      total: 132,
    },
  ],
}

const PartnerReportSection = () => {
  const theme = useTheme() // Added theme hook for dark mode detection
  const [activeTab, setActiveTab] = useState(0)
  const [openPackDetails, setOpenPackDetails] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [startDate, setStartDate] = useState("2025-10-17")
  const [endDate, setEndDate] = useState("2025-10-18")
  const [mainStartDate, setMainStartDate] = useState("2025-01-01")
  const [mainEndDate, setMainEndDate] = useState("2025-10-22")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleViewPackDetails = (partner) => {
    setSelectedPartner(partner)
    setOpenPackDetails(true)
  }

  const handleClosePackDetails = () => {
    setOpenPackDetails(false)
    setSelectedPartner(null)
  }

  const handleDownloadPackDetails = () => {
    console.log(`Downloading pack details for ${selectedPartner}...`)
    alert(`Downloaded pack details for ${selectedPartner}`)
  }

  const handleDownloadAll = () => {
    // Simulate downloading all reports
    const reports = ["Total Partner Revenue Report", "Telco Shop Revenue Report", "External Partner Report"]

    reports.forEach((report, index) => {
      setTimeout(() => {
        console.log(`Downloading ${report}...`)
        // In real implementation, this would trigger actual file downloads
        alert(`Downloaded: ${report}`)
      }, index * 1000)
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Pending":
        return "warning"
      case "Inactive":
        return "error"
      default:
        return "default"
    }
  }

  const calculateTotals = (data) => {
    const totals = {
      name: "Total",
      5: 0,
      12: 0,
      25: 0,
      50: 0,
      110: 0,
      145: 0,
      350: 0,
      total: 0,
    }
    data.forEach((row) => {
      Object.keys(totals).forEach((key) => {
        if (key !== "name") {
          totals[key] += row[key]
        }
      })
    })
    return totals
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            label="Start Date"
            type="date"
            value={mainStartDate}
            onChange={(e) => setMainStartDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              minWidth: 160,
              "& input[type='date']::-webkit-calendar-picker-indicator": {
                filter: theme.palette.mode === "dark" ? "invert(1) brightness(1.5)" : "invert(0)",
                opacity: theme.palette.mode === "dark" ? 1 : 0.7,
                cursor: "pointer",
              },
              "&:hover input[type='date']::-webkit-calendar-picker-indicator": {
                opacity: 1,
              },
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={mainEndDate}
            onChange={(e) => setMainEndDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              minWidth: 160,
              "& input[type='date']::-webkit-calendar-picker-indicator": {
                filter: theme.palette.mode === "dark" ? "invert(1) brightness(1.5)" : "invert(0)",
                opacity: theme.palette.mode === "dark" ? 1 : 0.7,
                cursor: "pointer",
              },
              "&:hover input[type='date']::-webkit-calendar-picker-indicator": {
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            size="small"
            sx={{
            bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#1976d2",
            color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#cccccc" : "#1565c0",
            },
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
          >
            SEARCH
          </Button>
        </Box>
      </Paper>

      {/* Download All Button */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadAll}
          size="small"
          sx={{ px: 2.5, py: 0.8, fontSize: "0.85rem" }}
        >
          Download All Reports
        </Button>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: 48,
            "& .MuiTab-root": {
              minHeight: 48,
              fontSize: "0.85rem",
              py: 1.5,
            },
          }}
        >
          <Tab label="Total Partner Revenue" icon={<TrendingUpIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
          <Tab label="Telco Shop Revenue" icon={<StoreIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
          <Tab label="External Partner Revenue" icon={<BusinessIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                      <TrendingUpIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Total Revenue
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $328,000
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +12.5% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Active Partners
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    18
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +3 new this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "warning.main", mr: 1.5 }}>
                      <StoreIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Telco Shops
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    11
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    64% of total revenue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      External Partners
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    7
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    36% of total revenue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
              Revenue Trend (Last 6 Months)
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={totalPartnerRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                <YAxis style={{ fontSize: "0.75rem" }} />
                <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                <Bar dataKey="partners" fill="#82ca9d" name="Active Partners" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Partner Name</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Commission</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalPartnerTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.partner}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.type}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.commission.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleViewPackDetails(row.partner)} sx={{ p: 0.5 }}>
                        <VisibilityIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              component="div"
              count={totalPartnerTableData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  fontSize: "0.75rem",
                },
                "& .MuiTablePagination-select": {
                  fontSize: "0.75rem",
                },
              }}
            />
          </TableContainer>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                      <StoreIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Total Shop Revenue
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $205,000
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +15.2% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Active Shops
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    11
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +2 new this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                      <TrendingUpIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Avg Revenue/Shop
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $18,636
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    Per shop monthly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
              Telco Shop Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={telcoShopRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                <YAxis style={{ fontSize: "0.75rem" }} />
                <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" strokeWidth={2} />
                <Line type="monotone" dataKey="shops" stroke="#82ca9d" name="Active Shops" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Shop Name</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Location</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Transactions</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {telcoShopTableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.shop}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.location}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.transactions}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      External Revenue
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $123,000
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +9.8% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                      <TrendingUpIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Active Partners
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    7
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +1 new this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Avg Revenue/Partner
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $17,571
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    Per partner monthly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
              External Partner Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={externalPartnerRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                <YAxis style={{ fontSize: "0.75rem" }} />
                <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                <Bar dataKey="partners" fill="#82ca9d" name="Active Partners" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Partner Name</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Commission</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {externalPartnerTableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.partner}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.category}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.commission.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Pack Details Dialog */}
      <Dialog
        open={openPackDetails}
        onClose={handleClosePackDetails}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2.5,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
            Pack Sales Details - {selectedPartner}
          </Typography>
          <IconButton onClick={handleClosePackDetails} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 3 }}>
          {/* Date Filters and Buttons */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                minWidth: 160,
                "& input[type='date']::-webkit-calendar-picker-indicator": {
                  filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
                  cursor: "pointer",
                },
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                minWidth: 160,
                "& input[type='date']::-webkit-calendar-picker-indicator": {
                  filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
                  cursor: "pointer",
                },
              }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                px: 2.5,
                py: 0.8,
                fontSize: "0.85rem",
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              SEARCH
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleDownloadPackDetails}
              sx={{
                px: 2.5,
                py: 0.8,
                fontSize: "0.85rem",
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              DOWNLOAD EXCEL
            </Button>
          </Box>

          {/* Pack Sales Table */}
          <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 180 }}>Name</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 5</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 12</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 25</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 50</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 110</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 145</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>A$ 350</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, textAlign: "center" }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPartner && packSalesData[selectedPartner] && (
                  <>
                    {packSalesData[selectedPartner]
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "0.75rem" }}>{row.name}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["5"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["12"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["25"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["50"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["110"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["145"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center" }}>{row["350"]}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                            A$ {row.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    {/* Total Row */}
                    <TableRow sx={{ bgcolor: "action.hover" }}>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner]).name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["5"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["12"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["25"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["50"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["110"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["145"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        {calculateTotals(packSalesData[selectedPartner])["350"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", textAlign: "center", fontWeight: 600 }}>
                        A$ {calculateTotals(packSalesData[selectedPartner]).total}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {selectedPartner && packSalesData[selectedPartner] && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                Total Count: {packSalesData[selectedPartner].length}
              </Typography>
              <TablePagination
                component="div"
                count={packSalesData[selectedPartner].length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                    fontSize: "0.75rem",
                  },
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.5 }}>
          <Button onClick={handleClosePackDetails} size="small" sx={{ fontSize: "0.85rem" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default memo(PartnerReportSection)
