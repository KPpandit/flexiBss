"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Alert,
  Snackbar,
  Chip,
} from "@mui/material"

export default function BulkCampaign() {
  const [formData, setFormData] = useState({
    messageText: "",
    isFlash: false,
    senderId: "",
    targetAudience: "",
  })
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Bulk Campaign Data:", formData)
    setNotification({
      open: true,
      message: "Bulk campaign initiated successfully!",
      severity: "success",
    })

    setFormData({
      messageText: "",
      isFlash: false,
      senderId: "",
      targetAudience: "",
    })
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  return (
    <Box>
      <Typography variant="h6" component="h3" gutterBottom>
        Bulk Campaign
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Bulk campaigns are sent to all subscribers or a specific target audience. No individual MSISDN required.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sender ID"
                name="senderId"
                value={formData.senderId}
                onChange={handleInputChange}
                required
                placeholder="Enter sender ID"
                helperText="Enter the sender identification"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Target Audience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., All Subscribers, Prepaid Users, etc."
                helperText="Specify the target audience for this campaign"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message Text"
                name="messageText"
                value={formData.messageText}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                placeholder="Enter your bulk message here..."
                helperText={`${formData.messageText.length}/160 characters`}
                inputProps={{ maxLength: 160 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch checked={formData.isFlash} onChange={handleInputChange} name="isFlash" color="primary" />
                }
                label="Flash Message"
              />
              <Typography variant="caption" display="block" color="textSecondary">
                Flash messages appear directly on recipients' screens
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Campaign Summary:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip label={`Target: ${formData.targetAudience || "All Subscribers"}`} variant="outlined" />
                  <Chip label={formData.isFlash ? "Flash Message" : "Regular Message"} variant="outlined" />
                  <Chip label={`Characters: ${formData.messageText.length}/160`} variant="outlined" />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    setFormData({
                      messageText: "",
                      isFlash: false,
                      senderId: "",
                      targetAudience: "",
                    })
                  }
                >
                  Reset
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Send Bulk SMS
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
