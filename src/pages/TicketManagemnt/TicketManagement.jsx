"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  TextareaAutosize,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material"
import { Edit as EditIcon, Visibility as VisibilityIcon } from "@mui/icons-material"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const TicketManagement = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")
  const [filterAgent, setFilterAgent] = useState("All")
  const [dateFrom, setDateFrom] = useState("2025-10-01")
  const [dateTo, setDateTo] = useState("2025-10-10")

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const [newTicket, setNewTicket] = useState({
    customerNumber: "9876543210",
    subject: "Billing Issue",
    category: "Billing",
    priority: "Medium",
    description: "",
    assignedTo: "Auto",
  })

  const showNotification = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleCreateTicket = () => {
    // Simulate ticket creation
    console.log("[v0] Creating ticket:", newTicket)
    showNotification("Ticket created successfully!", "success")
    // Reset form
    setNewTicket({
      customerNumber: "",
      subject: "",
      category: "Billing",
      priority: "Medium",
      description: "",
      assignedTo: "Auto",
    })
  }

  const handleUpdateTicket = (ticketId) => {
    console.log("[v0] Updating ticket:", ticketId)
    showNotification(`Ticket ${ticketId} updated successfully!`, "success")
  }

  const handleCloseTicket = (ticketId) => {
    console.log("[v0] Closing ticket:", ticketId)
    showNotification(`Ticket ${ticketId} marked as closed!`, "info")
  }

  // Sample ticket data
  const tickets = [
    {
      id: "TCK-00123",
      subject: "Data not working",
      customer: "67587654321",
      priority: "High",
      status: "Open",
      assignedTo: "John",
      createdOn: "06-Oct-25",
    },
    {
      id: "TCK-00124",
      subject: "Wrong billing",
      customer: "67512345678",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Sarah",
      createdOn: "05-Oct-25",
    },
    {
      id: "TCK-00125",
      subject: "Network issue",
      customer: "67523456789",
      priority: "Critical",
      status: "Open",
      assignedTo: "Mike",
      createdOn: "07-Oct-25",
    },
    {
      id: "TCK-00126",
      subject: "SIM activation",
      customer: "67534567890",
      priority: "Low",
      status: "Resolved",
      assignedTo: "John",
      createdOn: "04-Oct-25",
    },
  ]

  // Analytics data
  const categoryData = [
    { name: "Billing", value: 35 },
    { name: "Network", value: 45 },
    { name: "Other", value: 20 },
  ]

  const statusOverTimeData = [
    { date: "01-Oct", open: 12, inProgress: 8, resolved: 15 },
    { date: "02-Oct", open: 15, inProgress: 10, resolved: 18 },
    { date: "03-Oct", open: 10, inProgress: 12, resolved: 20 },
    { date: "04-Oct", open: 14, inProgress: 9, resolved: 22 },
    { date: "05-Oct", open: 11, inProgress: 13, resolved: 19 },
  ]

  const agentPerformanceData = [
    { agent: "John", avgTime: 2.5, ticketsHandled: 45 },
    { agent: "Sarah", avgTime: 3.2, ticketsHandled: 38 },
    { agent: "Mike", avgTime: 2.8, ticketsHandled: 42 },
  ]

  const resolutionTimeData = [
    { priority: "Low", avgTime: 4.5 },
    { priority: "Medium", avgTime: 3.2 },
    { priority: "High", avgTime: 2.1 },
    { priority: "Critical", avgTime: 1.5 },
  ]

  const COLORS = ["#4A90E2", "#50C878", "#FF9800"]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "error"
      case "High":
        return "warning"
      case "Medium":
        return "info"
      case "Low":
        return "success"
      default:
        return "default"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "error"
      case "In Progress":
        return "warning"
      case "Resolved":
        return "success"
      case "Closed":
        return "default"
      default:
        return "default"
    }
  }

  const tableCellStyle = {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
  }

  const tableHeaderStyle = {
    ...tableCellStyle,
    fontWeight: 600,
    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f8f9fa",
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: theme.palette.text.primary }}>
        Ticket Management
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Ticket Dashboard" />
          <Tab label="Create New Ticket" />
          <Tab label="Assigned Tickets" />
          <Tab label="View Analytics" />
        </Tabs>
      </Box>

      {/* Tab 0: Ticket Dashboard */}
      {activeTab === 0 && (
        <Box>
          {/* Filters */}
          <Paper
            sx={{ p: 3, mb: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid sx={{ width: "15%" }} item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{ width: "15%" }} item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priority</InputLabel>
                  <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} label="Priority">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{ width: "15%" }} item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Assigned Agent</InputLabel>
                  <Select value={filterAgent} onChange={(e) => setFilterAgent(e.target.value)} label="Assigned Agent">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="John">John</MenuItem>
                    <MenuItem value="Sarah">Sarah</MenuItem>
                    <MenuItem value="Mike">Mike</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{ width: "15%" }} item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Date From"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                      cursor: "pointer",
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ width: "15%" }} item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Date To"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                      cursor: "pointer",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Table View */}
          <TableContainer
            component={Paper}
            sx={{ border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeaderStyle}>Ticket ID</TableCell>
                  <TableCell sx={tableHeaderStyle}>Subject</TableCell>
                  <TableCell sx={tableHeaderStyle}>Customer</TableCell>
                  <TableCell sx={tableHeaderStyle}>Priority</TableCell>
                  <TableCell sx={tableHeaderStyle}>Status</TableCell>
                  <TableCell sx={tableHeaderStyle}>Assigned To</TableCell>
                  <TableCell sx={tableHeaderStyle}>Created On</TableCell>
                  <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell sx={tableCellStyle}>{ticket.id}</TableCell>
                    <TableCell sx={tableCellStyle}>{ticket.subject}</TableCell>
                    <TableCell sx={tableCellStyle}>{ticket.customer}</TableCell>
                    <TableCell sx={tableCellStyle}>
                      <Chip label={ticket.priority} color={getPriorityColor(ticket.priority)} size="small" />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      <Chip label={ticket.status} color={getStatusColor(ticket.status)} size="small" />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>{ticket.assignedTo}</TableCell>
                    <TableCell sx={tableCellStyle}>{ticket.createdOn}</TableCell>
                    <TableCell sx={tableCellStyle}>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Tab 1: Create New Ticket */}
      {activeTab === 1 && (
        <Paper sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            New Support Ticket Form
          </Typography>
          <Grid container spacing={3}>
            <Grid sx={{ width: "20%" }} item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Number"
                value={newTicket.customerNumber}
                onChange={(e) => setNewTicket({ ...newTicket, customerNumber: e.target.value })}
              />
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Issue Category</InputLabel>
                <Select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  label="Issue Category"
                >
                  <MenuItem value="Billing">Billing</MenuItem>
                  <MenuItem value="Network">Network</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ width: "20%" }} item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  label="Priority"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ width: "10%" }} item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload File
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid sx={{ width: "15%" }} item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  value={newTicket.assignedTo}
                  onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                  label="Assigned To"
                >
                  <MenuItem value="Auto">Auto</MenuItem>
                  <MenuItem value="John">John</MenuItem>
                  <MenuItem value="Sarah">Sarah</MenuItem>
                  <MenuItem value="Mike">Mike</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ width: "50%" }} item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Description
              </Typography>
              <TextareaAutosize
                minRows={4}
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                placeholder="Describe the issue..."
              />
            </Grid>
            <Grid sx={{ width: "100%" }} item xs={12}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" sx={{ bgcolor: theme.palette.primary.main }} onClick={handleCreateTicket}>
                  Save Ticket
                </Button>
                <Button variant="outlined">Cancel</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Tab 2: Assigned Tickets */}
      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Tickets Assigned to You
          </Typography>
          {tickets
            .filter((t) => t.assignedTo === "John")
            .map((ticket) => (
              <Paper
                key={ticket.id}
                sx={{
                  p: 3,
                  mb: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      {ticket.id} - {ticket.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer: {ticket.customer} | Created: {ticket.createdOn}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip label={ticket.priority} color={getPriorityColor(ticket.priority)} size="small" />
                    <Chip label={ticket.status} color={getStatusColor(ticket.status)} size="small" />
                  </Box>
                </Box>
                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                  Quick Actions:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Update Status</InputLabel>
                      <Select defaultValue={ticket.status} label="Update Status">
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth size="small" placeholder="Add comment..." />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleUpdateTicket(ticket.id)}
                    >
                      Update
                    </Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleCloseTicket(ticket.id)}>
                      Mark as Closed
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{ mt: 2, p: 2, bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f8f9fa", borderRadius: 1 }}
                >
                  <Typography variant="body2" fontWeight="600">
                    SLA Timer: 2h 15m remaining
                  </Typography>
                </Box>
              </Paper>
            ))}
        </Box>
      )}

      {/* Tab 3: View Analytics */}
      {activeTab === 3 && (
        <Box>
          <Grid container spacing={3}>
            {/* Tickets per Category */}
            <Grid sx={{ width: "30%" }} item xs={12} md={6}>
              <Paper
                sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                  Tickets per Category
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Tickets by Status Over Time */}
            <Grid sx={{ width: "30%" }} item xs={12} md={6}>
              <Paper
                sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                  Tickets by Status Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={statusOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#E57373" />
                    <Line type="monotone" dataKey="inProgress" stroke="#FF9800" />
                    <Line type="monotone" dataKey="resolved" stroke="#50C878" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Agent Performance */}
            <Grid sx={{ width: "30%" }} item xs={12} md={6}>
              <Paper
                sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                  Agent Performance
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="agent" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgTime" fill="#4A90E2" name="Avg Resolution Time (hrs)" />
                    <Bar dataKey="ticketsHandled" fill="#50C878" name="Tickets Handled" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Average Resolution Time */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                  Average Resolution Time (by priority)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={resolutionTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priority" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="#FF9800" name="Avg Time (hrs)" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TicketManagement
