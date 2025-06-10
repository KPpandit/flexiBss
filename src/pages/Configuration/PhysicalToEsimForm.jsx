"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Paper,
  Divider,
  useTheme,
} from "@mui/material"

export default function PhysicalToEsimForm({ onClose }) {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    msisdn: "",
    currentSimIccid: "",
    customerName: "",
    customerEmail: "",
    telecomOperator: "",
    deviceModel: "",
    deviceImei: "",
    reason: "",
    notes: "",
  })
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const telecomOperators = ["Operator A", "Operator B", "Operator C", "International Roaming"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Physical to eSIM Conversion:", formData)
    setNotification({
      open: true,
      message: "eSIM conversion request submitted successfully!",
      severity: "success",
    })

    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  // Styles that adapt to theme
  const paperStyles = {
    p: 2,
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'grey.50',
    mb: 2
  }

  const textFieldStyles = {
    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        Convert your physical SIM card to an eSIM. This process will deactivate your current physical SIM and activate a
        new eSIM profile.
      </Alert>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="MSISDN"
                    name="msisdn"
                    value={formData.msisdn}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Customer Email"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required sx={textFieldStyles}>
                    <InputLabel>Telecom Operator</InputLabel>
                    <Select
                      name="telecomOperator"
                      value={formData.telecomOperator}
                      onChange={handleInputChange}
                      label="Telecom Operator"
                    >
                      {telecomOperators.map((operator) => (
                        <MenuItem key={operator} value={operator}>
                          {operator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* SIM Information */}
          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                Current SIM Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current SIM ICCID"
                    name="currentSimIccid"
                    value={formData.currentSimIccid}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter current SIM ICCID"
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Device Information */}
          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                Target Device Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Device Model"
                    name="deviceModel"
                    value={formData.deviceModel}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., iPhone 14, Samsung Galaxy S23"
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Device IMEI"
                    name="deviceImei"
                    value={formData.deviceImei}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter device IMEI"
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Conversion"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Why do you want to convert to eSIM?"
              sx={textFieldStyles}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Any additional information or special requirements"
              sx={textFieldStyles}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit Conversion Request
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}