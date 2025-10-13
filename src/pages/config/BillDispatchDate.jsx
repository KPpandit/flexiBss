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
  Snackbar,
  Alert,
  Chip,
} from "@mui/material"
import { Save, Send, Info } from "@mui/icons-material"

export default function BillDispatchDate() {
  const [enabled, setEnabled] = useState(true)
  const [dispatchMethod, setDispatchMethod] = useState("email")
  const [dispatchDelay, setDispatchDelay] = useState("1")
  const [retryAttempts, setRetryAttempts] = useState("3")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Bill dispatch date configuration saved successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Send sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Bill Dispatch Date Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid sx={{width:'100%'}} item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Dispatch Settings
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable Automatic Bill Dispatch"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Primary Dispatch Method</InputLabel>
                <Select
                  value={dispatchMethod}
                  onChange={(e) => setDispatchMethod(e.target.value)}
                  label="Primary Dispatch Method"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="both">Email & SMS</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Dispatch Delay (days after generation)"
                type="number"
                value={dispatchDelay}
                onChange={(e) => setDispatchDelay(e.target.value)}
                sx={{ mb: 3 }}
                helperText="Days to wait after bill generation"
                inputProps={{ min: 0, max: 7 }}
              />

              <TextField
                fullWidth
                label="Retry Attempts"
                type="number"
                value={retryAttempts}
                onChange={(e) => setRetryAttempts(e.target.value)}
                sx={{ mb: 3 }}
                helperText="Number of retry attempts for failed dispatches"
              />

              <TextField
                fullWidth
                label="Dispatch Time"
                type="time"
                defaultValue="09:00"
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
              />

              <Box
                sx={{
                  p: 2,
                  bgcolor: "info.main",
                  color: "info.contrastText",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <Info sx={{ mt: 0.5 }} />
                <Typography variant="body2">
                  Bills will be dispatched {dispatchDelay} day(s) after generation via {dispatchMethod}. Failed
                  dispatches will be retried {retryAttempts} times.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid  item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Dispatch Preferences
              </Typography>

              <Grid container spacing={2}>
                {[
                  "Send Email Notification",
                  "Send SMS Notification",
                  "Include Payment Link",
                  "Include PDF Attachment",
                  "Send Reminder Before Due Date",
                  "Send Overdue Notices",
                  "Log Dispatch History",
                  "Enable Batch Processing",
                ].map((pref) => (
                  <Grid item xs={12} key={pref}>
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label={pref} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{width:'100%'}} item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Dispatch Statistics
              </Typography>

              <Grid container spacing={3}>
                <Grid sx={{width:'20%'}} item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                      11,890
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bills Dispatched Today
                    </Typography>
                  </Box>
                </Grid>

                <Grid sx={{width:'20%'}} item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main", mb: 1 }}>
                      98.5%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Delivery Success Rate
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{width:'20%'}}  xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "warning.main", mb: 1 }}>
                      145
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Dispatches
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{width:'20%'}} xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "error.main", mb: 1 }}>
                      23
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Failed Dispatches
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="Last Dispatch: 5 minutes ago" color="success" />
                <Chip label="Next Batch: 55 minutes" color="primary" />
                <Chip label="Queue Status: Normal" color="success" />
              </Box>
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
