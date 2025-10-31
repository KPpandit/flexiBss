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
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Avatar,
  TextField,
  Button,
  useTheme,
} from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
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
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import PersonIcon from "@mui/icons-material/Person"
import SearchIcon from "@mui/icons-material/Search"

// Mock data for Prepaid
const prepaidData = [
  { month: "Jan", revenue: 35000, customers: 1200 },
  { month: "Feb", revenue: 38000, customers: 1250 },
  { month: "Mar", revenue: 36000, customers: 1220 },
  { month: "Apr", revenue: 42000, customers: 1350 },
  { month: "May", revenue: 40000, customers: 1300 },
  { month: "Jun", revenue: 45000, customers: 1400 },
]

const prepaidTableData = [
  { id: 1, plan: "Basic Prepaid", customers: 450, revenue: 13500, avgRecharge: 30, status: "Active" },
  { id: 2, plan: "Standard Prepaid", customers: 380, revenue: 19000, avgRecharge: 50, status: "Active" },
  { id: 3, plan: "Premium Prepaid", customers: 320, revenue: 32000, avgRecharge: 100, status: "Active" },
  { id: 4, plan: "Youth Prepaid", customers: 250, revenue: 7500, avgRecharge: 30, status: "Active" },
]

// Mock data for Postpaid - Corporate
const postpaidCorporateData = [
  { month: "Jan", revenue: 55000, accounts: 45 },
  { month: "Feb", revenue: 58000, accounts: 47 },
  { month: "Mar", revenue: 60000, accounts: 48 },
  { month: "Apr", revenue: 65000, accounts: 52 },
  { month: "May", revenue: 62000, accounts: 50 },
  { month: "Jun", revenue: 70000, accounts: 55 },
]

const postpaidCorporateTableData = [
  { id: 1, company: "Tech Corp Ltd", employees: 150, revenue: 22500, avgBill: 150, status: "Active" },
  { id: 2, company: "Finance Group", employees: 120, revenue: 18000, avgBill: 150, status: "Active" },
  { id: 3, company: "Retail Chain", employees: 200, revenue: 30000, avgBill: 150, status: "Active" },
  { id: 4, company: "Manufacturing Co", employees: 80, revenue: 12000, avgBill: 150, status: "Pending" },
]

// Mock data for Postpaid - Individual
const postpaidIndividualData = [
  { month: "Jan", revenue: 28000, customers: 380 },
  { month: "Feb", revenue: 30000, customers: 400 },
  { month: "Mar", revenue: 29000, customers: 390 },
  { month: "Apr", revenue: 33000, customers: 420 },
  { month: "May", revenue: 31000, customers: 410 },
  { month: "Jun", revenue: 35000, customers: 450 },
]

const postpaidIndividualTableData = [
  { id: 1, plan: "Basic Postpaid", customers: 180, revenue: 10800, avgBill: 60, status: "Active" },
  { id: 2, plan: "Standard Postpaid", customers: 150, revenue: 15000, avgBill: 100, status: "Active" },
  { id: 3, plan: "Premium Postpaid", customers: 90, revenue: 18000, avgBill: 200, status: "Active" },
  { id: 4, plan: "Family Postpaid", customers: 30, revenue: 6000, avgBill: 200, status: "Active" },
]

// Pie chart data for postpaid distribution
const postpaidDistributionData = [
  { name: "Corporate", value: 370000, color: "#8884d8" },
  { name: "Individual", value: 186000, color: "#82ca9d" },
]

const packWisePrepaidData = [
  { pack: "A$ 5", quantity: 450, revenue: 2250 },
  { pack: "A$ 12", quantity: 380, revenue: 4560 },
  { pack: "A$ 25", quantity: 520, revenue: 13000 },
  { pack: "A$ 50", quantity: 340, revenue: 17000 },
  { pack: "A$ 110", quantity: 180, revenue: 19800 },
  { pack: "A$ 145", quantity: 120, revenue: 17400 },
  { pack: "A$ 350", quantity: 85, revenue: 29750 },
]

