"use client"

import React from "react"
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
  Chip,
  LinearProgress,
  useTheme,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/material"
import {
  Close as CloseIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Verified as VerifiedIcon,
  Description as DocsIcon,
  Fingerprint as BiometricIcon,
  Payment as TransactionIcon,
  DataUsage as PackIcon,
  AccountBalanceWallet as RechargeIcon,
  Schedule as ExpiryIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material"

const CustomerCycleComponent = ({ open, onClose, customer }) => {
  const theme = useTheme()

  if (!customer) return null

  const lifecycleEvents = [
    {
      id: "onboarding",
      title: "Onboarding",
      date: "12/8/2025, 9:00 PM",
      status: "completed",
      icon: <PersonIcon />,
      description: "Customer registration initiated",
    },
    {
      id: "esvc",
      title: "Esvc",
      date: "12/8/2025, 9:15 PM",
      status: "completed",
      icon: <CheckIcon />,
      description: "Electronic service verification completed",
    },
    {
      id: "docs",
      title: "Docs",
      date: "14/8/2025, 2:30 PM",
      status: "completed",
      icon: <DocsIcon />,
      description: "Document verification process",
    },
    {
      id: "biometric",
      title: "Biometric",
      date: "15/8/2025, 4:46 AM",
      status: "completed",
      icon: <BiometricIcon />,
      description: "Biometric verification captured",
    },
    {
      id: "transaction",
      title: "Transaction",
      date: "16/8/2025, 11:20 AM",
      status: "completed",
      icon: <TransactionIcon />,
      description: "First transaction processed",
    },
    {
      id: "pack",
      title: "Pack",
      date: "16/8/2025, 11:25 AM",
      status: "completed",
      icon: <PackIcon />,
      description: "Plan activation completed",
    },
    {
      id: "recharge",
      title: "Recharge",
      date: "17/8/2025, 6:15 PM",
      status: "completed",
      icon: <RechargeIcon />,
      description: "Account recharged successfully",
    },
    {
      id: "expiry",
      title: "Expiry",
      date: "18/8/2025, 12:59 AM",
      status: "pending",
      icon: <ExpiryIcon />,
      description: "Plan expiry scheduled",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4caf50"
      case "pending":
        return "#ff9800"
      case "failed":
        return "#f44336"
      default:
        return "#9e9e9e"
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
        <HistoryIcon sx={{ color: "#F8D582" }} />
        Customer Lifecycle Dashboard
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {/* Customer Header */}
        <Card sx={{ mb: 4, bgcolor: theme.palette.background.paper }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {customer.name} (+91-{customer.msisdn?.slice(-10)})
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Status
                  </Typography>
                  <Chip label="Active" color="success" sx={{ fontWeight: 600 }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Channel
                  </Typography>
                  <Chip label="Digital App" variant="outlined" sx={{ fontWeight: 600 }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    eKYC
                  </Typography>
                  <Chip label="Pending" color="warning" sx={{ fontWeight: 600 }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ID: SUB-1002 • {customer.customerType} • Maharashtra
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Status Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <VerifiedIcon sx={{ fontSize: "2rem", color: "#F8D582", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  eKYC Method
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Video KYC
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <DocsIcon sx={{ fontSize: "2rem", color: "#F8D582", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Docs Completeness
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  40%
                </Typography>
                <LinearProgress variant="determinate" value={40} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <BiometricIcon sx={{ fontSize: "2rem", color: "#F8D582", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Biometric
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Captured
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <PackIcon sx={{ fontSize: "2rem", color: "#F8D582", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Last Pack
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  WP99
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Lifecycle Timeline */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Lifecycle Timeline
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Each dot is an event. Hover for details.
            </Typography>

            <Timeline position="alternate">
              {lifecycleEvents.map((event, index) => (
                <TimelineItem key={event.id}>
                  <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
                    {event.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: getStatusColor(event.status), p: 1 }}>
                      {React.cloneElement(event.icon, { sx: { color: "white", fontSize: "1.2rem" } })}
                    </TimelineDot>
                    {index < lifecycleEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>

            {/* Timeline Footer */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                {["Onboarding", "Esvc", "Docs", "Biometric", "Transaction", "Pack", "Recharge", "Expiry"].map(
                  (label, index) => (
                    <Typography key={label} variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                  ),
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#F8D582",
            color: "#000",
            "&:hover": { bgcolor: "#E6C474" },
          }}
        >
          Export Timeline
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerCycleComponent
