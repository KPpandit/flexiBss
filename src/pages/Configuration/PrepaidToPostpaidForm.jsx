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

export default function PrepaidToPostpaidForm({ onClose }) {
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
    currentPlan: "",
    targetPostpaidPlan: "",
    telecomOperator: "",
    creditLimit: "",
    billingAddress: "",
    identityDocument: "",
    monthlyBudget: "",
    notes: "",
  })
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const telecomOperators = ["Operator A", "Operator B", "Operator C"]
  const postpaidPlans = ["Basic Postpaid", "Premium Postpaid", "Business Postpaid", "Family Plan"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Prepaid to Postpaid Conversion:", formData)
    setNotification({
      open: true,
      message: "Postpaid conversion request submitted successfully!",
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
        Convert your prepaid plan to postpaid. This will enable monthly billing and credit-based services.
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
                Plan Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Prepaid Plan"
                    name="currentPlan"
                    value={formData.currentPlan}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required sx={textFieldStyles}>
                    <InputLabel>Target Postpaid Plan</InputLabel>
                    <Select
                      name="targetPostpaidPlan"
                      value={formData.targetPostpaidPlan}
                      onChange={handleInputChange}
                      label="Target Postpaid Plan"
                    >
                      {postpaidPlans.map((plan) => (
                        <MenuItem key={plan} value={plan}>
                          {plan}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Desired Credit Limit"
                    name="creditLimit"
                    type="number"
                    value={formData.creditLimit}
                    onChange={handleInputChange}
                    required
                    InputProps={{ startAdornment: "$" }}
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Monthly Budget"
                    name="monthlyBudget"
                    type="number"
                    value={formData.monthlyBudget}
                    onChange={handleInputChange}
                    InputProps={{ startAdornment: "$" }}
                    variant="outlined"
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Billing Address"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              required
              multiline
              rows={2}
              variant="outlined"
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Identity Document Number"
              name="identityDocument"
              value={formData.identityDocument}
              onChange={handleInputChange}
              required
              placeholder="Driver's License, Passport, etc."
              variant="outlined"
              sx={textFieldStyles}
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
              variant="outlined"
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary">
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
