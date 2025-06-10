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

// Initial SIM data structure
const initialSimState = {
  msisdn: "",
  category: "NORMAL",
  specialNumber: false,
  imsi: "",
  pimsi: "",
  batchId: "",
  batchDate: new Date(),
  vendorId: 1,
  status: true,
  provStatus: true,
  simType: "micro-SIM",
  buyingPriceUsd: 0,
  sellingPriceUsd: 0,
  vat: "8.02%",
  otherTaxes: 0,
  minCommision: 0,
  maxCommision: 0,
  avgCommision: 0,
  partnerId: 1,
  validityDays: 0,
  activationStatus: "Pending",
  activationCode: "",
  activationToken: "",
  ki: "",
  opc: "",
  iccId: "",
}

const SimForm = ({ open, onClose, onSave, sim, isEditMode }) => {
  const [currentSim, setCurrentSim] = useState(initialSimState)

  useEffect(() => {
    if (sim && isEditMode) {
      setCurrentSim(sim)
    } else {
      setCurrentSim(initialSimState)
    }
  }, [sim, isEditMode, open])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentSim((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentSim((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  const handleSave = () => {
    onSave(currentSim)
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
            <Typography variant="h6">{isEditMode ? "Edit SIM" : "Add New SIM"}</Typography>
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
                    label="MSISDN"
                    name="msisdn"
                    value={currentSim.msisdn}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="IMSI"
                    name="imsi"
                    value={currentSim.imsi}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="PIMSI"
                    name="pimsi"
                    value={currentSim.pimsi}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={currentSim.category} onChange={handleInputChange} label="Category">
                      <MenuItem value="NORMAL">Normal</MenuItem>
                      <MenuItem value="VIP">VIP</MenuItem>
                      <MenuItem value="PREMIUM">Premium</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>SIM Type</InputLabel>
                    <Select name="simType" value={currentSim.simType} onChange={handleInputChange} label="SIM Type">
                      <MenuItem value="micro-SIM">Micro SIM</MenuItem>
                      <MenuItem value="nano-SIM">Nano SIM</MenuItem>
                      <MenuItem value="eSIM">eSIM</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ICC ID"
                    name="iccId"
                    value={currentSim.iccId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Batch Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Batch Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Batch ID"
                    name="batchId"
                    type="number"
                    value={currentSim.batchId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="Batch Date"
                    value={currentSim.batchDate}
                    onChange={(date) => handleDateChange("batchDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vendor ID"
                    name="vendorId"
                    type="number"
                    value={currentSim.vendorId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Pricing Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Pricing Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Buying Price (USD)"
                    name="buyingPriceUsd"
                    type="number"
                    value={currentSim.buyingPriceUsd}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Selling Price (USD)"
                    name="sellingPriceUsd"
                    type="number"
                    value={currentSim.sellingPriceUsd}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="VAT"
                    name="vat"
                    value={currentSim.vat}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Other Taxes"
                    name="otherTaxes"
                    type="number"
                    value={currentSim.otherTaxes}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Min Commission"
                    name="minCommision"
                    type="number"
                    value={currentSim.minCommision}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Max Commission"
                    name="maxCommision"
                    type="number"
                    value={currentSim.maxCommision}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Security & Activation Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Security & Activation
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="KI"
                    name="ki"
                    value={currentSim.ki}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="OPC"
                    name="opc"
                    value={currentSim.opc}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Activation Code"
                    name="activationCode"
                    value={currentSim.activationCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Activation Token"
                    name="activationToken"
                    value={currentSim.activationToken}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Activation Status</InputLabel>
                    <Select
                      name="activationStatus"
                      value={currentSim.activationStatus}
                      onChange={handleInputChange}
                      label="Activation Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
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
                      <Switch checked={currentSim.status} onChange={handleInputChange} name="status" color="success" />
                    }
                    label="Active Status"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentSim.provStatus}
                        onChange={handleInputChange}
                        name="provStatus"
                        color="info"
                      />
                    }
                    label="Provisioning Status"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentSim.specialNumber}
                        onChange={handleInputChange}
                        name="specialNumber"
                        color="warning"
                      />
                    }
                    label="Special Number"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Validity Days"
                    name="validityDays"
                    type="number"
                    value={currentSim.validityDays}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
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

export default SimForm
