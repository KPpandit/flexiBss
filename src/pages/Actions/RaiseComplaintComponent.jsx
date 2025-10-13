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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material"
import {
  ReportProblem as ComplaintIcon,
  Close as CloseIcon,
  Phone as CallIcon,
  Wifi as NetworkIcon,
  Receipt as BillIcon,
  Support as SupportIcon,
} from "@mui/icons-material"

const RaiseComplaintComponent = ({ open, onClose, customer }) => {
  const theme = useTheme()
  const [notification, setNotification] = useState({ open: false, message: "" })
  const [complaintData, setComplaintData] = useState({
    category: "",
    priority: "Medium",
    subject: "",
    description: "",
    contactPreference: "phone",
  })

  const complaintCategories = [
    {
      id: "network",
      name: "Network Issues",
      icon: <NetworkIcon sx={{ color: "#F8D582" }} />,
      description: "Poor signal, call drops, data connectivity issues",
    },
    {
      id: "billing",
      name: "Billing & Charges",
      icon: <BillIcon sx={{ color: "#F8D582" }} />,
      description: "Incorrect charges, billing disputes, payment issues",
    },
    {
      id: "service",
      name: "Service Quality",
      icon: <CallIcon sx={{ color: "#F8D582" }} />,
      description: "Call quality, SMS delivery, data speed issues",
    },
    {
      id: "support",
      name: "Customer Support",
      icon: <SupportIcon sx={{ color: "#F8D582" }} />,
      description: "Staff behavior, response time, service quality",
    },
  ]

  const handleInputChange = (field, value) => {
    setComplaintData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting complaint:", { complaintData, customer })

    const ticketNumber = `CMPL-${Date.now().toString().slice(-8)}`
    const categoryName = complaintCategories.find((c) => c.id === complaintData.category)?.name || "General"

    setNotification({
      open: true,
      message: `Complaint saved successfully! Ticket #${ticketNumber} created for ${categoryName}.`,
    })

    setTimeout(() => {
      onClose()
      setComplaintData({
        category: "",
        priority: "Medium",
        subject: "",
        description: "",
        contactPreference: "phone",
      })
    }, 1500)
  }

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return theme.palette.error.main
      case "Medium":
        return theme.palette.warning.main
      case "Low":
        return theme.palette.success.main
      default:
        return theme.palette.grey[500]
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
          <ComplaintIcon sx={{ color: "#F8D582" }} />
          Raise a Complaint
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            We take your concerns seriously. Please provide detailed information to help us resolve your issue quickly.
          </Alert>

          <Grid container spacing={3}>
            {/* Complaint Category Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Select Complaint Category
              </Typography>
              <Grid container justifyContent={"center"} spacing={3}>
                {complaintCategories.map((category) => (
                  <Grid sx={{ width: 400 }} item xs={12} sm={6} md={3} key={category.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        border:
                          complaintData.category === category.id
                            ? `2px solid #F8D582`
                            : `1px solid ${theme.palette.divider}`,
                        height: "160px",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        "&:hover": {
                          borderColor: "#F8D582",
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[4],
                        },
                      }}
                      onClick={() => handleInputChange("category", category.id)}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                          {category.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 1 }}>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                          {category.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Priority Selection */}
            <Grid item sx={{ width: 250 }} xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: "100%" }}>
                <InputLabel>Priority Level</InputLabel>
                <Select
                  value={complaintData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  label="Priority Level"
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="Low">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: theme.palette.success.main }} />
                      Low Priority
                    </Box>
                  </MenuItem>
                  <MenuItem value="Medium">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: theme.palette.warning.main }} />
                      Medium Priority
                    </Box>
                  </MenuItem>
                  <MenuItem value="High">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: theme.palette.error.main }} />
                      High Priority
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Preference */}
            <Grid item sx={{ width: 250 }} xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: "100%" }}>
                <InputLabel>Preferred Contact Method</InputLabel>
                <Select
                  value={complaintData.contactPreference}
                  onChange={(e) => handleInputChange("contactPreference", e.target.value)}
                  label="Preferred Contact Method"
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Subject */}
            <Grid item sx={{ width: 250 }} xs={12}>
              <TextField
                fullWidth
                label="Complaint Subject"
                value={complaintData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief description of your issue"
                required
                sx={{ width: "100%" }}
              />
            </Grid>

            {/* Description */}
            <Grid item sx={{ width: 800 }} xs={12}>
              <TextField
                fullWidth
                label="Detailed Description"
                multiline
                rows={4}
                value={complaintData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Please provide detailed information about your complaint, including when it occurred, what happened, and any steps you've already taken..."
                required
                sx={{ width: "100%" }}
              />
            </Grid>

            {/* Customer Information Summary */}
            <Grid sx={{ width: 800 }} item xs={12}>
              <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Customer Information
                  </Typography>
                  <Grid container spacing={10}>
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
                        Plan Type:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {customer?.customerType}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!complaintData.category || !complaintData.subject || !complaintData.description}
            sx={{
              bgcolor: "#F8D582",
              color: "#000",
              "&:hover": { bgcolor: "#E6C474" },
              "&:disabled": { bgcolor: theme.palette.action.disabledBackground },
            }}
          >
            Submit Complaint
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

export default RaiseComplaintComponent
