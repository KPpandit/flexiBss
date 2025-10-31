"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  useTheme,
  Toolbar,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import CorporateCustomerForm from "./CorporateCustomerForm"

const sampleCorporateCustomers = [
  {
    id: 1,
    companyName: "TechCorp PNG Ltd",
    corporateId: "IT123456789",
    industryType: "IT",
    companySize: "Enterprise",
    contactPersonName: "John Smith",
    designation: "IT Manager",
    officialEmail: "john.smith@techcorp.pg",
    officialContactNumber: "67512345678",
    registeredAddress: "Section 15, Boroko, National Capital District, Papua New Guinea",
    billingAddress: "Same as registered",
    preferredBillingCycle: "Monthly",
    creditLimit: 50000,
    accountManager: "Sarah Johnson",
    basePlanName: "Corporate Gold",
    planRental: 2999,
    dataAllowance: "500GB Pooled",
    voiceAllowance: "Unlimited",
    smsAllowance: "10000",
    addOnPacks: ["International", "Roaming"],
    contractDuration: "24 Months",
    activationDate: new Date(2024, 0, 1),
    billingType: "Centralized",
    numberOfSims: 50,
    verificationStatus: "Verified",
    approvedBy: "Admin",
    status: "Active",
  },
  {
    id: 2,
    companyName: "HealthCare Solutions PNG",
    corporateId: "H34234234244",
    industryType: "HealthCare",
    companySize: "Enterprise",
    contactPersonName: "Mary Wilson",
    designation: "Operations Director",
    officialEmail: "mary.wilson@miningsolutions.pg",
    officialContactNumber: "67523456789",
    registeredAddress: "Lae, Morobe Province, Papua New Guinea",
    billingAddress: "Same as registered",
    preferredBillingCycle: "Quarterly",
    creditLimit: 100000,
    accountManager: "David Brown",
    basePlanName: "Corporate Platinum",
    planRental: 4999,
    dataAllowance: "1TB Pooled",
    voiceAllowance: "Unlimited",
    smsAllowance: "20000",
    addOnPacks: ["International", "Roaming", "OTT"],
    contractDuration: "24 Months",
    activationDate: new Date(2023, 6, 15),
    billingType: "Department-wise",
    numberOfSims: 120,
    verificationStatus: "Verified",
    approvedBy: "Admin",
    status: "Active",
  },
]