const individualPlanTrendData = [
  { month: "Jan", basic: 8500, standard: 12000, premium: 15000, family: 4500 },
  { month: "Feb", basic: 9000, standard: 13000, premium: 16000, family: 5000 },
  { month: "Mar", basic: 8800, standard: 12500, premium: 15500, family: 4800 },
  { month: "Apr", basic: 10000, standard: 14000, premium: 17500, family: 5500 },
  { month: "May", basic: 9500, standard: 13500, premium: 16500, family: 5200 },
  { month: "Jun", basic: 10500, standard: 15000, premium: 18000, family: 6000 },
]

const corporateAccountTrendData = [
  { month: "Jan", techCorp: 18000, finance: 15000, retail: 22000, manufacturing: 10000 },
  { month: "Feb", techCorp: 19000, finance: 16000, retail: 23000, manufacturing: 10500 },
  { month: "Mar", techCorp: 20000, finance: 16500, retail: 24000, manufacturing: 11000 },
  { month: "Apr", techCorp: 22000, finance: 17500, retail: 26000, manufacturing: 11500 },
  { month: "May", techCorp: 21000, finance: 17000, retail: 25000, manufacturing: 11000 },
  { month: "Jun", techCorp: 23000, finance: 18000, retail: 28000, manufacturing: 12000 },
]

