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
  Chip,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material"
import {
  CallMade as CallMadeIcon,
  Sms as SmsIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material"

export default memo(function CDRDetailsSection() {
  const theme = useTheme()
  const [cdrPage, setCdrPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const rowsPerPage = 10

  const cdrData = [
    {
      msisdn: "675526167890",
      type: "Voice",
      calledParty: "+1876543210",
      country: "USA",
      price: 0.15,
      duration: 120,
      startTime: "2025-01-15 10:30:00",
      endTime: "2025-01-15 10:32:00",
      status: "Completed",
    },
    {
      msisdn: "675526167891",
      type: "SMS",
      calledParty: "+1876543211",
      country: "Canada",
      price: 0.05,
      duration: 0,
      startTime: "2025-01-15 11:15:00",
      endTime: "2025-01-15 11:15:00",
      status: "Delivered",
    },
    {
      msisdn: "675526167892",
      type: "Voice",
      calledParty: "+446543212",
      country: "UK",
      price: 0.25,
      duration: 300,
      startTime: "2025-01-15 14:20:00",
      endTime: "2025-01-15 14:25:00",
      status: "Completed",
    },
    {
      msisdn: "675526167893",
      type: "Data",
      calledParty: "N/A",
      country: "Germany",
      price: 0.0,
      duration: 0,
      startTime: "2025-01-15 16:45:00",
      endTime: "2025-01-15 16:45:00",
      status: "Failed",
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return "success"
      case "failed":
        return "error"
      case "busy":
        return "warning"
      default:
        return "default"
    }
  }

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "voice":
        return <CallMadeIcon />
      case "sms":
        return <SmsIcon />
      default:
        return <AssessmentIcon />
    }
  }

  const formatDuration = (seconds) => {
    if (seconds === 0) return "N/A"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const filteredData = cdrData.filter((row) => {
    const matchesSearch = row.msisdn.includes(searchTerm) || row.calledParty.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || row.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || row.type.toLowerCase() === typeFilter.toLowerCase()

    let matchesDateRange = true
    if (startDate || endDate) {
      const rowDate = new Date(row.startTime.split(" ")[0])
      if (startDate) {
        const start = new Date(startDate)
        matchesDateRange = matchesDateRange && rowDate >= start
      }
      if (endDate) {
        const end = new Date(endDate)
        matchesDateRange = matchesDateRange && rowDate <= end
      }
    }

    return matchesSearch && matchesStatus && matchesType && matchesDateRange
  })

  const totalRevenue = cdrData.reduce((sum, record) => sum + record.price, 0)
  const totalCalls = cdrData.filter((record) => record.type === "Voice").length
  const totalSMS = cdrData.filter((record) => record.type === "SMS").length

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
        CDR Details
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid sx={{ width: "15%" }} item xs={12} md={3}>
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
                    {cdrData.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Total Records
                  </Typography>
                </Box>
                <AssessmentIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sx={{ width: "15%" }} xs={12} md={3}>
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
                    $ {totalRevenue.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Total Revenue
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ width: "15%" }} item xs={12} md={3}>
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
                    {totalCalls}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Voice Calls
                  </Typography>
                </Box>
                <CallMadeIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ width: "15%" }} item xs={12} md={3}>
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
                    {totalSMS}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    SMS Messages
                  </Typography>
                </Box>
                <SmsIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FilterListIcon
              sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", mr: 1, fontSize: "1.2rem" }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "0.9rem", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
            >
              Filters & Search
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2.4}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} md={2.4}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} md={2.4}>
              <TextField
                fullWidth
                label="Search MSISDN or Called Party"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", mr: 1 }} />
                  ),
                }}
                variant="outlined"
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
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }}>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1.6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }}>Type</InputLabel>
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  label="Type"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="voice">Voice</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="data">Data</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1.2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: "40px",
                  borderRadius: 2,
                  fontSize: "0.85rem",
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": { backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333" },
                }}
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                  setStartDate("")
                  setEndDate("")
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* CDR Table */}
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
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: "0.9rem",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            All IDD CDR Records ({filteredData.length} records)
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}` }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    MSISDN
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Called Party
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Country
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Price ($.)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Start Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    End Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(cdrPage * rowsPerPage, cdrPage * rowsPerPage + rowsPerPage).map((row, index) => (
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
                        <Avatar
                          sx={{
                            width: 20,
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: theme.palette.mode === "dark" ? "#666666" : "#cccccc",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          }}
                        >
                          {row.msisdn.slice(-2)}
                        </Avatar>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                        >
                          {row.msisdn}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getTypeIcon(row.type)}
                        label={row.type}
                        color={row.type === "Voice" ? "primary" : row.type === "SMS" ? "secondary" : "info"}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                    >
                      {row.calledParty}
                    </TableCell>
                    <TableCell>
                      <Chip label={row.country} size="small" variant="filled" sx={{ fontSize: "0.7rem" }} />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "0.75rem",
                        }}
                      >
                        $ {row.price.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                    >
                      {formatDuration(row.duration)}
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                    >
                      {row.startTime}
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                    >
                      {row.endTime}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={getStatusColor(row.status)}
                        size="small"
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredData.length}
            page={cdrPage}
            onPageChange={(event, newPage) => setCdrPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            sx={{ mt: 2, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          />
        </CardContent>
      </Card>
    </Box>
  )
})
