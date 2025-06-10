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
  IconButton,
} from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"

export default function BatchCampaign() {
  const [formData, setFormData] = useState({
    msisdns: [""],
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

  const handleMsisdnChange = (index, value) => {
    const newMsisdns = [...formData.msisdns]
    newMsisdns[index] = value
    setFormData((prev) => ({
      ...prev,
      msisdns: newMsisdns,
    }))
  }

  const addMsisdnField = () => {
    setFormData((prev) => ({
      ...prev,
      msisdns: [...prev.msisdns, ""],
    }))
  }

  const removeMsisdnField = (index) => {
    if (formData.msisdns.length > 1) {
      const newMsisdns = formData.msisdns.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        msisdns: newMsisdns,
      }))
    }
  }

  const handleBulkMsisdnInput = (e) => {
    const text = e.target.value
    const msisdns = text
      .split(/[,\n]/)
      .map((m) => m.trim())
      .filter((m) => m)
    setFormData((prev) => ({
      ...prev,
      msisdns: msisdns.length > 0 ? msisdns : [""],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validMsisdns = formData.msisdns.filter((m) => m.trim())
    console.log("Batch Campaign Data:", { ...formData, msisdns: validMsisdns })
    setNotification({
      open: true,
      message: `Batch campaign sent to ${validMsisdns.length} recipients!`,
      severity: "success",
    })

    setFormData({
      msisdns: [""],
      messageText: "",
      isFlash: false,
      senderId: "",
    })
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  const validMsisdns = formData.msisdns.filter((m) => m.trim())

  return (
    <Box>
      <Typography variant="h6" component="h3" gutterBottom>
        Batch Campaign
      </Typography>

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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle1">Recipients: {validMsisdns.length}</Typography>
                <Chip label={`${validMsisdns.length} numbers`} size="small" color="primary" variant="outlined" />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Phone Numbers (MSISDNs)
              </Typography>

              {/* Individual MSISDN inputs */}
              {formData.msisdns.map((msisdn, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter phone number"
                    value={msisdn}
                    onChange={(e) => handleMsisdnChange(index, e.target.value)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeMsisdnField(index)}
                    disabled={formData.msisdns.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={addMsisdnField}
                variant="outlined"
                size="small"
                sx={{ mt: 1, mb: 2 }}
              >
                Add Another Number
              </Button>

              {/* Bulk input option */}
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                Or paste multiple numbers (comma or line separated):
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter multiple phone numbers separated by commas or new lines"
                onChange={handleBulkMsisdnInput}
                helperText="Example: 1234567890, 0987654321 or one number per line"
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
                placeholder="Enter your batch message here..."
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
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    setFormData({
                      msisdns: [""],
                      messageText: "",
                      isFlash: false,
                      senderId: "",
                    })
                  }
                >
                  Reset
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={validMsisdns.length === 0}>
                  Send to {validMsisdns.length} Recipients
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
