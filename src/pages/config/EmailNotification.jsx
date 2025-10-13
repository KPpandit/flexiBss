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
} from "@mui/material"
import { Save, Email, Send } from "@mui/icons-material"

export default function EmailNotification() {
  const [enabled, setEnabled] = useState(true)
  const [provider, setProvider] = useState("smtp")
  const [fromEmail, setFromEmail] = useState("noreply@telco.com")
  const [fromName, setFromName] = useState("Telco Services")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Email notification configuration saved successfully!",
      severity: "success",
    })
  }

  const handleTestEmail = () => {
    setSnackbar({
      open: true,
      message: "Test email sent successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Email sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Email Notification Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid sx={{width:'100%'}} item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Email Server Settings
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable Email Notifications"
                sx={{ mb: 3 }}
              />

             

              <TextField
                fullWidth
                label="From Email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="From Name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField fullWidth label="SMTP Host" defaultValue="smtp.gmail.com" sx={{ mb: 3 }} />

              <TextField fullWidth label="SMTP Port" defaultValue="587" type="number" sx={{ mb: 3 }} />

              <TextField fullWidth label="Username" defaultValue="admin@telco.com" sx={{ mb: 3 }} />

              <TextField fullWidth label="Password" type="password" defaultValue="••••••••••••" sx={{ mb: 3 }} />

              <Button variant="outlined" fullWidth startIcon={<Send />} onClick={handleTestEmail}>
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Notification Triggers
              </Typography>

              <Grid container spacing={2}>
                {[
                  "Welcome Email",
                  "Bill Generated",
                  "Payment Confirmation",
                  "Service Activation",
                  "Plan Change Confirmation",
                  "Password Reset",
                  "Account Verification",
                  "Monthly Statement",
                  "Promotional Offers",
                  "Service Alerts",
                ].map((trigger) => (
                  <Grid item xs={12} key={trigger}>
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label={trigger} />
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
                Email Templates
              </Typography>

              <Grid container spacing={3}>
                <Grid sx={{width:'49%'}} item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Welcome Email Template
                  </Typography>
                  <TextField fullWidth label="Subject" defaultValue="Welcome to Telco Services!" sx={{ mb: 2 }} />
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    defaultValue="Dear {name},\n\nWelcome to Telco Services! Your account has been successfully created.\n\nAccount Details:\nPhone: {phone}\nPlan: {plan}\n\nThank you for choosing us!\n\nBest regards,\nTelco Team"
                    helperText="Variables: {name}, {phone}, {plan}"
                  />
                </Grid>

                <Grid sx={{width:'49%'}} item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Bill Generated Template
                  </Typography>
                  <TextField
                    fullWidth
                    label="Subject"
                    defaultValue="Your Monthly Bill is Ready - {amount}"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    defaultValue="Dear {name},\n\nYour bill for {month} has been generated.\n\nAmount Due: {amount}\nDue Date: {dueDate}\n\nPlease pay before the due date to avoid service interruption.\n\nView Bill: {billLink}\n\nThank you,\nTelco Team"
                    helperText="Variables: {name}, {month}, {amount}, {dueDate}, {billLink}"
                  />
                </Grid>
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