const CorporateCustomer = () => {
  const theme = useTheme()
  const [customers, setCustomers] = useState(sampleCorporateCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(sampleCorporateCustomers[0])
  const [notFoundDialog, setNotFoundDialog] = useState(false)
  const [showAllCustomers, setShowAllCustomers] = useState(false)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const exactMatches = customers.filter((customer) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          customer.companyName.toLowerCase().includes(searchLower) ||
          customer.corporateId.toLowerCase().includes(searchLower) ||
          customer.contactPersonName.toLowerCase().includes(searchLower) ||
          customer.officialEmail.toLowerCase().includes(searchLower) ||
          customer.id.toString().includes(searchTerm)
        )
      })

      if (exactMatches.length > 0) {
        setShowAllCustomers(false)
        setSelectedCustomer(exactMatches[0])
        setNotification({
          open: true,
          message: `Corporate customer found: ${exactMatches[0].companyName}`,
          severity: "success",
        })
      } else {
        setNotFoundDialog(true)
      }
    }
  }

  const handleAddCustomer = () => {
    setCurrentCustomer(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditCustomer = () => {
    if (selectedCustomer) {
      setCurrentCustomer(selectedCustomer)
      setIsEditMode(true)
      setOpenForm(true)
    }
  }

  const handleSaveCustomer = (customer) => {
    if (isEditMode) {
      setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)))
      setSelectedCustomer(customer)
    } else {
      const newCustomer = { ...customer, id: customers.length + 1 }
      setCustomers((prev) => [...prev, newCustomer])
    }

    setNotification({
      open: true,
      message: isEditMode ? "Corporate customer updated successfully!" : "Corporate customer added successfully!",
      severity: "success",
    })
    setOpenForm(false)
  }

  const handleToggleAllCustomers = () => {
    setShowAllCustomers(!showAllCustomers)
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setShowAllCustomers(false)
    setNotification({
      open: true,
      message: `Viewing corporate customer: ${customer.companyName}`,
      severity: "info",
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          p: 3,
          maxWidth: "80vw",
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
          backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
          minHeight: "100vh",
          fontSize: "0.85rem",
        }}
      >
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>

        <Card
          sx={{
            mb: 3,
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
            boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "1.1rem",
                }}
              >
                Corporate Customer Management
              </Typography>
            }
          />
          <Divider
            sx={{
              borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
            }}
          />
          <Toolbar
            sx={{
              p: 2.5,
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Company Name, Corporate ID, Contact Person..."
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "action.active" }} />
                ),
              }}
              sx={{
                flexGrow: 1,
                maxWidth: { xs: "100%", md: 500 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.85rem",
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                  opacity: 1,
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                  "&:disabled": {
                    backgroundColor: theme.palette.mode === "dark" ? "#666666" : "#cccccc",
                    color: theme.palette.mode === "dark" ? "#333333" : "#666666",
                  },
                }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                startIcon={showAllCustomers ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={handleToggleAllCustomers}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                {showAllCustomers ? "Hide" : "Show All Customers"}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                New Corporate Customer
              </Button>
            </Box>
          </Toolbar>
        </Card>

        {showAllCustomers && (
          <Card
            sx={{
              mb: 3,
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: "0.95rem",
                  }}
                >
                  All Corporate Customers ({customers.length})
                </Typography>
              }
            />
            <Divider
              sx={{
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
              }}
            />
            <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Company Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Corporate ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Industry
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Contact Person
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      SIMs
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                        },
                      }}
                    >
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.id}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.companyName}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.corporateId}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.industryType}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.contactPersonName}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.numberOfSims}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem" }}>
                        <Chip
                          label={customer.status}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "#1a472a" : "#e8f5e9",
                            color: theme.palette.mode === "dark" ? "#4caf50" : "#2e7d32",
                            fontSize: "0.7rem",
                            height: "20px",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleViewCustomer(customer)}
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            "&:hover": {
                              backgroundColor:
                                theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                            },
                          }}
                        >
                          <BusinessIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {!showAllCustomers && selectedCustomer && (
          <Card
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "1rem",
                }}
              >
                {selectedCustomer.companyName}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleEditCustomer}
                sx={{
                  borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.75rem",
                  "&:hover": {
                    borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                Edit
              </Button>
            </Box>
            <Divider sx={{ mb: 3, borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0" }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Corporate ID
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.corporateId}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Industry
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.industryType}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Contact Person
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.contactPersonName} ({selectedCustomer.designation})
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Email
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.officialEmail}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.basePlanName} (${selectedCustomer.planRental}/month)
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.7rem" }}
                >
                  Number of SIMs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.8rem" }}
                >
                  {selectedCustomer.numberOfSims}
                </Typography>
              </Box>
            </Box>
          </Card>
        )}

        <CorporateCustomerForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveCustomer}
          customer={currentCustomer}
          isEditMode={isEditMode}
        />

        <Dialog
          open={notFoundDialog}
          onClose={() => setNotFoundDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2,
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "none",
            },
          }}
        >
          <DialogContent sx={{ textAlign: "center", py: 4 }}>
            <Box sx={{ mb: 3 }}>
              <SearchIcon
                sx={{
                  fontSize: 60,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "text.secondary",
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "1rem",
                }}
              >
                Corporate Customer Not Found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#cccccc" : "text.secondary",
                  mb: 3,
                  fontSize: "0.85rem",
                }}
              >
                We couldn't find any corporate customer matching "{searchTerm}". Please check the details and try again.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => setNotFoundDialog(false)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontSize: "0.85rem",
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "&:hover": {
                      borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setNotFoundDialog(false)
                    handleAddCustomer()
                  }}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontSize: "0.85rem",
                    backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    },
                  }}
                >
                  Add New Customer
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}

export default CorporateCustomer
