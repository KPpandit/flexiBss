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
  Alert,
  useTheme,
  Snackbar,
} from "@mui/material"
import {
  SwapHoriz as SwapIcon,
  PhoneAndroid as PhoneIcon,
  SimCard as SimCardIcon,
  Warning as WarningIcon,
  Undo as ReturnIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

const SimSwapComponent = ({ open, onClose, customer }) => {
  const theme = useTheme()
  const [notification, setNotification] = useState({ open: false, message: "" })
  const [selectedOption, setSelectedOption] = useState(null)
  const [formData, setFormData] = useState({
    reason: "",
    newSimType: "",
    customerType: "",
    reportNumber: "",
    returnReason: "",
  })

  const swapOptions = [
    {
      id: "physical-esim",
      title: "Physical ↔ eSIM",
      description: "Convert between Physical SIM and eSIM",
      icon: <SwapIcon sx={{ fontSize: "2rem", color: "#F8D582" }} />,
      color: "#F8D582",
    },
    {
      id: "prepaid-postpaid",
      title: "Prepaid ↔ Postpaid",
      description: "Switch between Prepaid and Postpaid plans",
      icon: <PhoneIcon sx={{ fontSize: "2rem", color: "#F8D582" }} />,
      color: "#F8D582",
    },
    {
      id: "sim-stolen",
      title: "SIM Stolen",
      description: "Report stolen SIM and request replacement",
      icon: <WarningIcon sx={{ fontSize: "2rem", color: "#F8D582" }} />,
      color: "#F8D582",
    },
    {
      id: "sim-return",
      title: "SIM Return",
      description: "Return SIM and close connection",
      icon: <ReturnIcon sx={{ fontSize: "2rem", color: "#F8D582" }} />,
      color: "#F8D582",
    },
  ]

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting SIM swap request:", { selectedOption, formData, customer })

    let successMessage = ""
    switch (selectedOption.id) {
      case "physical-esim":
        successMessage = `SIM conversion to ${formData.newSimType === "physical" ? "Physical SIM" : "eSIM"} completed successfully!`
        break
      case "prepaid-postpaid":
        successMessage = `Conversion to ${formData.customerType === "prepaid" ? "Prepaid" : "Postpaid"} completed successfully!`
        break
      case "sim-stolen":
        successMessage = "Stolen SIM reported successfully! Replacement SIM will be issued."
        break
      case "sim-return":
        successMessage = "SIM return request processed successfully!"
        break
      default:
        successMessage = "SIM operation completed successfully!"
    }

    setNotification({ open: true, message: successMessage })
    setTimeout(() => {
      onClose()
      setSelectedOption(null)
      setFormData({
        reason: "",
        newSimType: "",
        customerType: "",
        reportNumber: "",
        returnReason: "",
      })
    }, 1500)
  }

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" })
  }

  const renderForm = () => {
    if (!selectedOption) return null

    switch (selectedOption.id) {
      case "physical-esim":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Physical ↔ eSIM Conversion
            </Typography>
            <Grid container spacing={3}>
              <Grid item sx={{ width: 300 }} xs={12}>
                <FormControl fullWidth sx={{ minWidth: "100%" }}>
                  <InputLabel>Convert To</InputLabel>
                  <Select
                    value={formData.newSimType}
                    onChange={(e) => handleInputChange("newSimType", e.target.value)}
                    label="Convert To"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="physical">Physical SIM</MenuItem>
                    <MenuItem value="esim">eSIM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ width: 500 }}>
                <TextField
                  fullWidth
                  label="Reason for Conversion"
                  multiline
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        )

      case "prepaid-postpaid":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Prepaid ↔ Postpaid Conversion
            </Typography>
            <Grid container spacing={3}>
              <Grid item sx={{ width: 300 }} xs={12}>
                <FormControl fullWidth sx={{ minWidth: "100%" }}>
                  <InputLabel>Convert To</InputLabel>
                  <Select
                    value={formData.customerType}
                    onChange={(e) => handleInputChange("customerType", e.target.value)}
                    label="Convert To"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="prepaid">Prepaid</MenuItem>
                    <MenuItem value="postpaid">Postpaid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ width: 500 }} xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Conversion"
                  multiline
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        )

      case "sim-stolen":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Report Stolen SIM
            </Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Please file a police report before proceeding with SIM replacement.
            </Alert>
            <Grid container spacing={3}>
              <Grid item sx={{ width: 300 }} xs={12}>
                <TextField
                  fullWidth
                  label="Police Report Number"
                  value={formData.reportNumber}
                  onChange={(e) => handleInputChange("reportNumber", e.target.value)}
                  required
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item sx={{ width: 500 }} xs={12}>
                <TextField
                  fullWidth
                  label="Incident Details"
                  multiline
                  rows={4}
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Please describe when and how the SIM was stolen..."
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        )

      case "sim-return":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              SIM Return & Connection Closure
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              This action will permanently close your connection. All pending bills must be cleared.
            </Alert>
            <Grid container spacing={3}>
              <Grid item sx={{ width: 300 }} xs={12}>
                <FormControl fullWidth sx={{ minWidth: "100%" }}>
                  <InputLabel>Reason for Return</InputLabel>
                  <Select
                    value={formData.returnReason}
                    onChange={(e) => handleInputChange("returnReason", e.target.value)}
                    label="Reason for Return"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="relocation">Relocation</MenuItem>
                    <MenuItem value="service-issues">Service Issues</MenuItem>
                    <MenuItem value="financial">Financial Reasons</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ width: 500 }} xs={12}>
                <TextField
                  fullWidth
                  label="Additional Comments"
                  multiline
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
          <SimCardIcon sx={{ color: "#F8D582" }} />
          SIM Conversion Services
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          {!selectedOption ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                Choose the type of SIM service you need:
              </Typography>

              <Grid container spacing={3} justifyContent={"center"}>
                {swapOptions.map((option) => (
                  <Grid sx={{ width: 400 }} item xs={12} sm={6} md={3} key={option.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        border: `2px solid ${theme.palette.divider}`,
                        height: "220px",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: theme.shadows[8],
                          borderColor: "#F8D582",
                        },
                      }}
                      onClick={() => handleOptionSelect(option)}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          textAlign: "center",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ mb: 2 }}>{option.icon}</Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem" }}>
                          {option.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.9rem", textAlign: "center" }}
                        >
                          {option.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box>
              <Button
                startIcon={<SwapIcon />}
                onClick={() => setSelectedOption(null)}
                sx={{ mb: 3, color: theme.palette.text.secondary }}
              >
                Back to Options
              </Button>

              <Card
                sx={{ p: 3, bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  {selectedOption.icon}
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {selectedOption.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {selectedOption.description}
                </Typography>

                {renderForm()}
              </Card>
            </Box>
          )}
        </DialogContent>

        {selectedOption && (
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setSelectedOption(null)} color="inherit">
              Back
            </Button>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#F8D582",
                color: "#000",
                "&:hover": { bgcolor: "#E6C474" },
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        )}
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

export default SimSwapComponent
