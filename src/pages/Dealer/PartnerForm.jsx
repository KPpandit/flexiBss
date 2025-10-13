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
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// Initial partner data structure
const initialPartnerState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  contact: "",
  documentType: "AadharCard",
  documentId: "",
  isNeotel: false,
  businessNature: "retailers",
  type: "Agent",
  creationDate: new Date(),
  isActive: true,
  token: "",
  totalCoreBalance: 0.0,
  locality: "",
  businessAddress: "",
  reasonStatus: "",
}

const PartnerForm = ({ open, onClose, onSave, partner, isEditMode }) => {
  const [currentPartner, setCurrentPartner] = useState(initialPartnerState)

  useEffect(() => {
    if (partner && isEditMode) {
      setCurrentPartner(partner)
    } else {
      setCurrentPartner(initialPartnerState)
    }
  }, [partner, isEditMode, open])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentPartner((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentPartner((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  const handleSave = () => {
    onSave(currentPartner)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { minHeight: "80vh" },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">{isEditMode ? "Edit Partner" : "Add New Partner"}</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ width: "100%" }}>
            {/* Basic Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={currentPartner.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={currentPartner.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={currentPartner.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Contact"
                    name="contact"
                    value={currentPartner.contact}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category Type</InputLabel>
                    <Select name="type" value={currentPartner.type} onChange={handleInputChange} label="Category Type">
                      <MenuItem value="Outside">Outside</MenuItem>
                      <MenuItem value="Inside">Inside</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Business Nature</InputLabel>
                    <Select
                      name="businessNature"
                      value={currentPartner.businessNature}
                      onChange={handleInputChange}
                      label="Business Nature"
                    >
                      <MenuItem value="retailers">Retailers</MenuItem>
                      <MenuItem value="distributors">Distributors</MenuItem>
                      <MenuItem value="wholesalers">Wholesalers</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Business Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Business Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    value={currentPartner.businessName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Locality"
                    name="locality"
                    value={currentPartner.locality}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Business Address"
                    name="businessAddress"
                    value={currentPartner.businessAddress}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Document Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Document Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      name="documentType"
                      value={currentPartner.documentType}
                      onChange={handleInputChange}
                      label="Document Type"
                    >
                      <MenuItem value="National Id">National Id </MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Document ID"
                    name="documentId"
                    value={currentPartner.documentId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="Creation Date"
                    value={currentPartner.creationDate}
                    onChange={(date) => handleDateChange("creationDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Status Information Section */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Status Information
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentPartner.isActive}
                        onChange={handleInputChange}
                        name="isActive"
                        color="success"
                      />
                    }
                    label="Active Status"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentPartner.isNeotel}
                        onChange={handleInputChange}
                        name="isNeotel"
                        color="info"
                      />
                    }
                    label="Telco Partner"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Reason Status"
                    name="reasonStatus"
                    value={currentPartner.reasonStatus}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    placeholder="Optional reason for status"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEditMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default PartnerForm
