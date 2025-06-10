"use client"

import { useState } from "react"
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

export default function IDDReportsSection() {
  const theme = useTheme()
  const [iddPage, setIddPage] = useState(0)
  const [trendsPage, setTrendsPage] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [dateRange, setDateRange] = useState("month")
  const rowsPerPage = 10

  // Sample data
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
    { date: "2024-01-01", calls: 145, revenue: 32.5, duration: 290 },
    { date: "2024-01-02", calls: 167, revenue: 41.75, duration: 334 },
    { date: "2024-01-03", calls: 134, revenue: 28.25, duration: 268 },
    { date: "2024-01-04", calls: 189, revenue: 47.25, duration: 378 },
    { date: "2024-01-05", calls: 156, revenue: 39.0, duration: 312 },
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
    return growth > 0 ? theme.palette.success.main : growth < 0 ? theme.palette.error.main : theme.palette.grey[500]
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PublicIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          IDD Reports
        </Typography>
      </Box>

      {/* Filters */}
      <Card
        sx={{ mb: 3, borderRadius: theme.shape.borderRadius, boxShadow: 3, bgcolor: theme.palette.background.paper }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Report Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} sx={{width:250}}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2024-01-01"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{width:250}}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2024-01-31"
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{width:250}}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} label="Country">
                  <MenuItem value="all">All Countries</MenuItem>
                  <MenuItem value="usa">USA</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  <MenuItem value="uk">UK</MenuItem>
                  <MenuItem value="germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{width:250}}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} label="Period">
                  <MenuItem value="day">Daily</MenuItem>
                  <MenuItem value="week">Weekly</MenuItem>
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="contained" startIcon={<GetAppIcon />} sx={{ height: "56px", borderRadius: 2 }}>
                Export
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.primary.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalStats.totalCalls.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total IDD Calls
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +12% from last month
                  </Typography>
                </Box>
                <PhoneIcon sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.success.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Rs. {totalStats.totalRevenue.toFixed(0)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +15% from last month
                  </Typography>
                </Box>
                <AttachMoneyIcon sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.info.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatDuration(totalStats.totalDuration)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Duration
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    +8% from last month
                  </Typography>
                </Box>
                <AccessTimeIcon sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.warning.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalStats.avgDuration.toFixed(1)}m
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Avg Call Duration
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    -2% from last month
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Country-wise Summary */}
      <Card
        sx={{ mb: 4, borderRadius: theme.shape.borderRadius, boxShadow: 3, bgcolor: theme.palette.background.paper }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Country-wise IDD Summary
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: theme.shape.borderRadius / 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Total Calls</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Revenue</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Avg Duration</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Peak Hours</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Growth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iddReportsData.slice(iddPage * rowsPerPage, iddPage * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PublicIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {row.country}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {row.totalCalls.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDuration(row.totalDuration)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                        Rs. {row.totalRevenue.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.avgCallDuration.toFixed(1)} min</TableCell>
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
                            backgroundColor: theme.palette.grey[200],
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
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Daily Trends */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Daily IDD Trends
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: theme.shape.borderRadius / 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.secondary.main }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Total Calls</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Revenue (Rs.)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyTrends
                  .slice(trendsPage * rowsPerPage, trendsPage * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {row.date}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.calls}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                          Rs. {row.revenue.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDuration(row.duration)}</TableCell>
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
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
