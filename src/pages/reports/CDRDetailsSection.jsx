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

export default function CDRDetailsSection() {
  const theme = useTheme()
  const [cdrPage, setCdrPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const rowsPerPage = 10

  // Sample data
  const cdrData = [
    {
      msisdn: "230526167890",
      type: "Voice",
      calledParty: "+1876543210",
      country: "USA",
      price: 0.15,
      duration: 120,
      startTime: "2024-01-15 10:30:00",
      endTime: "2024-01-15 10:32:00",
      status: "Completed",
    },
    {
      msisdn: "230526167891",
      type: "SMS",
      calledParty: "+1876543211",
      country: "Canada",
      price: 0.05,
      duration: 0,
      startTime: "2024-01-15 11:15:00",
      endTime: "2024-01-15 11:15:00",
      status: "Delivered",
    },
    {
      msisdn: "230526167892",
      type: "Voice",
      calledParty: "+446543212",
      country: "UK",
      price: 0.25,
      duration: 300,
      startTime: "2024-01-15 14:20:00",
      endTime: "2024-01-15 14:25:00",
      status: "Completed",
    },
    {
      msisdn: "230526167893",
      type: "Data",
      calledParty: "N/A",
      country: "Germany",
      price: 0.0,
      duration: 0,
      startTime: "2024-01-15 16:45:00",
      endTime: "2024-01-15 16:45:00",
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
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRevenue = cdrData.reduce((sum, record) => sum + record.price, 0)
  const totalCalls = cdrData.filter((record) => record.type === "Voice").length
  const totalSMS = cdrData.filter((record) => record.type === "SMS").length

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AssessmentIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          CDR Details
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3} sx={{width:260}}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.primary.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {cdrData.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Records
                  </Typography>
                </Box>
                <AssessmentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3} sx={{width:260}}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.success.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Rs. {totalRevenue.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Revenue
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ opacity: 0.8 }}>
                 
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3} sx={{width:260}}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.info.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalCalls}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Voice Calls
                  </Typography>
                </Box>
                <CallMadeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3} sx={{width:260}}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.warning.main, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalSMS}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    SMS Messages
                  </Typography>
                </Box>
                <SmsIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card
        sx={{ mb: 3, borderRadius: theme.shape.borderRadius, boxShadow: 3, bgcolor: theme.palette.background.paper }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FilterListIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters & Search
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} sx={{width:300}}>
              <TextField
                fullWidth
                label="Search MSISDN or Called Party"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: theme.palette.grey[400], mr: 1 }} />,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{width:300}}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} sx={{width:300}}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="voice">Voice</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="data">Data</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{width:300}}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: "56px", borderRadius: 2 }}
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* CDR Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            All IDD CDR Records ({filteredData.length} records)
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: theme.shape.borderRadius / 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>MSISDN</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Called Party</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Price (Rs.)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Start Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>End Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(cdrPage * rowsPerPage, cdrPage * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: "0.8rem" }}>{row.msisdn.slice(-2)}</Avatar>
                        {row.msisdn}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getTypeIcon(row.type)}
                        label={row.type}
                        color={row.type === "Voice" ? "primary" : row.type === "SMS" ? "secondary" : "info"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{row.calledParty}</TableCell>
                    <TableCell>
                      <Chip label={row.country} size="small" variant="filled" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                        Rs. {row.price.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDuration(row.duration)}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.endTime}</TableCell>
                    <TableCell>
                      <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
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
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
