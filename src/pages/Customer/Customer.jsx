"use client"

import { useState, useEffect } from "react"
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
  Person as PersonIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import CustomerForm from "./CustomerForm"
import CustomerDetails from "./CustomerDetails"

const sampleCustomers = [
  {
    id: 1,
    name: "John Kila",
    customerType: "Prepaid",
    serviceType: "Mobility",
    simType: "nano-SIM",
    msisdn: "67512345678",
    imsi: "617011234567890",
    vip: true,
    gender: "Male",
    dob: new Date(1985, 5, 15),
    registrationDate: new Date(2022, 2, 10),
    email: "john.kila@email.com",
    alternateNumber: "67587654321",
    address: "Section 15, Boroko, National Capital District, Papua New Guinea",
    city: "Port Moresby",
    state: "National Capital District",
    pincode: "111",
    eKycToken: "EKYC123456789",
    eKycDate: new Date(2022, 2, 12),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: null,
    billCycle: null,
    simDetails: {
      allocationDate: new Date(2022, 2, 10),
      iccId: "8967400324200324123",
    },
    currentPack: {
      name: "Premium 50GB",
      price: 599,
      validity: 30,
      activationDate: new Date(2025, 8, 1),
      expirationDate: new Date(2025, 8, 31),
    },
    currentBill: null,
    rechargeHistory: [
      {
        date: new Date(2025, 8, 1),
        amount: 599,
        type: "Recharge",
        paymentMethod: "UPI",
        status: "Success",
      },
      {
        date: new Date(2025, 7, 1),
        amount: 399,
        type: "Recharge",
        paymentMethod: "Visa",
        status: "Success",
      },
    ],
    tickets: [
      {
        id: "TKT1001",
        subject: "Network Issue",
        priority: "High",
        status: "Resolved",
        createdDate: new Date(2025, 8, 5),
      },
    ],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 2,
    name: "Mary Temu",
    customerType: "Postpaid",
    serviceType: "Mobility",
    simType: "nano-SIM",
    msisdn: "67523456789",
    imsi: "617012345678901",
    vip: false,
    gender: "Female",
    dob: new Date(1990, 8, 22),
    registrationDate: new Date(2021, 5, 18),
    email: "mary.temu@email.com",
    alternateNumber: "67598765432",
    address: "Geroro, Hela Province, Papua New Guinea",
    city: "Tari",
    state: "Hela Province",
    pincode: "281",
    eKycToken: "EKYC234567890",
    eKycDate: new Date(2021, 5, 20),
    eKycStatus: "Verified",
    status: "Active",
    overdue: 250,
    nextInvoiceDate: new Date(2025, 10, 25),
    billCycle: "25th of every month",
    simDetails: {
      allocationDate: new Date(2021, 5, 18),
      iccId: "8967400324200324234",
    },
    currentPack: {
      name: "Postpaid Unlimited",
      price: 999,
      validity: 30,
    },
    currentBill: {
      amount: 1299,
      dueDate: new Date(2025, 9, 25),
      status: "Pending",
      rental: 999,
      extraUsage: 200,
      taxes: 100,
    },
    rechargeHistory: [
      {
        date: new Date(2025, 7, 25),
        amount: 999,
        type: "Bill Payment",
        paymentMethod: "PayPal",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 3,
    name: "Peter Namaliu",
    customerType: "Prepaid",
    serviceType: "FWA",
    simType: "micro-SIM",
    msisdn: "67534567890",
    imsi: "617013456789012",
    vip: false,
    gender: "Male",
    dob: new Date(1988, 11, 8),
    registrationDate: new Date(2023, 1, 5),
    email: "peter.namaliu@email.com",
    alternateNumber: "67509876543",
    address: "Waigani, National Capital District, Papua New Guinea",
    city: "Port Moresby",
    state: "National Capital District",
    pincode: "131",
    eKycToken: "EKYC345678901",
    eKycDate: new Date(2023, 1, 7),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: null,
    billCycle: null,
    simDetails: {
      allocationDate: new Date(2023, 1, 5),
      iccId: "8967400324200324345",
    },
    currentPack: {
      name: "FWA Basic 100GB",
      price: 799,
      validity: 30,
    },
    currentBill: null,
    rechargeHistory: [
      {
        date: new Date(2025, 8, 10),
        amount: 799,
        type: "Recharge",
        paymentMethod: "Cash",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 4,
    name: "Grace Wanma",
    customerType: "Postpaid",
    serviceType: "BroadBand",
    simType: "eSIM",
    msisdn: "67545678901",
    imsi: "617014567890123",
    vip: true,
    gender: "Female",
    dob: new Date(1982, 3, 12),
    registrationDate: new Date(2020, 8, 15),
    email: "grace.wanma@email.com",
    alternateNumber: "67520987654",
    address: "Lae, Morobe Province, Papua New Guinea",
    city: "Lae",
    state: "Morobe Province",
    pincode: "411",
    eKycToken: "EKYC456789012",
    eKycDate: new Date(2020, 8, 17),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: new Date(2025, 10, 15),
    billCycle: "15th of every month",
    simDetails: {
      allocationDate: new Date(2020, 8, 15),
      iccId: "8967400324200324456",
    },
    currentPack: {
      name: "BroadBand Premium",
      price: 1499,
      validity: 30,
    },
    currentBill: {
      amount: 1499,
      dueDate: new Date(2025, 9, 15),
      status: "Paid",
      rental: 1299,
      extraUsage: 100,
      taxes: 100,
    },
    rechargeHistory: [
      {
        date: new Date(2025, 7, 15),
        amount: 1499,
        type: "Bill Payment",
        paymentMethod: "Visa",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 5,
    name: "Michael Somare",
    customerType: "Prepaid",
    serviceType: "VOIP",
    simType: "nano-SIM",
    msisdn: "67556789012",
    imsi: "617015678901234",
    vip: false,
    gender: "Male",
    dob: new Date(1995, 7, 25),
    registrationDate: new Date(2024, 0, 20),
    email: "michael.somare@email.com",
    alternateNumber: "67531098765",
    address: "Wewak, East Sepik Province, Papua New Guinea",
    city: "Wewak",
    state: "East Sepik Province",
    pincode: "531",
    eKycToken: "EKYC567890123",
    eKycDate: new Date(2024, 0, 22),
    eKycStatus: "Pending",
    status: "Active",
    overdue: null,
    nextInvoiceDate: null,
    billCycle: null,
    simDetails: {
      allocationDate: new Date(2024, 0, 20),
      iccId: "8967400324200324567",
    },
    currentPack: {
      name: "VOIP Starter",
      price: 299,
      validity: 30,
    },
    currentBill: null,
    rechargeHistory: [
      {
        date: new Date(2025, 8, 15),
        amount: 299,
        type: "Recharge",
        paymentMethod: "UPI",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 6,
    name: "Helen Siaguru",
    customerType: "Postpaid",
    serviceType: "Mobility",
    simType: "nano-SIM",
    msisdn: "67567890123",
    imsi: "617016789012345",
    vip: false,
    gender: "Female",
    dob: new Date(1987, 10, 18),
    registrationDate: new Date(2022, 6, 8),
    email: "helen.siaguru@email.com",
    alternateNumber: "67542109876",
    address: "Mount Hagen, Western Highlands Province, Papua New Guinea",
    city: "Mount Hagen",
    state: "Western Highlands Province",
    pincode: "281",
    eKycToken: "EKYC678901234",
    eKycDate: new Date(2022, 6, 10),
    eKycStatus: "Verified",
    status: "Active",
    overdue: 450,
    nextInvoiceDate: new Date(2025, 10, 8),
    billCycle: "8th of every month",
    simDetails: {
      allocationDate: new Date(2022, 6, 8),
      iccId: "8967400324200324678",
    },
    currentPack: {
      name: "Postpaid Premium",
      price: 1199,
      validity: 30,
    },
    currentBill: {
      amount: 1649,
      dueDate: new Date(2025, 9, 8),
      status: "Overdue",
      rental: 1199,
      extraUsage: 350,
      taxes: 100,
    },
    rechargeHistory: [
      {
        date: new Date(2025, 6, 8),
        amount: 1199,
        type: "Bill Payment",
        paymentMethod: "Cash",
        status: "Success",
      },
    ],
    tickets: [
      {
        id: "TKT2001",
        subject: "Billing Issue",
        priority: "Medium",
        status: "In Progress",
        createdDate: new Date(2025, 8, 12),
      },
    ],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 7,
    name: "James Marape",
    customerType: "Prepaid",
    serviceType: "Mobility",
    simType: "nano-SIM",
    msisdn: "67578901234",
    imsi: "617017890123456",
    vip: true,
    gender: "Male",
    dob: new Date(1980, 2, 5),
    registrationDate: new Date(2019, 11, 12),
    email: "james.marape@email.com",
    alternateNumber: "67553210987",
    address: "Vanimo, Sandaun Province, Papua New Guinea",
    city: "Vanimo",
    state: "Sandaun Province",
    pincode: "471",
    eKycToken: "EKYC789012345",
    eKycDate: new Date(2019, 11, 14),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: null,
    billCycle: null,
    simDetails: {
      allocationDate: new Date(2019, 11, 12),
      iccId: "8967400324200324789",
    },
    currentPack: {
      name: "VIP Unlimited",
      price: 999,
      validity: 30,
    },
    currentBill: null,
    rechargeHistory: [
      {
        date: new Date(2025, 8, 20),
        amount: 999,
        type: "Recharge",
        paymentMethod: "PayPal",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 8,
    name: "Rose Kerenga",
    customerType: "Postpaid",
    serviceType: "FWA",
    simType: "micro-SIM",
    msisdn: "67589012345",
    imsi: "617018901234567",
    vip: false,
    gender: "Female",
    dob: new Date(1992, 6, 30),
    registrationDate: new Date(2023, 3, 25),
    email: "rose.kerenga@email.com",
    alternateNumber: "67564321098",
    address: "Madang, Madang Province, Papua New Guinea",
    city: "Madang",
    state: "Madang Province",
    pincode: "511",
    eKycToken: "EKYC890123456",
    eKycDate: new Date(2023, 3, 27),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: new Date(2025, 10, 25),
    billCycle: "25th of every month",
    simDetails: {
      allocationDate: new Date(2023, 3, 25),
      iccId: "8967400324200324890",
    },
    currentPack: {
      name: "FWA Premium",
      price: 1299,
      validity: 30,
    },
    currentBill: {
      amount: 1299,
      dueDate: new Date(2025, 9, 25),
      status: "Paid",
      rental: 1199,
      extraUsage: 0,
      taxes: 100,
    },
    rechargeHistory: [
      {
        date: new Date(2025, 7, 25),
        amount: 1299,
        type: "Bill Payment",
        paymentMethod: "Visa",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 9,
    name: "David Arore",
    customerType: "Prepaid",
    serviceType: "BroadBand",
    simType: "eSIM",
    msisdn: "67590123456",
    imsi: "617019012345678",
    vip: false,
    gender: "Male",
    dob: new Date(1989, 4, 14),
    registrationDate: new Date(2021, 9, 3),
    email: "david.arore@email.com",
    alternateNumber: "67575432109",
    address: "Popondetta, Oro Province, Papua New Guinea",
    city: "Popondetta",
    state: "Oro Province",
    pincode: "325",
    eKycToken: "EKYC901234567",
    eKycDate: new Date(2021, 9, 5),
    eKycStatus: "Rejected",
    status: "Active",
    overdue: null,
    nextInvoiceDate: null,
    billCycle: null,
    simDetails: {
      allocationDate: new Date(2021, 9, 3),
      iccId: "8967400324200324901",
    },
    currentPack: {
      name: "BroadBand Basic",
      price: 699,
      validity: 30,
    },
    currentBill: null,
    rechargeHistory: [
      {
        date: new Date(2025, 8, 3),
        amount: 699,
        type: "Recharge",
        paymentMethod: "UPI",
        status: "Success",
      },
    ],
    tickets: [
      {
        id: "TKT3001",
        subject: "eKYC Rejection",
        priority: "High",
        status: "Open",
        createdDate: new Date(2025, 8, 18),
      },
    ],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
  {
    id: 10,
    name: "Sarah Siaguru",
    customerType: "Postpaid",
    serviceType: "VOIP",
    simType: "nano-SIM",
    msisdn: "67501234567",
    imsi: "617020123456789",
    vip: true,
    gender: "Female",
    dob: new Date(1984, 9, 28),
    registrationDate: new Date(2020, 4, 15),
    email: "sarah.siaguru@email.com",
    alternateNumber: "67586543210",
    address: "Kerema, Gulf Province, Papua New Guinea",
    city: "Kerema",
    state: "Gulf Province",
    pincode: "304",
    eKycToken: "EKYC012345678",
    eKycDate: new Date(2020, 4, 17),
    eKycStatus: "Verified",
    status: "Active",
    overdue: null,
    nextInvoiceDate: new Date(2025, 10, 15),
    billCycle: "15th of every month",
    simDetails: {
      allocationDate: new Date(2020, 4, 15),
      iccId: "8967400324200324012",
    },
    currentPack: {
      name: "VOIP Enterprise",
      price: 1999,
      validity: 30,
    },
    currentBill: {
      amount: 1999,
      dueDate: new Date(2025, 9, 15),
      status: "Paid",
      rental: 1799,
      extraUsage: 100,
      taxes: 100,
    },
    rechargeHistory: [
      {
        date: new Date(2025, 7, 15),
        amount: 1999,
        type: "Bill Payment",
        paymentMethod: "PayPal",
        status: "Success",
      },
    ],
    tickets: [],
    planUpgradeHistory: [],
    simSwapHistory: [],
    complaintHistory: [],
    generateBillHistory: [],
  },
]

const Customer = ({ onCustomersChange, onCurrentCustomerChange }) => {
  const theme = useTheme()
  const [customers, setCustomers] = useState(sampleCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(sampleCustomers[0])
  const [notFoundDialog, setNotFoundDialog] = useState(false)
  const [showAllCustomers, setShowAllCustomers] = useState(false)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  useEffect(() => {
    if (onCustomersChange) {
      onCustomersChange(customers)
    }
  }, [customers, onCustomersChange])

  useEffect(() => {
    if (onCurrentCustomerChange) {
      onCurrentCustomerChange(selectedCustomer)
    }
  }, [selectedCustomer, onCurrentCustomerChange])

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const exactMatches = customers.filter((customer) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          customer.name.toLowerCase().includes(searchLower) ||
          customer.msisdn.includes(searchTerm) ||
          customer.eKycToken.toLowerCase().includes(searchLower) ||
          customer.customerType.toLowerCase().includes(searchLower) ||
          customer.serviceType.toLowerCase().includes(searchLower) ||
          customer.id.toString().includes(searchTerm)
        )
      })

      if (exactMatches.length > 0) {
        setShowAllCustomers(false)
        setSelectedCustomer(exactMatches[0])
        setNotification({
          open: true,
          message: `Customer found: ${exactMatches[0].name}`,
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
      // Update existing customer
      setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)))
      setSelectedCustomer(customer) // Update the selected customer display
    } else {
      // Add new customer
      const newCustomer = { ...customer, id: customers.length + 1 }
      setCustomers((prev) => [...prev, newCustomer])
    }

    setNotification({
      open: true,
      message: isEditMode ? "Customer updated successfully!" : "Customer added successfully!",
      severity: "success",
    })
    setOpenForm(false)
  }

  const handlePlanUpgradeNotification = (notificationData) => {
    let message = ""
    let severity = "success"

    if (typeof notificationData === "string") {
      message = notificationData
    } else if (notificationData && typeof notificationData === "object") {
      // If notificationData.message is also an object, extract its message property
      if (typeof notificationData.message === "string") {
        message = notificationData.message
      } else if (notificationData.message && typeof notificationData.message === "object") {
        message = notificationData.message.message || JSON.stringify(notificationData.message)
      } else {
        message = JSON.stringify(notificationData)
      }
      severity = notificationData.severity || "success"
    }

    setNotification({
      open: true,
      message: message,
      severity: severity,
    })
  }

  const handleToggleAllCustomers = () => {
    setShowAllCustomers(!showAllCustomers)
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setShowAllCustomers(false)
    setNotification({
      open: true,
      message: `Viewing customer: ${customer.name}`,
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
          fontSize: "1rem",
        }}
      >
        {/* Success Notification */}
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
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                CRM Subscriber Module
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
              p: 3,
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <TextField
              variant="outlined"
              size="medium"
              placeholder="Search MSISDN, Subscriber ID, Account No."
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
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
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
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                {showAllCustomers ? "Hide" : "Show All Customer"}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                <span style={{ color: theme.palette.mode === "dark" ? "#000000" : "#ffffff" }}>New Customer</span>
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
                  }}
                >
                  All Customers ({customers.length})
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
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      MSISDN
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Type
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      Service
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
                      eKYC
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
                        {customer.name}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.msisdn}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem" }}>
                        <Chip
                          label={customer.customerType}
                          size="small"
                          sx={{
                            backgroundColor:
                              customer.customerType === "Prepaid"
                                ? theme.palette.mode === "dark"
                                  ? "#1a472a"
                                  : "#e8f5e9"
                                : theme.palette.mode === "dark"
                                  ? "#1a237e"
                                  : "#e3f2fd",
                            color:
                              customer.customerType === "Prepaid"
                                ? theme.palette.mode === "dark"
                                  ? "#4caf50"
                                  : "#2e7d32"
                                : theme.palette.mode === "dark"
                                  ? "#64b5f6"
                                  : "#1565c0",
                            fontSize: "0.7rem",
                            height: "20px",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.75rem" }}
                      >
                        {customer.serviceType}
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
                      <TableCell sx={{ fontSize: "0.75rem" }}>
                        <Chip
                          label={customer.eKycStatus}
                          size="small"
                          sx={{
                            backgroundColor:
                              customer.eKycStatus === "Verified"
                                ? theme.palette.mode === "dark"
                                  ? "#1a472a"
                                  : "#e8f5e9"
                                : customer.eKycStatus === "Pending"
                                  ? theme.palette.mode === "dark"
                                    ? "#4a3c00"
                                    : "#fff3e0"
                                  : theme.palette.mode === "dark"
                                    ? "#4a1a1a"
                                    : "#ffebee",
                            color:
                              customer.eKycStatus === "Verified"
                                ? theme.palette.mode === "dark"
                                  ? "#4caf50"
                                  : "#2e7d32"
                                : customer.eKycStatus === "Pending"
                                  ? theme.palette.mode === "dark"
                                    ? "#ffa726"
                                    : "#e65100"
                                  : theme.palette.mode === "dark"
                                    ? "#ef5350"
                                    : "#c62828",
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
                          <PersonIcon fontSize="small" />
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
          <CustomerDetails
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
            inline={true}
            onEdit={handleEditCustomer}
            onCustomerUpdate={(updatedCustomer) => {
              setCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
              setSelectedCustomer(updatedCustomer)
            }}
            onPlanUpgradeNotification={handlePlanUpgradeNotification}
          />
        )}

        {/* Customer Form Dialog */}
        <CustomerForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveCustomer}
          customer={currentCustomer}
          isEditMode={isEditMode}
        />

        {/* Customer Not Found Dialog */}
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
                  fontSize: 80,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "text.secondary",
                  mb: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Customer Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.mode === "dark" ? "#cccccc" : "text.secondary",
                  mb: 3,
                }}
              >
                We couldn't find any customer matching "{searchTerm}". Please check the details and try again.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => setNotFoundDialog(false)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
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

export default Customer
