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

export default function SimReturnForm({ onClose }) {
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
    returnReason: "",
    returnDate: "",
    simCondition: "",
    refundRequested: false,
    refundAmount: "",
    returnMethod: "",
    trackingNumber: "",
    notes: "",
  })
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const telecomOperators = ["Operator A", "Operator B", "Operator C"]
  const returnReasons = [
    "Service Cancellation",
    "Upgrade to New Plan",
    "Technical Issues",
    "Moving to Different Operator",
    "Other",
  ]
  const simConditions = ["Excellent", "Good", "Fair", "Poor", "Damaged"]
  const returnMethods = ["Mail", "In-Person", "Courier", "Drop-off Location"]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SIM Return Request:", formData)
    setNotification({
      open: true,
      message: "SIM return request submitted successfully!",
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
      <Alert severity="info" sx={{ mb: 3 }}>
        Process the return of a SIM card. Please ensure all account balances are settled before processing the return.
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
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required sx={textFieldStyles}>
                    <InputLabel>SIM Condition</InputLabel>
                    <Select
                      name="simCondition"
                      value={formData.simCondition}
                      onChange={handleInputChange}
                      label="SIM Condition"
                    >
                      {simConditions.map((condition) => (
                        <MenuItem key={condition} value={condition}>
                          {condition}
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
                Return Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required sx={textFieldStyles}>
                    <InputLabel>Return Reason</InputLabel>
                    <Select
                      name="returnReason"
                      value={formData.returnReason}
                      onChange={handleInputChange}
                      label="Return Reason"
                    >
                      {returnReasons.map((reason) => (
                        <MenuItem key={reason} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Return Date"
                    name="returnDate"
                    type="date"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required sx={textFieldStyles}>
                    <InputLabel>Return Method</InputLabel>
                    <Select
                      name="returnMethod"
                      value={formData.returnMethod}
                      onChange={handleInputChange}
                      label="Return Method"
                    >
                      {returnMethods.map((method) => (
                        <MenuItem key={method} value={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tracking Number"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleInputChange}
                    placeholder="If applicable"
                    sx={textFieldStyles}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={paperStyles}>
              <Typography variant="h6" gutterBottom>
                Refund Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.refundRequested}
                        onChange={handleInputChange}
                        name="refundRequested"
                        color="primary"
                      />
                    }
                    label="Request refund for unused balance"
                  />
                </Grid>
                {formData.refundRequested && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Refund Amount"
                      name="refundAmount"
                      type="number"
                      value={formData.refundAmount}
                      onChange={handleInputChange}
                      InputProps={{ startAdornment: "$" }}
                      placeholder="Enter refund amount"
                      sx={textFieldStyles}
                      variant="outlined"
                    />
                  </Grid>
                )}
              </Grid>
            </Paper>
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
              placeholder="Any additional information about the return"
              sx={textFieldStyles}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="warning">
                Process SIM Return
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
