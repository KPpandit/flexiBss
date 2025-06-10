"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Card,
  CardHeader,
  CardContent,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  SimCard as SimCardIcon,
  Security as SecurityIcon,
  AttachMoney as PriceIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const SimDetails = ({ open, onClose, sim }) => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  if (!sim) return null

  const formatDate = (date) => {
    if (!date) return "N/A"
    try {
      return typeof date === "string" ? date : format(date, "dd-MMM-yyyy HH:mm:ss")
    } catch (error) {
      return "Invalid Date"
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">SIM Details</Typography>
            <Chip label={sim.msisdn} color="primary" size="small" sx={{ fontWeight: 600, ml: 1 }} />
            <Chip
              label={sim.category}
              color={sim.category === "VIP" ? "warning" : sim.category === "PREMIUM" ? "secondary" : "default"}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<InfoIcon sx={{ mr: 1 }} />} iconPosition="start" label="Basic Info" />
          <Tab icon={<SecurityIcon sx={{ mr: 1 }} />} iconPosition="start" label="Security" />
          <Tab icon={<PriceIcon sx={{ mr: 1 }} />} iconPosition="start" label="Pricing" />
        </Tabs>

        {/* Basic Information Tab */}
        {activeTab === 0 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SimCardIcon color="primary" />
                  <Typography variant="h6">Basic Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      SIM Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.id}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          MSISDN
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.msisdn}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          IMSI
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.imsi}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          PIMSI
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.pimsi}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          SIM Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.simType}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          ICC ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.iccId}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Status & Batch Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          {sim.status ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                          ) : (
                            <CancelIcon fontSize="small" color="error" />
                          )}
                          <Typography variant="body1" fontWeight={600}>
                            {sim.status ? "Active" : "Inactive"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Provisioning Status
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          {sim.provStatus ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                          ) : (
                            <CancelIcon fontSize="small" color="error" />
                          )}
                          <Typography variant="body1" fontWeight={600}>
                            {sim.provStatus ? "Provisioned" : "Not Provisioned"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Batch ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {sim.batchId}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Batch Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(sim.batchDate)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Allocation Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(sim.allocationDate)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Activation Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(sim.activationDate)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Security Information Tab */}
        {activeTab === 1 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SecurityIcon color="primary" />
                  <Typography variant="h6">Security Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      KI (Authentication Key)
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5, fontFamily: "monospace" }}>
                      {sim.ki}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      OPC (Operator Code)
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5, fontFamily: "monospace" }}>
                      {sim.opc}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Activation Code
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {sim.activationCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Activation Token
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {sim.activationToken}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Activation Status
                    </Typography>
                    <Chip
                      label={sim.activationStatus}
                      color={
                        sim.activationStatus === "Active"
                          ? "success"
                          : sim.activationStatus === "Pending"
                            ? "warning"
                            : "error"
                      }
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}

        {/* Pricing Information Tab */}
        {activeTab === 2 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PriceIcon color="primary" />
                  <Typography variant="h6">Pricing Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Buying Price (USD)
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="error.main" sx={{ mt: 0.5 }}>
                      ${sim.buyingPriceUsd}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Selling Price (USD)
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 0.5 }}>
                      ${sim.sellingPriceUsd}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      VAT
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {sim.vat}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Other Taxes
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      ${sim.otherTaxes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Min Commission
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      ${sim.minCommision}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Max Commission
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      ${sim.maxCommision}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Average Commission
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      ${sim.avgCommision}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Partner ID
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {sim.partnerId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Validity Days
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {sim.validityDays} days
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SimDetails
