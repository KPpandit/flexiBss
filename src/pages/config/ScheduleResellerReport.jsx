"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import { Add, Delete, Save, Store } from "@mui/icons-material"

export default function ScheduleResellerReport() {
  const [enabled, setEnabled] = useState(true)
  const [scheduleTime, setScheduleTime] = useState("12:00")
  const [frequency, setFrequency] = useState("daily")
  const [recipients, setRecipients] = useState(["reseller@company.com", "partners@company.com"])
  const [newRecipient, setNewRecipient] = useState("")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleAddRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient])
      setNewRecipient("")
    }
  }

  const handleDeleteRecipient = (email) => {
    setRecipients(recipients.filter((r) => r !== email))
  }

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Reseller Report schedule configuration saved successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Store sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Schedule Reseller Report
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid sx={{width:'49%'}} item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Schedule Configuration
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable Reseller Report"
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Schedule Time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Frequency</InputLabel>
                <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} label="Frequency">
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Report Format</InputLabel>
                <Select value={reportFormat} onChange={(e) => setReportFormat(e.target.value)} label="Report Format">
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{width:'49%'}} item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Recipients Management
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Add Recipient Email"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddRecipient()}
                />
                <IconButton color="primary" onClick={handleAddRecipient}>
                  <Add />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {recipients.map((email) => (
                  <Chip
                    key={email}
                    label={email}
                    onDelete={() => handleDeleteRecipient(email)}
                    deleteIcon={<Delete />}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Partner Report Sections
              </Typography>
              <Grid container spacing={2}>
                {[
                  "Partner Sales",
                  "Commission Summary",
                  "Transaction History",
                  "Balance Status",
                  "Top Performers",
                  "Active Partners",
                  "Pending Settlements",
                  "Performance Metrics",
                ].map((section) => (
                  <Grid item xs={12} sm={6} md={4} key={section}>
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label={section} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
            <Button variant="contained" size="large" startIcon={<Save />} onClick={handleSave}>
              Save Configuration
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
