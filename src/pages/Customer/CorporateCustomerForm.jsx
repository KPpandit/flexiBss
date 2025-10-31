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
  IconButton,
  Paper,
  useTheme,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  SimCard as SimCardIcon,
  Description as DescriptionIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const initialCustomerState = {
  companyName: "",
  corporateId: "",
  industryType: "IT",
  companySize: "Medium",
  contactPersonName: "",
  designation: "",
  officialEmail: "",
  officialContactNumber: "",
  registeredAddress: "",
  billingAddress: "",
  preferredBillingCycle: "Monthly",
  creditLimit: 0,
  accountManager: "",
  basePlanName: "",
  planRental: 0,
  dataAllowance: "",
  voiceAllowance: "",
  smsAllowance: "",
  addOnPacks: [],
  contractDuration: "12 Months",
  activationDate: new Date(),
  billingType: "Centralized",
  numberOfSims: 0,
  sims: [],
  documents: {
    companyRegistration: null,
    signatoryId: null,
    addressProof: null,
    signedContract: null,
  },
  paymentMode: "NEFT",
  bankAccountNumber: "",
  ifscCode: "",
  billingEmails: "",
  verificationStatus: "Pending",
  approvedBy: "",
  remarks: "",
  status: "Active",
}

const CorporateCustomerForm = ({ open, onClose, onSave, customer, isEditMode }) => {
  const theme = useTheme()
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState)

  useEffect(() => {
    if (customer && isEditMode) {
      setCurrentCustomer({
        ...initialCustomerState,
        ...customer,
        activationDate: customer.activationDate ? new Date(customer.activationDate) : new Date(),
        sims: customer.sims || [],
      })
    } else {
      setCurrentCustomer(initialCustomerState)
    }
  }, [customer, isEditMode, open])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  const handleAddSim = () => {
    setCurrentCustomer((prev) => ({
      ...prev,
      sims: [
        ...prev.sims,
        {
          id: Date.now(),
          simNumber: "",
          msisdn: "",
          userName: "",
          department: "",
          email: "",
          dataLimit: "",
          status: "Pending Activation",
        },
      ],
    }))
  }

  const handleRemoveSim = (id) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      sims: prev.sims.filter((sim) => sim.id !== id),
    }))
  }

  const handleSimChange = (id, field, value) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      sims: prev.sims.map((sim) => (sim.id === id ? { ...sim, [field]: value } : sim)),
    }))
  }

  const handleFileUpload = (field, event) => {
    const file = event.target.files[0]
    if (file) {
      setCurrentCustomer((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: file.name,
        },
      }))
    }
  }

  const handleSave = () => {
    const customerToSave = {
      ...currentCustomer,
      id: isEditMode ? currentCustomer.id : Date.now(),
      numberOfSims: currentCustomer.sims.length,
    }
    onSave(customerToSave)
  }

  const sectionStyle = {
    p: 2.5,
    mb: 2.5,
    borderRadius: 2,
    bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
  }

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    mb: 2.5,
    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  }

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
      fontSize: "0.875rem",
      "& fieldset": {
        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
      fontSize: "0.875rem",
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
      fontSize: "0.875rem",
    },
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
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            py: 2,
            borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={600} sx={{ fontSize: "1rem" }}>
              {isEditMode ? "Edit Corporate Customer" : "Add New Corporate Customer"}
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff !important" : "#000000 !important",
                "&:hover": {
                  bgcolor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 3,
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            maxHeight: "calc(90vh - 140px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.mode === "dark" ? "#404040" : "#cccccc",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#606060" : "#999999",
              },
            },
          }}
        >
          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <BusinessIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                Corporate Account Information
              </Typography>
            </Box>

            <Grid  container spacing={2.5}>
              <Grid sx={{width:'20%'}} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name *"
                  name="companyName"
                  value={currentCustomer.companyName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Corporate ID *"
                  name="corporateId"
                  value={currentCustomer.corporateId}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Industry Type
                  </InputLabel>
                  <Select
                    name="industryType"
                    value={currentCustomer.industryType}
                    onChange={handleInputChange}
                    label="Industry Type"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem  value="IT">IT</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Banking">Banking</MenuItem>
                    <MenuItem value="Mining">Mining</MenuItem>
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Company Size
                  </InputLabel>
                  <Select
                    name="companySize"
                    value={currentCustomer.companySize}
                    onChange={handleInputChange}
                    label="Company Size"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Small">Small (1-50 employees)</MenuItem>
                    <MenuItem value="Medium">Medium (51-250 employees)</MenuItem>
                    <MenuItem value="Enterprise">Enterprise (250+ employees)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Contact Person Name *"
                  name="contactPersonName"
                  value={currentCustomer.contactPersonName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={currentCustomer.designation}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Official Email *"
                  name="officialEmail"
                  type="email"
                  value={currentCustomer.officialEmail}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Official Contact Number *"
                  name="officialContactNumber"
                  value={currentCustomer.officialContactNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'41%'}} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Registered Address *"
                  name="registeredAddress"
                  value={currentCustomer.registeredAddress}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'41%'}} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Billing Address"
                  name="billingAddress"
                  value={currentCustomer.billingAddress}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Same as registered if empty"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Billing Cycle
                  </InputLabel>
                  <Select
                    name="preferredBillingCycle"
                    value={currentCustomer.preferredBillingCycle}
                    onChange={handleInputChange}
                    label="Billing Cycle"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Credit Limit ($)"
                  name="creditLimit"
                  type="number"
                  value={currentCustomer.creditLimit || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Account Manager"
                  name="accountManager"
                  value={currentCustomer.accountManager}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <SettingsIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                Postpaid Plan & Service Details
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Base Plan Name"
                  name="basePlanName"
                  value={currentCustomer.basePlanName}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g., Corporate Gold"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Plan Rental ($)"
                  name="planRental"
                  type="number"
                  value={currentCustomer.planRental || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Data"
                  name="dataAllowance"
                  value={currentCustomer.dataAllowance}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g., 500GB Pooled"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Voice"
                  name="voiceAllowance"
                  value={currentCustomer.voiceAllowance}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g., Unlimited"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="SMS"
                  name="smsAllowance"
                  value={currentCustomer.smsAllowance}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g., 10000"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Contract Duration
                  </InputLabel>
                  <Select
                    name="contractDuration"
                    value={currentCustomer.contractDuration}
                    onChange={handleInputChange}
                    label="Contract Duration"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="6 Months">6 Months</MenuItem>
                    <MenuItem value="12 Months">12 Months</MenuItem>
                    <MenuItem value="24 Months">24 Months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <DatePicker
                  label="Activation Date"
                  value={currentCustomer.activationDate}
                  onChange={(date) => handleDateChange("activationDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: inputStyle,
                    },
                  }}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Billing Type
                  </InputLabel>
                  <Select
                    name="billingType"
                    value={currentCustomer.billingType}
                    onChange={handleInputChange}
                    label="Billing Type"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Centralized">Centralized</MenuItem>
                    <MenuItem value="Department-wise">Department-wise</MenuItem>
                    <MenuItem value="Individual">Individual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <SimCardIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                Multi-SIM Management ({currentCustomer.sims.length} SIMs)
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddSim}
                size="medium"
                sx={{
                  bgcolor: "#F8D582",
                  color: "#000000",
                  fontSize: "0.875rem",
                  "&:hover": {
                    bgcolor: "#e6c474",
                  },
                }}
              >
                Add SIM
              </Button>
            </Box>

            {currentCustomer.sims.length > 0 && (
              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <TableContainer
                  component={Paper}
                  sx={{
                    bgcolor: "transparent",
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    minWidth: 1000,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 120,
                          }}
                        >
                          SIM Number
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 120,
                          }}
                        >
                          MSISDN
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 120,
                          }}
                        >
                          User Name
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 100,
                          }}
                        >
                          Department
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 150,
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 80,
                          }}
                        >
                          Data Limit
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 140,
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            minWidth: 60,
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentCustomer.sims.map((sim) => (
                        <TableRow key={sim.id}>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.simNumber}
                              onChange={(e) => handleSimChange(sim.id, "simNumber", e.target.value)}
                              placeholder="ICCID"
                              sx={{ ...inputStyle, width: "100%", minWidth: 110 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.msisdn}
                              onChange={(e) => handleSimChange(sim.id, "msisdn", e.target.value)}
                              placeholder="675XXXXXXXX"
                              sx={{ ...inputStyle, width: "100%", minWidth: 110 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.userName}
                              onChange={(e) => handleSimChange(sim.id, "userName", e.target.value)}
                              placeholder="User name"
                              sx={{ ...inputStyle, width: "100%", minWidth: 110 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.department}
                              onChange={(e) => handleSimChange(sim.id, "department", e.target.value)}
                              placeholder="Department"
                              sx={{ ...inputStyle, width: "100%", minWidth: 90 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.email}
                              onChange={(e) => handleSimChange(sim.id, "email", e.target.value)}
                              placeholder="email@example.com"
                              sx={{ ...inputStyle, width: "100%", minWidth: 140 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={sim.dataLimit}
                              onChange={(e) => handleSimChange(sim.id, "dataLimit", e.target.value)}
                              placeholder="10GB"
                              sx={{ ...inputStyle, width: "100%", minWidth: 70 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              size="small"
                              value={sim.status}
                              onChange={(e) => handleSimChange(sim.id, "status", e.target.value)}
                              sx={{
                                bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                                fontSize: "0.875rem",
                                width: "100%",
                                minWidth: 130,
                                "& fieldset": {
                                  borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                                },
                              }}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Pending Activation">Pending Activation</MenuItem>
                              <MenuItem value="Suspended">Suspended</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveSim(sim.id)}
                              sx={{
                                color: theme.palette.mode === "dark" ? "#ef5350" : "#d32f2f",
                                "&:hover": {
                                  bgcolor:
                                    theme.palette.mode === "dark" ? "rgba(239, 83, 80, 0.1)" : "rgba(211, 47, 47, 0.1)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>

          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <DescriptionIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                KYC & Documentation
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Company Registration Proof
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    size="medium"
                    sx={{
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "&:hover": {
                        borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      },
                    }}
                  >
                    Upload PDF/JPG
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("companyRegistration", e)}
                    />
                  </Button>
                  {currentCustomer.documents.companyRegistration && (
                    <Chip label={currentCustomer.documents.companyRegistration} size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Authorized Signatory ID Proof
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    size="medium"
                    sx={{
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "&:hover": {
                        borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      },
                    }}
                  >
                    Upload PDF/JPG
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("signatoryId", e)}
                    />
                  </Button>
                  {currentCustomer.documents.signatoryId && (
                    <Chip label={currentCustomer.documents.signatoryId} size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Address Proof
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    size="medium"
                    sx={{
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "&:hover": {
                        borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      },
                    }}
                  >
                    Upload PDF/JPG
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("addressProof", e)}
                    />
                  </Button>
                  {currentCustomer.documents.addressProof && (
                    <Chip label={currentCustomer.documents.addressProof} size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Signed Contract / MOU
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    size="medium"
                    sx={{
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "&:hover": {
                        borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      },
                    }}
                  >
                    Upload PDF
                    <input type="file" hidden accept=".pdf" onChange={(e) => handleFileUpload("signedContract", e)} />
                  </Button>
                  {currentCustomer.documents.signedContract && (
                    <Chip label={currentCustomer.documents.signedContract} size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <PaymentIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                Payment Setup
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Payment Mode
                  </InputLabel>
                  <Select
                    name="paymentMode"
                    value={currentCustomer.paymentMode}
                    onChange={handleInputChange}
                    label="Payment Mode"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    
                    <MenuItem value="Auto-Debit">Auto-Debit</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  name="bankAccountNumber"
                  value={currentCustomer.bankAccountNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifscCode"
                  value={currentCustomer.ifscCode}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12}>
                <TextField
                  fullWidth
                  label="Billing Email Recipients"
                  name="billingEmails"
                  value={currentCustomer.billingEmails}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="email1@example.com, email2@example.com"
                  helperText="Separate multiple emails with commas"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={sectionStyle}>
            <Box sx={sectionHeaderStyle}>
              <CheckCircleIcon sx={{ mr: 1, fontSize: 24, color: "#F8D582" }} />
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "0.9rem" }}>
                Internal Workflow
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
               <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Approved By"
                  name="approvedBy"
                  value={currentCustomer.approvedBy}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Verification Status
                  </InputLabel>
                  <Select
                    name="verificationStatus"
                    value={currentCustomer.verificationStatus}
                    onChange={handleInputChange}
                    label="Verification Status"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Verified">Verified</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
             
              <Grid sx={{width:'20%'}} item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    name="status"
                    value={currentCustomer.status}
                    onChange={handleInputChange}
                    label="Status"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
                      },
                    }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{width:'20%'}} item xs={12}>
                <TextField
                  fullWidth
                  label="Remarks / Comments"
                  name="remarks"
                  value={currentCustomer.remarks}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Add any notes or comments for operations team"
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2.5,
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            borderTop: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            size="medium"
            sx={{
              minWidth: 100,
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
              fontSize: "0.875rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            size="medium"
            sx={{
              minWidth: 100,
              bgcolor: "#F8D582",
              color: "#000000",
              fontSize: "0.875rem",
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

export default CorporateCustomerForm
