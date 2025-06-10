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
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material"

export default function SimStolenForm({ onClose }) {
  const theme = useTheme()

  // Styles that adapt to theme
  const paperStyles = {
    p: 2,
    bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "grey.50",
    mb: 2,
  }

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      color: theme.palette.text.primary,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  }

  const [formData, setFormData] = useState({
    msisdn: "",
    customerName: "",
    customerEmail: "",
    simIccid: "",
    telecomOperator: "",
    dateOfTheft: "",
    locationOfTheft: "",
    policeReportNumber: "",
    incidentDescription: "",
    requestNewSim: false,
    emergencyContact: "",
    notes: "",
  })
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const telecomOperators = ["Operator A", "Operator B", "Operator C"]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SIM Stolen Report:", formData)
    setNotification({
      open: true,
      message: "SIM stolen report submitted successfully! Your SIM has been blocked.",
      severity: "success",
    })

    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  return (
    <Box>
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Important:</strong> Reporting a SIM as stolen will immediately block the SIM card. This action cannot
          be undone. Please ensure this is accurate.
        </Typography>
      </Alert>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
                    variant="outlined"
                    sx={textFieldStyles}
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
                    variant="outlined"
                    sx={textFieldStyles}
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
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Alternative contact number"
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                SIM Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SIM ICCID"
                    name="simIccid"
                    value={formData.simIccid}
                    onChange={handleInputChange}
                    required
                    placeholder="SIM card ICCID number"
                    variant="outlined"
                    sx={textFieldStyles}
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

          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                Incident Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date of Theft"
                    name="dateOfTheft"
                    type="date"
                    value={formData.dateOfTheft}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Police Report Number"
                    name="policeReportNumber"
                    value={formData.policeReportNumber}
                    onChange={handleInputChange}
                    placeholder="If available"
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location of Theft"
                    name="locationOfTheft"
                    value={formData.locationOfTheft}
                    onChange={handleInputChange}
                    required
                    placeholder="Where did the theft occur?"
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Incident Description"
                    name="incidentDescription"
                    value={formData.incidentDescription}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    placeholder="Please describe what happened in detail"
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.requestNewSim}
                  onChange={handleInputChange}
                  name="requestNewSim"
                  color="primary"
                />
              }
              label="Request replacement SIM card"
            />
            <Typography variant="caption" display="block" color="textSecondary">
              Check this if you want us to issue a new SIM card with the same number
            </Typography>
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
              placeholder="Any additional information"
              variant="outlined"
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="error">
                Report as Stolen & Block SIM
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
