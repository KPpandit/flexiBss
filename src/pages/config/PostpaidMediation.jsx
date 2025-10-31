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
import { Save, AccountBalance, Refresh } from "@mui/icons-material"

export default function PostpaidMediation() {
  const [enabled, setEnabled] = useState(true)
  const [mediationServer, setMediationServer] = useState("primary")
  const [processingInterval, setProcessingInterval] = useState("15")
  const [retryAttempts, setRetryAttempts] = useState("3")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Postpaid mediation configuration saved successfully!",
      severity: "success",
    })
  }

  const handleSync = () => {
    setSnackbar({
      open: true,
      message: "Mediation sync initiated successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AccountBalance sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Postpaid Mediation Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item sx={{width:'100%'}} xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Mediation Settings
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable Postpaid Mediation"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Mediation Server</InputLabel>
                <Select
                  value={mediationServer}
                  onChange={(e) => setMediationServer(e.target.value)}
                  label="Mediation Server"
                >
                  <MenuItem value="primary">Primary Server</MenuItem>
                  <MenuItem value="secondary">Secondary Server</MenuItem>
                </Select>
              </FormControl>

              <TextField fullWidth label="Server URL" defaultValue="https://mediation.telco.com:8443" sx={{ mb: 3 }} />

              <TextField
                fullWidth
                label="Processing Interval (minutes)"
                type="number"
                value={processingInterval}
                onChange={(e) => setProcessingInterval(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Retry Attempts"
                type="number"
                value={retryAttempts}
                onChange={(e) => setRetryAttempts(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button variant="outlined" fullWidth startIcon={<Refresh />} onClick={handleSync}>
                Sync Mediation Data
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item  sx={{width:'100%'}} xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                CDR Processing Rules
              </Typography>

              <Grid container spacing={2}>
                {[
                  "Voice Call Service",
                  "Data Usage Service",
                  "SMS Service",
                  "Roaming Service",
                  "VAS Service",
                  "International Service",
                  "Premium Service",
                ].map((rule) => (
                  <Grid item xs={12} key={rule}>
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label={rule} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sx={{width:'100%'}} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Mediation Status
              </Typography>

              <Grid container spacing={3}>
                <Grid sx={{width:'25%'}} item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                      15,234
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Records Processed
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{width:'25%'}} xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main", mb: 1 }}>
                      99.8%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Success Rate
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{width:'25%'}} xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "warning.main", mb: 1 }}>
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Records
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{width:'18%'}} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "error.main", mb: 1 }}>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Failed Records
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="Last Sync: 2 minutes ago" color="success" />
                <Chip label="Server Status: Online" color="success" />
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
