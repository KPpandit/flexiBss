"use client"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  LinearProgress,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  Info as InfoIcon,
  Description as DocsIcon,
  Fingerprint as BiometricIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"

const CustomerCycleComponent = ({ open, onClose, customer }) => {
  const theme = useTheme()

  if (!customer) return null

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  const lifecycleEvents = [
    {
      id: "onboarding",
      title: "Onboarding",
      date: formatDate(customer.registrationDate),
      color: "#4caf50",
      status: "completed",
    },
    {
      id: "esvc",
      title: "Ekyc",
      date: formatDate(customer.eKycDate),
      color: "#9c27b0",
      status: "completed",
    },
    {
      id: "docs",
      title: "Docs",
      date: formatDate(customer.simDetails?.allocationDate),
      color: "#00bcd4",
      status: "completed",
    },
    {
      id: "biometric",
      title: "Biometric",
      date: formatDate(customer.eKycDate),
      color: "#4caf50",
      status: "completed",
    },
  ]

  // Calculate docs completeness percentage
  const docsCompleteness = customer.eKycStatus === "Verified" ? 100 : customer.eKycStatus === "Pending" ? 40 : 0

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#1a1a1a",
          color: "white",
          minHeight: "80vh",
        },
      }}
    >
      <DialogContent sx={{ p: 0, bgcolor: "#1a1a1a", color: "white" }}>
        {/* Header Section */}
        <Box
          sx={{
            bgcolor: "#2d2d2d",
            p: 3,
            borderBottom: "1px solid #404040",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 0.5 }}>
              {customer.name} ({customer.msisdn})
            </Typography>
            <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
              ID: {customer.id} • {customer.customerType.toUpperCase()} •{" "}
              {customer.address?.split(",").pop()?.trim() || "Maharashtra"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label={`Status: ${customer.status}`}
              sx={{
                bgcolor: customer.status === "Active" ? "#1b5e20" : "#d32f2f",
                color: "white",
                fontSize: "0.75rem",
                height: 28,
              }}
            />
            <Chip
              label={`Channel: ${customer.serviceType}`}
              sx={{
                bgcolor: "#1565c0",
                color: "white",
                fontSize: "0.75rem",
                height: 28,
              }}
            />
            <Chip
              label={`eKYC: ${customer.eKycStatus}`}
              sx={{
                bgcolor:
                  customer.eKycStatus === "Verified"
                    ? "#1b5e20"
                    : customer.eKycStatus === "Pending"
                      ? "#f57c00"
                      : "#d32f2f",
                color: "white",
                fontSize: "0.75rem",
                height: 28,
              }}
            />
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Status Cards Section */}
        <Box sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item sx={{ width: 250 }} xs={12} md={3}>
              <Card
                sx={{
                  bgcolor: "#2d2d2d",
                  border: "1px solid #404040",
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                      eKYC Method
                    </Typography>
                    <InfoIcon sx={{ color: "#b0b0b0", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
                    {customer.eKycToken ? "Video KYC" : "Pending"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sx={{ width: 250 }} xs={12} md={3}>
              <Card
                sx={{
                  bgcolor: "#2d2d2d",
                  border: "1px solid #404040",
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                      Docs Completeness
                    </Typography>
                    <DocsIcon sx={{ color: "#b0b0b0", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                    {docsCompleteness}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={docsCompleteness}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "#404040",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#4caf50",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item sx={{ width: 250 }} xs={12} md={3}>
              <Card
                sx={{
                  bgcolor: "#2d2d2d",
                  border: "1px solid #404040",
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                      Biometric
                    </Typography>
                    <BiometricIcon sx={{ color: "#b0b0b0", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
                    {customer.eKycStatus === "Verified" ? "Captured" : "Pending"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sx={{ width: 250 }} xs={12} md={3}>
              <Card
                sx={{
                  bgcolor: "#2d2d2d",
                  border: "1px solid #404040",
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                      Last Pack
                    </Typography>
                    <SettingsIcon sx={{ color: "#b0b0b0", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
                    {customer.currentPack?.name || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ bgcolor: "#2d2d2d", border: "1px solid #404040" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                Lifecycle Timeline
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 4 }}>
                Each dot is an event.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4, pl: 2 }}>
                {lifecycleEvents.map((event, index) => (
                  <Box key={event.id} sx={{ display: "flex", alignItems: "flex-start", gap: 3, position: "relative" }}>
                    {/* Vertical Line */}
                    {index < lifecycleEvents.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: "11px",
                          top: "24px",
                          width: "2px",
                          height: "calc(100% + 32px)",
                          bgcolor: "#404040",
                        }}
                      />
                    )}

                    {/* Event Dot */}
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: event.color,
                        border: "3px solid #2d2d2d",
                        flexShrink: 0,
                        zIndex: 2,
                      }}
                    />

                    {/* Event Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                        {event.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Timeline Legend */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid #404040",
                }}
              >
                {lifecycleEvents.map((event) => (
                  <Box key={event.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: event.color,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                      {event.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerCycleComponent
