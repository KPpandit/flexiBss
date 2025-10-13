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
import { Save, CalendarToday, Info } from "@mui/icons-material"

export default function BillGenerateDate() {
  const [enabled, setEnabled] = useState(true)
  const [billCycle, setBillCycle] = useState("monthly")
  const [proratedBilling, setProratedBilling] = useState(false)
  const [generateDay, setGenerateDay] = useState("1")
  const [gracePeriod, setGracePeriod] = useState("7")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Bill generation date configuration saved successfully!",
      severity: "success",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <CalendarToday sx={{ fontSize: 32, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Bill Generate Date Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item sx={{ width: "100%" }} xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Bill Generation Settings
              </Typography>

              <FormControlLabel
                control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} color="primary" />}
                label="Enable Automatic Bill Generation"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Bill Cycle</InputLabel>
                <Select value={billCycle} onChange={(e) => setBillCycle(e.target.value)} label="Bill Cycle">
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="bimonthly">Bi-Monthly</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={proratedBilling}
                    onChange={(e) => setProratedBilling(e.target.checked)}
                    color="primary"
                  />
                }
                label="Apply 15-day prorated billing for signups after 15th"
                sx={{ mb: 3, display: "flex", alignItems: "center" }}
              />

              <TextField
                fullWidth
                label="Generate on Day of Month"
                type="number"
                value={generateDay}
                onChange={(e) => setGenerateDay(e.target.value)}
                sx={{ mb: 3 }}
                helperText="Day of month (1-28)"
                inputProps={{ min: 1, max: 28 }}
              />

              <TextField
                fullWidth
                label="Grace Period (days)"
                type="number"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
                sx={{ mb: 3 }}
                helperText="Days before service suspension"
              />

              <TextField fullWidth label="Bill Generation Time" type="time" defaultValue="00:00" sx={{ mb: 3 }} />

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
                  Bills will be generated on day {generateDay} of each month at the specified time. Customers will have{" "}
                  {gracePeriod} days grace period for payment.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Bill Generation Rules
              </Typography>

              <Grid container spacing={2}>
                {[
                  "Include Voice Charges",
                  "Include Data Charges",
                  "Include SMS Charges",
                  "Include Roaming Charges",
                  "Include International Charges",
                  "Include VAS Charges",
                  "Include Taxes",
                  "Include Discounts",
                  "Include Previous Balance",
                  "Include Late Fees",
                  "Round to Nearest Dollar",
                ].map((rule) => (
                  <Grid item xs={12} key={rule}>
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label={rule} />
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
