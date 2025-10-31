"use client"

import { useState, memo } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Grid,
  useTheme,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
} from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  Public as PublicIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Phone as PhoneIcon,
  GetApp as GetAppIcon,
} from "@mui/icons-material"

export default memo(function IDDReportsSection() {
  const theme = useTheme()
  const [iddPage, setIddPage] = useState(0)
  const [trendsPage, setTrendsPage] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [dateRange, setDateRange] = useState("month")
  const rowsPerPage = 10

  const iddReportsData = [
    {
      country: "USA",
      totalCalls: 1250,
      totalDuration: 2450,
      totalRevenue: 367.5,
      avgCallDuration: 1.96,
      peakHours: "14:00-16:00",
      growth: 12,
    },
    {
      country: "Canada",
      totalCalls: 890,
      totalDuration: 1780,
      totalRevenue: 267.0,
      avgCallDuration: 2.0,
      peakHours: "15:00-17:00",
      growth: 8,
    },
    {
      country: "UK",
      totalCalls: 650,
      totalDuration: 1300,
      totalRevenue: 195.0,
      avgCallDuration: 2.0,
      peakHours: "13:00-15:00",
      growth: -3,
    },
    {
      country: "Germany",
      totalCalls: 420,
      totalDuration: 840,
      totalRevenue: 126.0,
      avgCallDuration: 2.0,
      peakHours: "16:00-18:00",
      growth: 15,
    },
  ]

  const dailyTrends = [
    { date: "2025-01-01", calls: 145, revenue: 32.5, duration: 290 },
    { date: "2025-01-02", calls: 167, revenue: 41.75, duration: 334 },
    { date: "2025-01-03", calls: 134, revenue: 28.25, duration: 268 },
    { date: "2025-01-04", calls: 189, revenue: 47.25, duration: 378 },
    { date: "2025-01-05", calls: 156, revenue: 39.0, duration: 312 },
  ]

  const totalStats = {
    totalCalls: iddReportsData.reduce((sum, item) => sum + item.totalCalls, 0),
    totalRevenue: iddReportsData.reduce((sum, item) => sum + item.totalRevenue, 0),
    totalDuration: iddReportsData.reduce((sum, item) => sum + item.totalDuration, 0),
    avgDuration: iddReportsData.reduce((sum, item) => sum + item.avgCallDuration, 0) / iddReportsData.length,
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const getGrowthColor = (growth) => {
    return growth > 0
      ? theme.palette.mode === "dark"
        ? "#ffffff"
        : "#000000"
      : growth < 0
        ? theme.palette.mode === "dark"
          ? "#666666"
          : "#999999"
        : theme.palette.mode === "dark"
          ? "#cccccc"
          : "#666666"
  }

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "0.85rem",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          mb: 2,
        }}
      >
        IDD Reports
      </Typography>

      {/* Filters */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: "0.9rem",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            Report Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid sx={{ width: "20%" }} item xs={12} md={3}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2024-01-01"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                  },
                  "& .MuiIconButton-root": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                  "& input[type='date']::-webkit-calendar-picker-indicator": {
                    filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
                  },
                }}
              />
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} md={3}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2024-01-31"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                  },
                  "& .MuiIconButton-root": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                  "& input[type='date']::-webkit-calendar-picker-indicator": {
                    filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
                  },
                }}
              />
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }}>Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  label="Country"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="all">All Countries</MenuItem>
                  <MenuItem value="usa">USA</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  <MenuItem value="uk">UK</MenuItem>
                  <MenuItem value="germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }}>Period</InputLabel>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  label="Period"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="day">Daily</MenuItem>
                  <MenuItem value="week">Weekly</MenuItem>
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ width: "15%" }} item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GetAppIcon />}
                sx={{
                  height: "40px",
                  borderRadius: 2,
                  fontSize: "0.85rem",
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333" },
                }}
              >
                Export
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {totalStats.totalCalls.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Total IDD Calls
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                  >
                    +12% from last month
                  </Typography>
                </Box>
                <PhoneIcon sx={{ fontSize: 36, color: theme.palette.mode === "dark" ? "#666666" : "#cccccc" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    $ {totalStats.totalRevenue.toFixed(0)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Total Revenue
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                  >
                    +15% from last month
                  </Typography>
                </Box>
                <AttachMoneyIcon sx={{ fontSize: 36, color: theme.palette.mode === "dark" ? "#666666" : "#cccccc" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {formatDuration(totalStats.totalDuration)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Total Duration
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                  >
                    +8% from last month
                  </Typography>
                </Box>
                <AccessTimeIcon sx={{ fontSize: 36, color: theme.palette.mode === "dark" ? "#666666" : "#cccccc" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {totalStats.avgDuration.toFixed(1)}m
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Avg Call Duration
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                  >
                    -2% from last month
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 36, color: theme.palette.mode === "dark" ? "#666666" : "#cccccc" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Country-wise Summary */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          >
            Country-wise IDD Summary
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}` }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Country
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Total Calls
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Revenue
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Avg Duration
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Peak Hours
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Growth
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iddReportsData.slice(iddPage * rowsPerPage, iddPage * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                      },
                      borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#666666" : "#e0e0e0"}`,
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PublicIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {row.country}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        {row.totalCalls.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                    >
                      {formatDuration(row.totalDuration)}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        $ {row.totalRevenue.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                    >
                      {row.avgCallDuration.toFixed(1)} min
                    </TableCell>
                    <TableCell>
                      <Chip label={row.peakHours} color="info" size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: getGrowthColor(row.growth),
                          }}
                        >
                          {row.growth > 0 ? "+" : ""}
                          {row.growth}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.abs(row.growth)}
                          sx={{
                            width: 40,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 2,
                              backgroundColor: getGrowthColor(row.growth),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={iddReportsData.length}
            page={iddPage}
            onPageChange={(event, newPage) => setIddPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            sx={{ mt: 2, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          />
        </CardContent>
      </Card>

      {/* Daily Trends */}
      <Card
        sx={{
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          >
            Daily IDD Trends
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}` }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Total Calls
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Revenue ($)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                    }}
                  >
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyTrends
                  .slice(trendsPage * rowsPerPage, trendsPage * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                        },
                        borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#666666" : "#e0e0e0"}`,
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {row.date}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                      >
                        {row.calls}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          $ {row.revenue.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                      >
                        {formatDuration(row.duration)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={dailyTrends.length}
            page={trendsPage}
            onPageChange={(event, newPage) => setTrendsPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            sx={{ mt: 2, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          />
        </CardContent>
      </Card>
    </Box>
  )
})
