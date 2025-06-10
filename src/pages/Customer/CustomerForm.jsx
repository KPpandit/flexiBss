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
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// Initial customer data structure
const initialCustomerState = {
  name: "",
  serviceType: "Prepaid",
  customerType: "Individual",
  simType: "Physical",
  msisdn: "",
  imsi: "",
  vip: false,
  gender: "Male",
  dob: new Date(),
  ekycToken: "",
  ekycDate: new Date(),
  ekycStatus: "Pending",
  simDetails: {
    allocationDate: new Date(),
    iccId: "",
  },
}

const CustomerForm = ({ open, onClose, onSave, customer, isEditMode }) => {
  const theme = useTheme()
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState)

  useEffect(() => {
    if (customer && isEditMode) {
      setCurrentCustomer(customer)
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

  const handleSave = () => {
    onSave(currentCustomer)
  }

  const sectionStyle = {
    p: 3,
    mb: 3,
    borderRadius: 2,
    bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
  }

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    mb: 3,
    color: theme.palette.primary.main,
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.default,
            minHeight: "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={600}>
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 4, bgcolor: theme.palette.background.default }}>
          {/* Basic Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <PersonIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" fontWeight={600}>
                Basic Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Row 1: Name and Customer Type */}
              <Grid item xs={12} md={8}>
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
                      bgcolor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Customer Type *</InputLabel>
                  <Select
                    name="customerType"
                    value={currentCustomer.customerType}
                    onChange={handleInputChange}
                    label="Customer Type *"
                    sx={{
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 2: Service Type, Gender, and VIP */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Service Type *</InputLabel>
                  <Select
                    name="serviceType"
                    value={currentCustomer.serviceType}
                    onChange={handleInputChange}
                    label="Service Type *"
                    sx={{
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <MenuItem value="Prepaid">Prepaid</MenuItem>
                    <MenuItem value="Postpaid">Postpaid</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={currentCustomer.gender}
                    onChange={handleInputChange}
                    label="Gender"
                    sx={{
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", height: "56px" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentCustomer.vip}
                        onChange={handleInputChange}
                        name="vip"
                        color="warning"
                        size="medium"
                      />
                    }
                    label={
                      <Typography variant="body1" fontWeight={500}>
                        VIP Customer
                      </Typography>
                    }
                  />
                </Box>
              </Grid>

              {/* Row 3: Date of Birth */}
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date of Birth"
                  value={currentCustomer.dob}
                  onChange={(date) => handleDateChange("dob", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.background.paper,
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* SIM Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <SimCardIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" fontWeight={600}>
                SIM Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Row 1: MSISDN and IMSI */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="MSISDN *"
                  name="msisdn"
                  value={currentCustomer.msisdn}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g., 8801XXXXXXXXX"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IMSI *"
                  name="imsi"
                  value={currentCustomer.imsi}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="15-digit IMSI number"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              {/* Row 2: ICC ID and Allocation Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ICC ID *"
                  name="iccId"
                  value={currentCustomer.simDetails?.iccId || ""}
                  onChange={(e) => handleSimDetailsChange("iccId", e.target.value)}
                  variant="outlined"
                  placeholder="e.g., 8967400324200XXXXXX"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.background.paper,
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
                          bgcolor: theme.palette.background.paper,
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* eKYC Information Section */}
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <VerifiedIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" fontWeight={600}>
                eKYC Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Row 1: eKYC Token and Status */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="eKYC Token"
                  name="ekycToken"
                  value={currentCustomer.ekycToken}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Enter eKYC token"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>eKYC Status</InputLabel>
                  <Select
                    name="ekycStatus"
                    value={currentCustomer.ekycStatus}
                    onChange={handleInputChange}
                    label="eKYC Status"
                    sx={{
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <MenuItem value="Verified">Verified</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 2: eKYC Date */}
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="eKYC Date"
                  value={currentCustomer.ekycDate}
                  onChange={(date) => handleDateChange("ekycDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          bgcolor: theme.palette.background.paper,
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>

        <DialogActions
          sx={{
            px: 4,
            py: 3,
            bgcolor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
            gap: 2,
          }}
        >
          <Button onClick={onClose} variant="outlined" size="large" sx={{ minWidth: 120 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary" size="large" sx={{ minWidth: 120 }}>
            {isEditMode ? "Update Customer" : "Save Customer"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default CustomerForm
