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

// Initial Router data structure
const initialRouterState = {
  serialNumber: "",
  vendorId: 1,
  macAddress: "",
  userName: "",
  activationDate: new Date(),
  deviceId: "",
  deviceModel: "",
  deviceMake: "",
  manufacturer: "",
  deviceType: "Wireless Router",
  status: true,
  ipAddress: "",
  firmwareVersion: "",
  location: "",
}

const RouterForm = ({ open, onClose, onSave, router, isEditMode }) => {
  const [currentRouter, setCurrentRouter] = useState(initialRouterState)

  useEffect(() => {
    if (router && isEditMode) {
      setCurrentRouter(router)
    } else {
      setCurrentRouter(initialRouterState)
    }
  }, [router, isEditMode, open])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentRouter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentRouter((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  const handleSave = () => {
    onSave(currentRouter)
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
            <Typography variant="h6">{isEditMode ? "Edit Router" : "Add New Router"}</Typography>
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
                    label="Serial Number"
                    name="serialNumber"
                    value={currentRouter.serialNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Device ID"
                    name="deviceId"
                    value={currentRouter.deviceId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="User Name"
                    name="userName"
                    value={currentRouter.userName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="MAC Address"
                    name="macAddress"
                    value={currentRouter.macAddress}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    placeholder="00:1B:44:11:3A:B7"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="IP Address"
                    name="ipAddress"
                    value={currentRouter.ipAddress}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    placeholder="192.168.1.1"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="Activation Date"
                    value={currentRouter.activationDate}
                    onChange={(date) => handleDateChange("activationDate", date)}
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

            {/* Device Information Section */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Device Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Device Model"
                    name="deviceModel"
                    value={currentRouter.deviceModel}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Device Make"
                    name="deviceMake"
                    value={currentRouter.deviceMake}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    name="manufacturer"
                    value={currentRouter.manufacturer}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Device Type</InputLabel>
                    <Select
                      name="deviceType"
                      value={currentRouter.deviceType}
                      onChange={handleInputChange}
                      label="Device Type"
                    >
                      <MenuItem value="Wireless Router">Wireless Router</MenuItem>
                      <MenuItem value="Mesh Router">Mesh Router</MenuItem>
                      <MenuItem value="Gaming Router">Gaming Router</MenuItem>
                      <MenuItem value="Business Router">Business Router</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Firmware Version"
                    name="firmwareVersion"
                    value={currentRouter.firmwareVersion}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    placeholder="v1.0.0"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vendor ID"
                    name="vendorId"
                    type="number"
                    value={currentRouter.vendorId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Location & Status Section */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Location & Status
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={currentRouter.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    placeholder="Office A, Floor 2"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentRouter.status}
                        onChange={handleInputChange}
                        name="status"
                        color="success"
                      />
                    }
                    label="Online Status"
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

export default RouterForm
