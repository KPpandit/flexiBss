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
} from "@mui/material"

export default function SingleCampaign() {
  const [formData, setFormData] = useState({
    msisdn: "",
    messageText: "",
    isFlash: false,
    senderId: "",
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
    // Here you would typically send the data to your API
    console.log("Single Campaign Data:", formData)
    setNotification({
      open: true,
      message: "Single campaign sent successfully!",
      severity: "success",
    })

    // Reset form
    setFormData({
      msisdn: "",
      messageText: "",
      isFlash: false,
      senderId: "",
    })
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  return (
    <Box>
      <Typography variant="h6" component="h3" gutterBottom>
        Single Campaign
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="MSISDN"
                name="msisdn"
                value={formData.msisdn}
                onChange={handleInputChange}
                required
                placeholder="Enter phone number"
                helperText="Enter the recipient's phone number"
              />
            </Grid>

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
                placeholder="Enter your message here..."
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
                Flash messages appear directly on the recipient's screen
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    setFormData({
                      msisdn: "",
                      messageText: "",
                      isFlash: false,
                      senderId: "",
                    })
                  }
                >
                  Reset
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Send SMS
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