const PrepaidPostpaidReportSection = () => {
  const theme = useTheme()
  const [reportType, setReportType] = useState("prepaid")
  const [postpaidType, setPostpaidType] = useState("corporate")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleReportTypeChange = (event, newType) => {
    if (newType !== null) {
      setReportType(newType)
    }
  }

  const handlePostpaidTypeChange = (event, newType) => {
    if (newType !== null) {
      setPostpaidType(newType)
    }
  }

  const handleSearch = () => {
    console.log("Filtering data from", startDate, "to", endDate)
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

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
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
            size="small"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.750rem",
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* Toggle Buttons */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={reportType}
          exclusive
          onChange={handleReportTypeChange}
          size="small"
          sx={{ bgcolor: "background.paper" }}
        >
          <ToggleButton value="prepaid" sx={{ px: 3, py: 1, fontSize: "0.85rem" }}>
            <PhoneAndroidIcon sx={{ mr: 1, fontSize: 18 }} />
            Prepaid
          </ToggleButton>
          <ToggleButton value="postpaid" sx={{ px: 3, py: 1, fontSize: "0.85rem" }}>
            <BusinessCenterIcon sx={{ mr: 1, fontSize: 18 }} />
            Postpaid
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {reportType === "prepaid" && (
        <Box>
          {/* Prepaid Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                      <PhoneAndroidIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Total Prepaid Revenue
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $236,000
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +14.3% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                      <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Active Customers
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    1,400
                  </Typography>
                  <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                    +150 new this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                      <PhoneAndroidIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                      Avg Recharge Value
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    $52.50
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                    Per customer monthly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Left: Prepaid Revenue Trend Chart */}
            <Grid sx={{ width: "50%" }} item xs={12} md={6}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                  Prepaid Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={prepaidData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                    <YAxis style={{ fontSize: "0.75rem" }} />
                    <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                    <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                    <Bar dataKey="customers" fill="#82ca9d" name="Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Right: Pack-wise Prepaid Report */}
            <Grid sx={{ width: "48%" }} item xs={12} md={6}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                  Pack-wise Prepaid Report
                </Typography>
                <TableContainer sx={{ maxHeight: 320 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, bgcolor: "background.paper" }}>
                          Pack Name
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, bgcolor: "background.paper" }}>
                          Quantity Sold
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600, bgcolor: "background.paper" }}>
                          Total Revenue
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {packWisePrepaidData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "0.75rem", fontWeight: 500 }}>{row.pack}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem" }}>{row.quantity.toLocaleString()}</TableCell>
                          <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ bgcolor: "action.hover" }}>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Total</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          {packWisePrepaidData.reduce((sum, row) => sum + row.quantity, 0).toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          ${packWisePrepaidData.reduce((sum, row) => sum + row.revenue, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Prepaid Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Plan Name</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Customers</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Avg Recharge</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prepaidTableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.plan}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>{row.customers}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontSize: "0.75rem" }}>${row.avgRecharge}</TableCell>
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

      {reportType === "postpaid" && (
        <Box>
          {/* Postpaid Type Toggle */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <ToggleButtonGroup
              value={postpaidType}
              exclusive
              onChange={handlePostpaidTypeChange}
              size="small"
              sx={{ bgcolor: "background.paper" }}
            >
              <ToggleButton value="corporate" sx={{ px: 3, py: 1, fontSize: "0.85rem" }}>
                <BusinessCenterIcon sx={{ mr: 1, fontSize: 18 }} />
                Corporate
              </ToggleButton>
              <ToggleButton value="individual" sx={{ px: 3, py: 1, fontSize: "0.85rem" }}>
                <PersonIcon sx={{ mr: 1, fontSize: 18 }} />
                Individual
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Postpaid Distribution Pie Chart */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
              Postpaid Revenue Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={postpaidDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {postpaidDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          {postpaidType === "corporate" && (
            <Box>
              {/* Corporate Summary Cards */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                          <BusinessCenterIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Corporate Revenue
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        $370,000
                      </Typography>
                      <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                        +12.9% from last month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                          <BusinessCenterIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Corporate Accounts
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        55
                      </Typography>
                      <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                        +5 new this month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                          <PersonIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Avg Bill/Account
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        $150
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                        Per account monthly
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Left: Corporate Revenue Trend Chart */}
                <Grid sx={{ width: "50%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                      Corporate Postpaid Revenue Trend
                    </Typography>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={postpaidCorporateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                        <YAxis style={{ fontSize: "0.75rem" }} />
                        <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                        <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                        <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                        <Bar dataKey="accounts" fill="#82ca9d" name="Accounts" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>

                {/* Right: Individual Corporate Account Trend */}
                <Grid sx={{ width: "48%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                      Individual Corporate Account Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={corporateAccountTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                        <YAxis style={{ fontSize: "0.75rem" }} />
                        <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                        <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                        <Line type="monotone" dataKey="techCorp" stroke="#8884d8" name="Tech Corp" strokeWidth={2} />
                        <Line type="monotone" dataKey="finance" stroke="#82ca9d" name="Finance Group" strokeWidth={2} />
                        <Line type="monotone" dataKey="retail" stroke="#ffc658" name="Retail Chain" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="manufacturing"
                          stroke="#ff7c7c"
                          name="Manufacturing"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>

              {/* Corporate Table */}
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Company Name</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Employees</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Avg Bill</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {postpaidCorporateTableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.company}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.employees}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>${row.avgBill}</TableCell>
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

          {postpaidType === "individual" && (
            <Box>
              {/* Individual Summary Cards */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", mr: 1.5 }}>
                          <PersonIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Individual Revenue
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        $186,000
                      </Typography>
                      <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                        +13.5% from last month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "success.main", mr: 1.5 }}>
                          <PersonIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Individual Customers
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        450
                      </Typography>
                      <Typography variant="caption" color="success.main" sx={{ fontSize: "0.7rem" }}>
                        +40 new this month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main", mr: 1.5 }}>
                          <BusinessCenterIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                          Avg Bill/Customer
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        $77.78
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                        Per customer monthly
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Left: Individual Revenue Trend Chart */}
                <Grid sx={{ width: "50%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                      Individual Postpaid Revenue Trend
                    </Typography>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={postpaidIndividualData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                        <YAxis style={{ fontSize: "0.75rem" }} />
                        <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                        <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                        <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                        <Bar dataKey="customers" fill="#82ca9d" name="Customers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>

                {/* Right: Individual Plan Trend */}
                <Grid sx={{ width: "48%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: "0.95rem", fontWeight: 500 }}>
                      Individual Plan Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={individualPlanTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" style={{ fontSize: "0.75rem" }} />
                        <YAxis style={{ fontSize: "0.75rem" }} />
                        <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                        <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                        <Line type="monotone" dataKey="basic" stroke="#8884d8" name="Basic" strokeWidth={2} />
                        <Line type="monotone" dataKey="standard" stroke="#82ca9d" name="Standard" strokeWidth={2} />
                        <Line type="monotone" dataKey="premium" stroke="#ffc658" name="Premium" strokeWidth={2} />
                        <Line type="monotone" dataKey="family" stroke="#ff7c7c" name="Family" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>

              {/* Individual Table */}
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Plan Name</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Customers</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Revenue</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Avg Bill</TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {postpaidIndividualTableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.plan}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>{row.customers}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>${row.revenue.toLocaleString()}</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem" }}>${row.avgBill}</TableCell>
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
        </Box>
      )}
    </Box>
  )
}

export default memo(PrepaidPostpaidReportSection)
