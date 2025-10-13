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
  Chip,
  Divider,
  useTheme,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  Upgrade as UpgradeIcon,
  Close as CloseIcon,
  DataUsage as DataIcon,
  Call as CallIcon,
  Sms as SmsIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material"

const PlanUpgradeComponent = ({ open, onClose, customer, onCustomerUpdate, onPlanUpgradeNotification }) => {
  const theme = useTheme()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [notification, setNotification] = useState({ open: false, message: "" })

  const availablePlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 199,
      data: "10GB",
      validity: 30,
      calls: "Unlimited",
      sms: "100/day",
      features: ["4G Speed", "National Roaming", "Basic Support"],
      recommended: false,
      color: theme.palette.grey[600],
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: 399,
      data: "25GB",
      validity: 30,
      calls: "Unlimited",
      sms: "Unlimited",
      features: ["4G Speed", "National Roaming", "Priority Support", "OTT Benefits"],
      recommended: false,
      color: theme.palette.primary.main,
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 599,
      data: "50GB",
      validity: 30,
      calls: "Unlimited",
      sms: "Unlimited",
      features: ["5G Speed", "International Roaming", "24/7 Support", "Premium OTT", "Data Rollover"],
      recommended: true,
      color: "#F8D582",
    },
    {
      id: "unlimited",
      name: "Unlimited Plan",
      price: 999,
      data: "Unlimited",
      validity: 30,
      calls: "Unlimited",
      sms: "Unlimited",
      features: ["5G Speed", "International Roaming", "VIP Support", "All OTT Apps", "Data Rollover", "Hotspot"],
      recommended: false,
      color: "#FF6B6B",
    },
  ]

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
  }

  const handleUpgrade = () => {
    if (selectedPlan && onCustomerUpdate) {
      const updatedCustomer = {
        ...customer,
        currentPack: {
          name: selectedPlan.name,
          price: selectedPlan.price,
          validity: selectedPlan.validity,
          activationDate: new Date(),
          expirationDate: new Date(Date.now() + selectedPlan.validity * 24 * 60 * 60 * 1000),
        },
        planUpgradeHistory: [
          ...(customer.planUpgradeHistory || []),
          {
            date: new Date(),
            fromPlan: customer.currentPack?.name || "Basic Plan",
            toPlan: selectedPlan.name,
            amount: selectedPlan.price,
            status: "Success",
          },
        ],
      }

      onCustomerUpdate(updatedCustomer)

      const successMessage = `Plan upgraded successfully to ${selectedPlan.name} for ${customer.name}!`
      setNotification({ open: true, message: successMessage })

      if (onPlanUpgradeNotification) {
        onPlanUpgradeNotification(successMessage)
      }

      setTimeout(() => {
        onClose()
      }, 1000)
    }
  }

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2, fontSize: "1rem" }}>
          <UpgradeIcon sx={{ color: "#F8D582" }} />
          Plan Upgrade Options
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: "1rem" }}>
              Current Plan: {customer?.currentPack?.name || "Basic Plan"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
              Choose a new plan to upgrade your services and get better benefits
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {availablePlans.map((plan) => (
              <Grid item xs={12} md={6} lg={3} key={plan.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: selectedPlan?.id === plan.id ? `3px solid #F8D582` : `2px solid ${theme.palette.divider}`,
                    position: "relative",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                      borderColor: "#F8D582",
                    },
                  }}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.recommended && (
                    <Chip
                      label="Recommended"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -2,
                        right: 16,
                        bgcolor: "#F8D582",
                        color: "#000",
                        fontWeight: 600,
                        zIndex: 1,
                        fontSize: "1rem",
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: "1rem" }}>
                        {plan.name}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: plan.color, mb: 1, fontSize: "1rem" }}>
                        ${plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                        Valid for {plan.validity} days
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3, flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <DataIcon sx={{ color: plan.color, fontSize: "1.2rem" }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                          {plan.data} Data
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <CallIcon sx={{ color: plan.color, fontSize: "1.2rem" }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                          {plan.calls} Calls
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <SmsIcon sx={{ color: plan.color, fontSize: "1.2rem" }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                          {plan.sms} SMS
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary, fontSize: "1rem" }}
                      >
                        Features:
                      </Typography>

                      {plan.features.map((feature, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <CheckIcon sx={{ color: plan.color, fontSize: "1rem" }} />
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      variant={selectedPlan?.id === plan.id ? "contained" : "outlined"}
                      fullWidth
                      sx={{
                        mt: "auto",
                        bgcolor: selectedPlan?.id === plan.id ? "#F8D582" : "transparent",
                        color: selectedPlan?.id === plan.id ? "#000" : theme.palette.text.primary,
                        borderColor: plan.color,
                        fontSize: "1rem",
                        "&:hover": {
                          bgcolor: selectedPlan?.id === plan.id ? "#E6C474" : "rgba(248, 213, 130, 0.1)",
                        },
                      }}
                    >
                      {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {selectedPlan && (
            <Paper sx={{ mt: 4, p: 3, bgcolor: theme.palette.background.paper, border: `1px solid #F8D582` }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#F8D582", fontSize: "1rem" }}>
                Upgrade Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                    Current Plan:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                    {customer?.currentPack?.name || "Basic Plan"} - ${customer?.currentPack?.price || "199"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                    New Plan:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                    {selectedPlan.name} - ${selectedPlan.price}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit" sx={{ fontSize: "1rem" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpgrade}
            disabled={!selectedPlan}
            sx={{
              bgcolor: "#F8D582",
              color: "#000",
              fontSize: "1rem",
              "&:hover": { bgcolor: "#E6C474" },
              "&:disabled": { bgcolor: theme.palette.action.disabledBackground },
            }}
          >
            Upgrade Plan
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

export default PlanUpgradeComponent
