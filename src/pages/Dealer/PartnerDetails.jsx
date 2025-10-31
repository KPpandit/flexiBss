"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Card,
  CardHeader,
  CardContent,
  useTheme,
  Avatar,
  Switch,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  DialogActions,
} from "@mui/material"
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Description as DocumentIcon,
  AccountBalance as BalanceIcon,
  Assignment as AssignmentIcon,
  Receipt as ReceiptIcon,
  Security as SecurityIcon,
  Inventory as InventoryIcon,
  MonetizationOn as MonetizationOnIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const PartnerDetails = ({ open, onClose, partner, inline = false, onEdit }) => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  const [balanceDateRange, setBalanceDateRange] = useState({
    fromDate: format(new Date(new Date().setDate(new Date().getDate() - 30)), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
  })

  const [accessSettings, setAccessSettings] = useState({
    selfCare: true,
    posSystem: true,
    marketplace: false,
    ussdAccess: true,
  })

  const [permissionSettings, setPermissionSettings] = useState({
    viewReports: true,
    customerManagement: true,
    inventoryManagement: false,
  })

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editField, setEditField] = useState("")
  const [editValue, setEditValue] = useState("")
  const [amlSettings, setAmlSettings] = useState({
    balanceCutoff: "50,000",
    dailyLimit: "1,00,000",
    maxSingleTransaction: "10,000",
    monthlyLimit: "25,00,000",
  })

  const handleDateRangeChange = (field, value) => {
    setBalanceDateRange((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAccessToggle = (field) => {
    setAccessSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handlePermissionToggle = (field) => {
    setPermissionSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleEditClick = (field, currentValue) => {
    setEditField(field)
    setEditValue(currentValue)
    setEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setAmlSettings((prev) => ({
      ...prev,
      [editField]: editValue,
    }))
    setEditDialogOpen(false)
    setEditField("")
    setEditValue("")
  }

  if (!partner) return null

  const formatDate = (date) => {
    if (!date) return "N/A"
    try {
      return typeof date === "string" ? date : format(date, "dd-MMM-yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  const availableTabs = [
    { label: "Profile", icon: <PersonIcon /> },
    { label: "Partner Agreements", icon: <AssignmentIcon /> },
    { label: "Partner Transactions", icon: <ReceiptIcon /> },
    { label: "Balance Management", icon: <BalanceIcon /> },
    { label: "Access Management", icon: <SecurityIcon /> },
    { label: "Asset Management", icon: <InventoryIcon /> },
    { label: "AML - Cutoff", icon: <MonetizationOnIcon /> },
  ]

  const balanceTransactions = [
    { date: "28-Sep-2025", type: "Credit", description: "Commission Payment", amount: 450, balance: 12500 },
    { date: "27-Sep-2025", type: "Debit", description: "SIM Purchase", amount: -200, balance: 12050 },
    { date: "26-Sep-2025", type: "Credit", description: "Sales Commission", amount: 325, balance: 12250 },
    { date: "25-Sep-2025", type: "Debit", description: "Router Purchase", amount: -500, balance: 11925 },
    { date: "24-Sep-2025", type: "Credit", description: "Recharge Commission", amount: 275, balance: 12425 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Profile
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6">Partner Profile</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        bgcolor: theme.palette.primary.main,
                        fontSize: "2rem",
                      }}
                    >
                      <CameraIcon sx={{ fontSize: "3rem" }} />
                    </Avatar>
                    <Chip
                      label={partner.type || "Outside"}
                      color={partner.type === "Inside" ? "primary" : "secondary"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Personal Details
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              First Name
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                              {partner.firstName}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Last Name
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                              {partner.lastName}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Email
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                              <EmailIcon fontSize="small" color="primary" />
                              <Typography variant="body1" fontWeight={600}>
                                {partner.email}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Contact
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                              <PhoneIcon fontSize="small" color="success" />
                              <Typography variant="body1" fontWeight={600}>
                                {partner.contact}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Business Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Business Name
                            </Typography>
                            <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                              {partner.businessName}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Business Nature
                            </Typography>
                            <Chip label={partner.businessNature} color="secondary" sx={{ mt: 0.5 }} />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Category Type
                            </Typography>
                            <Chip
                              label={partner.type || "Outside"}
                              color={partner.type === "Inside" ? "primary" : "default"}
                              sx={{ mt: 0.5 }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      case 1: // Partner Agreements
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AssignmentIcon color="primary" />
                  <Typography variant="h6">Partner Agreements</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Commission Structure
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Fixed Commission" secondary="5% on all recharges" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Variable Commission" secondary="2-8% based on volume" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Bonus Commission" secondary="1% for targets achieved" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Agreement Documents
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <DocumentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Master Agreement" secondary="Signed on 15-Jan-2024" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DocumentIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Commission Agreement" secondary="Updated on 20-Mar-2024" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      case 2: // Partner Transactions
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ReceiptIcon color="primary" />
                  <Typography variant="h6">Partner Transactions</Typography>
                </Box>
              }
            />
            <CardContent>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Commission</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>28-Sep-2025</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Recharge</TableCell>
                      <TableCell>$299</TableCell>
                      <TableCell>$15</TableCell>
                      <TableCell>
                        <Chip label="Success" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>27-Sep-2025</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Bill Payment</TableCell>
                      <TableCell>$599</TableCell>
                      <TableCell>$30</TableCell>
                      <TableCell>
                        <Chip label="Success" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )

      case 3: // Balance Management
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BalanceIcon color="primary" />
                  <Typography variant="h6">Balance Management</Typography>
                </Box>
              }
            />
            <CardContent>
              <Paper sx={{ p: 3, mb: 3 }} variant="outlined">
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Date Range Filter
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="From Date"
                      type="date"
                      value={balanceDateRange.fromDate}
                      onChange={(e) => handleDateRangeChange("fromDate", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      sx={{
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="To Date"
                      type="date"
                      value={balanceDateRange.toDate}
                      onChange={(e) => handleDateRangeChange("toDate", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      sx={{
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
                  <Grid item xs={12} md={4}>
                    <Button variant="contained" fullWidth sx={{ height: 56 }}>
                      Apply Filter
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center" }} variant="outlined">
                    <Typography variant="h4" color="success.main" fontWeight={700}>
                      ${partner.totalCoreBalance || 0}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Current Balance
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center" }} variant="outlined">
                    <Typography variant="h4" color="primary.main" fontWeight={700}>
                      $15,450
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total Sales
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center" }} variant="outlined">
                    <Typography variant="h4" color="warning.main" fontWeight={700}>
                      $775
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total Commission
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                  Balance Transactions
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {balanceTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.type}
                              color={transaction.type === "Credit" ? "success" : "error"}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color: transaction.amount > 0 ? "success.main" : "error.main",
                              fontWeight: 600,
                            }}
                          >
                            ${Math.abs(transaction.amount)}
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            ${transaction.balance}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )

      case 4: // Access Management
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SecurityIcon color="primary" />
                  <Typography variant="h6">Access Management</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      System Access
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Self Care" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={accessSettings.selfCare}
                              onChange={() => handleAccessToggle("selfCare")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="POS System" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={accessSettings.posSystem}
                              onChange={() => handleAccessToggle("posSystem")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Marketplace" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={accessSettings.marketplace}
                              onChange={() => handleAccessToggle("marketplace")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="USSD Access" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={accessSettings.ussdAccess}
                              onChange={() => handleAccessToggle("ussdAccess")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Permission Levels
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="View Reports" secondary="Full access to sales reports" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={permissionSettings.viewReports}
                              onChange={() => handlePermissionToggle("viewReports")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Customer Management" secondary="Add/Edit customer details" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={permissionSettings.customerManagement}
                              onChange={() => handlePermissionToggle("customerManagement")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Inventory Management" secondary="Manage SIM allocation" />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={permissionSettings.inventoryManagement}
                              onChange={() => handlePermissionToggle("inventoryManagement")}
                              color="success"
                            />
                          }
                          label=""
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      case 5: // Asset Management
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <InventoryIcon color="primary" />
                  <Typography variant="h6">Asset Management</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      SIM Allocation
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Total SIMs Allocated" secondary="500 SIMs" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="SIMs Sold" secondary="387 SIMs" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="SIMs Available" secondary="113 SIMs" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Device Allocation
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Routers Allocated" secondary="25 Units" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Routers Sold" secondary="18 Units" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="CPE Allocated" secondary="50 Units" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="CPE Sold" secondary="42 Units" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other Devices" secondary="10 Units" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other Devices Sold" secondary="7 Units" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      case 6: // AML - Cutoff
        return (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MonetizationOnIcon color="primary" />
                  <Typography variant="h6">AML - Cutoff Management</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid sx={{ width: "40%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Balance Cutoff Settings
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Partner Balance Cutoff"
                          secondary={`$${amlSettings.balanceCutoff} (Editable)`}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditClick("balanceCutoff", amlSettings.balanceCutoff)}
                        >
                          Edit
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Daily Transaction Limit" secondary={`$${amlSettings.dailyLimit}`} />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditClick("dailyLimit", amlSettings.dailyLimit)}
                        >
                          Edit
                        </Button>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid sx={{ width: "40%" }} item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Transaction Limits
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Max Single Transaction"
                          secondary={`$${amlSettings.maxSingleTransaction}`}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditClick("maxSingleTransaction", amlSettings.maxSingleTransaction)}
                        >
                          Edit
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Monthly Transaction Limit" secondary={`$${amlSettings.monthlyLimit}`} />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditClick("monthlyLimit", amlSettings.monthlyLimit)}
                        >
                          Edit
                        </Button>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const content = (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {availableTabs.map((tab, index) => (
          <Tab key={index} icon={tab.icon} iconPosition="start" label={tab.label} />
        ))}
      </Tabs>
      {renderTabContent()}
    </Box>
  )

  if (inline) {
    return (
      <>
        <Card
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
            boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
          }}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  }}
                >
                  Partner Details - {partner.firstName} {partner.lastName}
                </Typography>
                <Chip label={partner.businessName} color="primary" />
                {partner.isNeotel && <Chip label="Telco Shop" color="info" />}
                {onEdit && (
                  <Button variant="outlined" onClick={onEdit} sx={{ ml: "auto" }}>
                    Edit Partner
                  </Button>
                )}
              </Box>
            }
            sx={{
              borderBottom: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
            }}
          />
          <CardContent sx={{ p: 3 }}>{content}</CardContent>
        </Card>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit {editField.replace(/([A-Z])/g, " $1").trim()}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Value"
              type="text"
              fullWidth
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              helperText="Enter the new value (numbers only, without $ or commas)"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">Partner Details</Typography>
              <Chip label={partner.businessName} color="primary" size="small" sx={{ fontWeight: 600, ml: 1 }} />
              {partner.isNeotel && <Chip label="Neotel Partner" color="info" size="small" sx={{ fontWeight: 600 }} />}
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>{content}</DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {editField.replace(/([A-Z])/g, " $1").trim()}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Value"
            type="text"
            fullWidth
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            helperText="Enter the new value (numbers only, without $ or commas)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PartnerDetails
