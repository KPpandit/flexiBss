"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  MenuItem,
  Button,
} from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { AccountBalance as AccountBalanceIcon, Search as SearchIcon } from "@mui/icons-material"

// Mock data for Main Balance Distribution
const mainBalanceData = [
  { partner: "John Kila", balance: 250000, allocated: "2024-01-15", status: "Active", type: "Telco Shop" },
  { partner: "Mary Toua", balance: 180000, allocated: "2024-01-20", status: "Active", type: "External" },
  { partner: "Peter Nambawan", balance: 320000, allocated: "2024-02-01", status: "Active", type: "Telco Shop" },
  { partner: "Grace Kaupa", balance: 150000, allocated: "2024-02-10", status: "Pending", type: "External" },
  { partner: "David Pato", balance: 280000, allocated: "2024-02-15", status: "Active", type: "Telco Shop" },
]

const MainBalanceReportSection = () => {
  const theme = useTheme()
  const [filterType, setFilterType] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const filteredData =
    filterType === "all"
      ? mainBalanceData
      : mainBalanceData.filter(
          (item) =>
            item.type === filterType &&
            new Date(item.allocated) >= new Date(startDate) &&
            new Date(item.allocated) <= new Date(endDate),
        )

  const totalBalance = filteredData.reduce((sum, item) => sum + item.balance, 0)
  const activePartners = filteredData.filter((item) => item.status === "Active").length

  const chartData = filteredData.map((item) => ({
    name: item.partner,
    balance: item.balance,
  }))

  const pieData = [
    {
      name: "Telco Shop",
      value: mainBalanceData.filter((p) => p.type === "Telco Shop").reduce((sum, p) => sum + p.balance, 0),
    },
    {
      name: "External",
      value: mainBalanceData.filter((p) => p.type === "External").reduce((sum, p) => sum + p.balance, 0),
    },
  ]

  const COLORS = theme.palette.mode === "dark" ? ["#82ca9d", "#ffc658"] : ["#0088FE", "#00C49F"]

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          p: 2,
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            minWidth: 160,
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.875rem",
            },
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
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            minWidth: 160,
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.875rem",
            },
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
          sx={{
              bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#262626",
              color: theme.palette.mode === "dark" ? "#262626" : "#ffffff",
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

      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          }}
        >
          Main Balance Distribution Report
        </Typography>
        <TextField
          select
          size="small"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{
            minWidth: 150,
            "& .MuiInputBase-root": {
              fontSize: "0.8rem",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
          }}
        >
          <MenuItem value="all">All Partners</MenuItem>
          <MenuItem value="Telco Shop">Telco Shop</MenuItem>
          <MenuItem value="External">External</MenuItem>
        </TextField>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceIcon
                  sx={{ fontSize: 28, color: theme.palette.mode === "dark" ? "#82ca9d" : "#4caf50" }}
                />
                <Box>
                  <Typography sx={{ fontSize: "0.7rem", color: theme.palette.mode === "dark" ? "#aaaaaa" : "#666666" }}>
                    Total Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    ${totalBalance.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceIcon
                  sx={{ fontSize: 28, color: theme.palette.mode === "dark" ? "#ffc658" : "#ff9800" }}
                />
                <Box>
                  <Typography sx={{ fontSize: "0.7rem", color: theme.palette.mode === "dark" ? "#aaaaaa" : "#666666" }}>
                    Active Partners
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    {activePartners}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceIcon
                  sx={{ fontSize: 28, color: theme.palette.mode === "dark" ? "#ff7c7c" : "#f44336" }}
                />
                <Box>
                  <Typography sx={{ fontSize: "0.7rem", color: theme.palette.mode === "dark" ? "#aaaaaa" : "#666666" }}>
                    Avg Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    ${Math.round(totalBalance / filteredData.length).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid sx={{ width: "50%" }} item xs={12} md={8}>
          <Card sx={{ bgcolor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Balance by Partner
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === "dark" ? "#333" : "#ccc"} />
                  <XAxis
                    dataKey="name"
                    stroke={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                    style={{ fontSize: "0.7rem" }}
                  />
                  <YAxis
                    stroke={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                    style={{ fontSize: "0.7rem" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.mode === "dark" ? "#666" : "#ccc"}`,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Bar dataKey="balance" fill={theme.palette.mode === "dark" ? "#82ca9d" : "#8884d8"} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ width: "48%" }} item xs={12} md={4}>
          <Card sx={{ bgcolor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Distribution by Type
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={(entry) => `${entry.name}: $${(entry.value / 1000).toFixed(0)}K`}
                    labelStyle={{ fontSize: "0.7rem", fill: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Partner
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Balance
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Allocated Date
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.partner}>
                <TableCell sx={{ fontSize: "0.75rem", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                  {row.partner}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: theme.palette.mode === "dark" ? "#82ca9d" : "#4caf50",
                  }}
                >
                  ${row.balance.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                  {row.allocated}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }}>
                  <Chip
                    label={row.type}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      bgcolor:
                        row.type === "Telco Shop"
                          ? theme.palette.mode === "dark"
                            ? "#1a4d2e"
                            : "#e8f5e9"
                          : theme.palette.mode === "dark"
                            ? "#4d3a1a"
                            : "#fff3e0",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem" }}>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      bgcolor:
                        row.status === "Active"
                          ? theme.palette.mode === "dark"
                            ? "#1a4d2e"
                            : "#e8f5e9"
                          : theme.palette.mode === "dark"
                            ? "#4d4d1a"
                            : "#fff9c4",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default React.memo(MainBalanceReportSection)
