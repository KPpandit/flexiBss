"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  useTheme,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material"
import {
  Receipt as BillIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Sms as SmsIcon,
} from "@mui/icons-material"

const GenerateBillComponent = ({ open, onClose, customer }) => {
  const theme = useTheme()
  const [notification, setNotification] = useState({ open: false, message: "" })
  const [billOptions, setBillOptions] = useState({
    billType: "current",
    format: "pdf", // Default to PDF only
    deliveryMethod: "download",
  })

  const handleOptionChange = (field, value) => {
    setBillOptions((prev) => ({ ...prev, [field]: value }))
  }

  const generatePDFBill = () => {
    const billContent = `
      TELECOM BILL
      ============================================
      
      Bill Number: ${mockBillData.billNumber}
      Bill Date: ${mockBillData.billDate}
      Due Date: ${mockBillData.dueDate}
      Billing Period: ${mockBillData.billingPeriod}
      
      CUSTOMER INFORMATION
      ============================================
      Name: ${customer?.name}
      Mobile Number: ${customer?.msisdn}
      Customer ID: ${customer?.id}
      Plan: ${customer?.currentPack?.name}
      
      BILL DETAILS
      ============================================
      Monthly Plan Charges:        ₹${mockBillData.planCharges}
      Extra Usage Charges:         ₹${mockBillData.extraUsage}
      Taxes & Fees:                ₹${mockBillData.taxes}
      --------------------------------------------
      Total Amount:                ₹${mockBillData.total}
      
      Amount Due: ₹${mockBillData.amountDue}
    `

    return new Blob([billContent], { type: "application/pdf" })
  }

  const handleGenerateBill = () => {
    console.log("[v0] Generating bill:", { billOptions, customer })

    const pdfBlob = generatePDFBill()

    switch (billOptions.deliveryMethod) {
      case "download":
        const url = URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `Bill_${mockBillData.billNumber}_${customer?.name}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        setNotification({ open: true, message: "Bill downloaded successfully as PDF!" })
        break

      case "email":
        console.log("[v0] Sending bill via email to:", customer?.email)
        setNotification({
          open: true,
          message: `Bill sent successfully to ${customer?.email || "customer@example.com"}!`,
        })
        break

      case "sms":
        console.log("[v0] Sending bill link via SMS to:", customer?.msisdn)
        setNotification({ open: true, message: `Bill link sent successfully to ${customer?.msisdn}!` })
        break

      case "print":
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Bill - ${mockBillData.billNumber}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { color: #333; }
                  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                  th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                </style>
              </head>
              <body>
                <h1>Telecom Bill</h1>
                <p><strong>Bill Number:</strong> ${mockBillData.billNumber}</p>
                <p><strong>Bill Date:</strong> ${mockBillData.billDate}</p>
                <p><strong>Due Date:</strong> ${mockBillData.dueDate}</p>
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> ${customer?.name}</p>
                <p><strong>Mobile:</strong> ${customer?.msisdn}</p>
                <h2>Bill Details</h2>
                <table>
                  <tr><td>Monthly Plan Charges</td><td>₹${mockBillData.planCharges}</td></tr>
                  <tr><td>Extra Usage Charges</td><td>₹${mockBillData.extraUsage}</td></tr>
                  <tr><td>Taxes & Fees</td><td>₹${mockBillData.taxes}</td></tr>
                  <tr><th>Total Amount</th><th>₹${mockBillData.total}</th></tr>
                </table>
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
        }
        setNotification({ open: true, message: "Bill sent to printer successfully!" })
        break
    }

    setTimeout(() => onClose(), 1500)
  }

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" })
  }

  const billTypes = [
    { value: "current", label: "Current Month Bill", description: "Generate bill for current billing cycle" },
    { value: "previous", label: "Previous Month Bill", description: "Generate bill for previous month" },
    { value: "custom", label: "Custom Period", description: "Generate bill for specific date range" },
    { value: "annual", label: "Annual Statement", description: "Generate yearly billing statement" },
  ]

  const mockBillData = {
    billNumber: "BILL-2024-001234",
    billDate: "2024-01-15",
    dueDate: "2024-02-15",
    billingPeriod: "15 Dec 2023 - 14 Jan 2024",
    planCharges: 999,
    extraUsage: 200,
    taxes: 180,
    total: 1379,
    previousBalance: 0,
    payments: 0,
    adjustments: 0,
    amountDue: 1379,
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
          <BillIcon sx={{ color: "#F8D582" }} />
          Generate Bill
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Bill Type Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Select Bill Type
              </Typography>
              <Grid container justifyContent={"center"} spacing={2}>
                {billTypes.map((type) => (
                  <Grid sx={{ width: 400 }} item xs={12} sm={6} key={type.value}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        border:
                          billOptions.billType === type.value
                            ? `2px solid #F8D582`
                            : `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                          borderColor: "#F8D582",
                          transform: "translateY(-2px)",
                        },
                      }}
                      onClick={() => handleOptionChange("billType", type.value)}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {type.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {type.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Format and Delivery Options */}
            <Grid item sx={{ width: 250 }} xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Bill Format</InputLabel>
                <Select
                  value={billOptions.format}
                  onChange={(e) => handleOptionChange("format", e.target.value)}
                  label="Bill Format"
                  disabled
                >
                  <MenuItem value="pdf">PDF Document (Only)</MenuItem>
                </Select>
                <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
                  Bills are generated in PDF format only
                </Typography>
              </FormControl>
            </Grid>

            <Grid item sx={{ width: 250 }} xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Delivery Method</InputLabel>
                <Select
                  value={billOptions.deliveryMethod}
                  onChange={(e) => handleOptionChange("deliveryMethod", e.target.value)}
                  label="Delivery Method"
                >
                  <MenuItem value="download">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DownloadIcon sx={{ fontSize: "1rem" }} />
                      Download
                    </Box>
                  </MenuItem>
                  <MenuItem value="email">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon sx={{ fontSize: "1rem" }} />
                      Email
                    </Box>
                  </MenuItem>
                  <MenuItem value="sms">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SmsIcon sx={{ fontSize: "1rem" }} />
                      SMS Link
                    </Box>
                  </MenuItem>
                  <MenuItem value="print">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PrintIcon sx={{ fontSize: "1rem" }} />
                      Print
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Bill Preview */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Bill Preview
              </Typography>

              <Paper sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                {/* Bill Header */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Telecom Bill
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Bill Number:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {mockBillData.billNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Bill Date:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {mockBillData.billDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Due Date:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {mockBillData.dueDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Billing Period:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {mockBillData.billingPeriod}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Customer Information */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Customer Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Name:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {customer?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Mobile Number:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {customer?.msisdn}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Customer ID:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {customer?.id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Plan:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {customer?.currentPack?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Bill Details */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          Amount (₹)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Monthly Plan Charges</TableCell>
                        <TableCell align="right">₹{mockBillData.planCharges}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Extra Usage Charges</TableCell>
                        <TableCell align="right">₹{mockBillData.extraUsage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taxes & Fees</TableCell>
                        <TableCell align="right">₹{mockBillData.taxes}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Total Amount</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#F8D582" }}>
                          ₹{mockBillData.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Delivery Information */}
            {billOptions.deliveryMethod === "email" && (
              <Grid item xs={12}>
                <Alert severity="info">Bill will be sent to: {customer?.email || "customer@example.com"}</Alert>
              </Grid>
            )}

            {billOptions.deliveryMethod === "sms" && (
              <Grid item xs={12}>
                <Alert severity="info">Download link will be sent to: {customer?.msisdn}</Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleGenerateBill}
            sx={{
              bgcolor: "#F8D582",
              color: "#000",
              "&:hover": { bgcolor: "#E6C474" },
            }}
          >
            Generate Bill
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default GenerateBillComponent
