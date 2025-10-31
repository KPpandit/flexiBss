"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  Person as PersonIcon,
  SimCard as SimCardIcon,
  Verified as VerifiedIcon,
  ContactPhone as ContactIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const initialCustomerState = {
  name: "",
  customerType: "Prepaid",
  serviceType: "Mobility",
  simType: "nano-SIM",
  msisdn: "",
  imsi: "",
  vip: false,
  gender: "Male",
  dob: new Date(),
  registrationDate: new Date(),
  email: "",
  alternateNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  eKycToken: "",
  eKycDate: new Date(),
  eKycStatus: "Pending",
  status: "Active",
  overdue: null,
  nextInvoiceDate: null,
  billCycle: null,
  simDetails: {
    allocationDate: new Date(),
    iccId: "",
  },
  currentPack: {
    name: "",
    price: 0,
    validity: 30,
  },
  currentBill: null,
  rechargeHistory: [],
  tickets: [],
  planUpgradeHistory: [],
  simSwapHistory: [],
  complaintHistory: [],
  generateBillHistory: [],
}

const CustomerForm = ({ open, onClose, onSave, customer, isEditMode }) => {
  const theme = useTheme()
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState)

  useEffect(() => {
    if (customer && isEditMode) {
      setCurrentCustomer({
        ...initialCustomerState,
        ...customer,
        dob: customer.dob ? new Date(customer.dob) : new Date(),
        registrationDate: customer.registrationDate ? new Date(customer.registrationDate) : new Date(),
        eKycDate: customer.eKycDate ? new Date(customer.eKycDate) : new Date(),
        nextInvoiceDate: customer.nextInvoiceDate ? new Date(customer.nextInvoiceDate) : null,
        simDetails: {
          ...initialCustomerState.simDetails,
          ...customer.simDetails,
          allocationDate: customer.simDetails?.allocationDate
            ? new Date(customer.simDetails.allocationDate)
            : new Date(),
        },
        currentPack: {
          ...initialCustomerState.currentPack,
          ...customer.currentPack,
        },
        currentBill: customer.currentBill || null,
      })
    } else {
      setCurrentCustomer(initialCustomerState)
    }
  }, [customer, isEditMode, open])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  const handleSimDetailsChange = (name, value) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      simDetails: {
        ...prev.simDetails,
        [name]: value,
      },
    }))
  }

  const handleCurrentPackChange = (name, value) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      currentPack: {
        ...prev.currentPack,
        [name]: value,
      },
    }))
  }

  const handleMsisdnChange = (e) => {
    let value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length > 11) value = value.slice(0, 11) // Limit to 11 digits
    if (value.length > 0 && !value.startsWith("675")) {
      if (value.length <= 3) {
        value = "675"
      } else {
        value = "675" + value.slice(3)
      }
    }
    setCurrentCustomer((prev) => ({
      ...prev,
      msisdn: value,
    }))
  }

  const handleSave = () => {
    const customerToSave = {
      ...currentCustomer,
      id: isEditMode ? currentCustomer.id : Date.now(),
      eKycToken: currentCustomer.eKycToken || `EKYC${Math.floor(100000000 + Math.random() * 900000000)}`,
      imsi: currentCustomer.imsi || `61701${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      simDetails: {
        ...currentCustomer.simDetails,
        iccId: currentCustomer.simDetails.iccId || `8967400324200324${Math.floor(100 + Math.random() * 900)}`,
      },
    }
    onSave(customerToSave)
  }

  const sectionStyle = {
    p: 3,
    mb: 3,
    borderRadius: 2,
    bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
  }

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    mb: 3,
    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            minHeight: "90vh",
          },
        }}
      >
        <DialogTitle
         
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={600} sx={{ fontSize: "1rem" }}>
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </Typography>
            <IconButton onClick={onClose} size="small" >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 4,
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
          }}
        >
          {/* Basic Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <PersonIcon sx={{ mr: 1, fontSize: 28, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                Basic Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name *"
                  name="name"
                  value={currentCustomer.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter customer full name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    }}
                  >
                    Customer Type *
                  </InputLabel>
                  <Select
                    name="customerType"
                    value={currentCustomer.customerType}
                    onChange={handleInputChange}
                    label="Customer Type *"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Prepaid">Prepaid</MenuItem>
                    <MenuItem value="Postpaid">Postpaid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    name="gender"
                    value={currentCustomer.gender}
                    onChange={handleInputChange}
                    label="Gender"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    }}
                  >
                    Service Type *
                  </InputLabel>
                  <Select
                    name="serviceType"
                    value={currentCustomer.serviceType}
                    onChange={handleInputChange}
                    label="Service Type *"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Mobility">Mobility</MenuItem>
                    <MenuItem value="FWA">FWA (Fixed Wireless Access)</MenuItem>
                    <MenuItem value="BroadBand">BroadBand</MenuItem>
                    <MenuItem value="VOIP">VOIP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Date of Birth"
                  value={currentCustomer.dob}
                  onChange={(date) => handleDateChange("dob", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", height: "56px" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentCustomer.vip}
                        onChange={handleInputChange}
                        name="vip"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#F8D582",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#F8D582",
                          },
                        }}
                        size="medium"
                      />
                    }
                    label={
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        sx={{
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        }}
                      >
                        VIP Customer
                      </Typography>
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Contact Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <ContactIcon sx={{ mr: 1, fontSize: 28, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                Contact Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={currentCustomer.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="customer@example.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Alternate Number"
                  name="alternateNumber"
                  value={currentCustomer.alternateNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="675XXXXXXXX"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={currentCustomer.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={2}
                  placeholder="Enter full address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={currentCustomer.city}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={currentCustomer.state}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  name="pincode"
                  value={currentCustomer.pincode}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* SIM Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <SimCardIcon sx={{ mr: 1, fontSize: 28, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                SIM Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="MSISDN *"
                  name="msisdn"
                  value={currentCustomer.msisdn}
                  onChange={handleMsisdnChange}
                  variant="outlined"
                  placeholder="675XXXXXXXX"
                  helperText="Phone number must start with 675 followed by 8 digits"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiFormHelperText-root": {
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    }}
                  >
                    SIM Type
                  </InputLabel>
                  <Select
                    name="simType"
                    value={currentCustomer.simType}
                    onChange={handleInputChange}
                    label="SIM Type"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="nano-SIM">nano-SIM</MenuItem>
                    <MenuItem value="micro-SIM">micro-SIM</MenuItem>
                    <MenuItem value="eSIM">eSIM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IMSI *"
                  name="imsi"
                  value={currentCustomer.imsi}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="15-digit IMSI number (e.g., 617011234567890)"
                  inputProps={{ maxLength: 15 }}
                  helperText="IMSI must be exactly 15 digits"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiFormHelperText-root": {
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ICC ID"
                  name="iccId"
                  value={currentCustomer.simDetails?.iccId || ""}
                  onChange={(e) => handleSimDetailsChange("iccId", e.target.value)}
                  variant="outlined"
                  placeholder="Auto-generated if empty"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Allocation Date"
                  value={currentCustomer.simDetails?.allocationDate || new Date()}
                  onChange={(date) => handleSimDetailsChange("allocationDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Registration Date"
                  value={currentCustomer.registrationDate}
                  onChange={(date) => handleDateChange("registrationDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Plan Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <BusinessIcon sx={{ mr: 1, fontSize: 28, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                Plan Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  name="name"
                  value={currentCustomer.currentPack?.name || ""}
                  onChange={(e) => handleCurrentPackChange("name", e.target.value)}
                  variant="outlined"
                  placeholder="e.g., Premium 50GB"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Plan Price ($)"
                  name="price"
                  type="number"
                  value={currentCustomer.currentPack?.price || ""}
                  onChange={(e) => handleCurrentPackChange("price", Number.parseInt(e.target.value) || 0)}
                  variant="outlined"
                  placeholder="599"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Validity (Days)"
                  name="validity"
                  type="number"
                  value={currentCustomer.currentPack?.validity || ""}
                  onChange={(e) => handleCurrentPackChange("validity", Number.parseInt(e.target.value) || 30)}
                  variant="outlined"
                  placeholder="30"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* eKYC Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <VerifiedIcon sx={{ mr: 1, fontSize: 28, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                eKYC Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="eKYC Token"
                  name="eKycToken"
                  value={currentCustomer.eKycToken}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Auto-generated if empty"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                    }}
                  >
                    eKYC Status
                  </InputLabel>
                  <Select
                    name="eKycStatus"
                    value={currentCustomer.eKycStatus}
                    onChange={handleInputChange}
                    label="eKYC Status"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "1rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Verified">Verified</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="eKYC Date"
                  value={currentCustomer.eKycDate}
                  onChange={(date) => handleDateChange("eKycDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              {currentCustomer.customerType === "Postpaid" && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Overdue Amount ($)"
                      name="overdue"
                      type="number"
                      value={currentCustomer.overdue || ""}
                      onChange={(e) =>
                        setCurrentCustomer((prev) => ({ ...prev, overdue: Number.parseInt(e.target.value) || null }))
                      }
                      variant="outlined"
                      placeholder="0"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Next Invoice Date"
                      value={currentCustomer.nextInvoiceDate}
                      onChange={(date) => handleDateChange("nextInvoiceDate", date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                              "& fieldset": {
                                borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                              fontSize: "1rem",
                            },
                            "& .MuiOutlinedInput-input": {
                              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                              fontSize: "1rem",
                            },
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Bill Cycle"
                      name="billCycle"
                      value={currentCustomer.billCycle || ""}
                      onChange={handleInputChange}
                      variant="outlined"
                      placeholder="e.g., 25th of every month"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                          "& fieldset": {
                            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </DialogContent>

        <DialogActions
          sx={{
            px: 4,
            py: 3,
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            borderTop: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            size="large"
            sx={{
              minWidth: 120,
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
              fontSize: "1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            size="large"
            sx={{
              minWidth: 120,
              bgcolor: "#F8D582",
              color: "#000000",
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#e6c474",
              },
            }}
          >
            {isEditMode ? "Update Customer" : "Save Customer"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default CustomerForm
