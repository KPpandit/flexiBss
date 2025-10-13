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
import { Save, Sms, Send } from "@mui/icons-material"

export default function SMSNotification() {
  const [enabled, setEnabled] = useState(true)
  const [provider, setProvider] = useState("twilio")
  const [senderId, setSenderId] = useState("TELCO")
  const [templates, setTemplates] = useState({
    welcome: "Welcome to our network! Your number {phone} is now active.",
    recharge: "Your recharge of {amount} is successful. New balance: {balance}",
    lowBalance: "Your balance is low: {balance}. Recharge now to continue services.",
    billGenerated: "Your bill of {amount} is generated. Due date: {dueDate}",
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "SMS notification configuration saved successfully!",
      severity: "success",
    })
  }

  const handleTestSMS = () => {
    setSnackbar({
      open: true,
      message: "Test SMS sent successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Sms sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          SMS Notification Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid sx={{width:'100%'}} item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                SMS Notification
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable SMS Notifications"
                sx={{ mb: 3 }}
              />

            
              <TextField
                fullWidth
                label="Sender ID"
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                sx={{ mb: 3 }}
                helperText="6 characters max, alphanumeric"
              />

              <TextField fullWidth label="API Key" type="password" defaultValue="••••••••••••" sx={{ mb: 3 }} />

              <TextField fullWidth label="API Secret" type="password" defaultValue="••••••••••••" sx={{ mb: 3 }} />

              <Button variant="outlined" fullWidth startIcon={<Send />} onClick={handleTestSMS}>
                Send Test SMS
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
                  "New Customer Registration",
                  "Successful Recharge",
                  "Low Balance Alert",
                  "Bill Generated",
                  "Payment Received",
                  "Service Activation",
                  "Service Deactivation",
                  "Plan Upgrade",
                  "SIM Swap Confirmation",
                  "OTP Verification",
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
                SMS Templates
              </Typography>

              <Grid container spacing={3}>
                <Grid sx={{width:'25%'}} item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Welcome Message
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.welcome}
                    onChange={(e) => setTemplates({ ...templates, welcome: e.target.value })}
                    helperText="Variables: {phone}, {name}"
                  />
                </Grid>

                <Grid item sx={{width:'25%'}} xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Recharge Success
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.recharge}
                    onChange={(e) => setTemplates({ ...templates, recharge: e.target.value })}
                    helperText="Variables: {amount}, {balance}"
                  />
                </Grid>

                <Grid item sx={{width:'25%'}} xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Low Balance Alert
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.lowBalance}
                    onChange={(e) => setTemplates({ ...templates, lowBalance: e.target.value })}
                    helperText="Variables: {balance}"
                  />
                </Grid>

                <Grid item sx={{width:'15%'}} xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Bill Generated
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.billGenerated}
                    onChange={(e) => setTemplates({ ...templates, billGenerated: e.target.value })}
                    helperText="Variables: {amount}, {dueDate}"
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
