"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Card,
  CardHeader,
  CardContent,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  Router as RouterIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const RouterDetails = ({ open, onClose, router }) => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  if (!router) return null

  const formatDate = (date) => {
    if (!date) return "N/A"
    try {
      return typeof date === "string" ? date : format(date, "dd-MMM-yyyy HH:mm:ss")
    } catch (error) {
      return "Invalid Date"
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Router Details</Typography>
            <Chip label={router.serialNumber} color="secondary" size="small" sx={{ fontWeight: 600, ml: 1 }} />
            <Chip
              label={router.status ? "Online" : "Offline"}
              color={router.status ? "success" : "error"}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<InfoIcon sx={{ mr: 1 }} />} iconPosition="start" label="Basic Info" />
          <Tab icon={<SettingsIcon sx={{ mr: 1 }} />} iconPosition="start" label="Technical" />
          <Tab icon={<LocationIcon sx={{ mr: 1 }} />} iconPosition="start" label="Location & Status" />
        </Tabs>

        {/* Basic Information Tab */}
        {activeTab === 0 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RouterIcon color="primary" />
                  <Typography variant="h6">Basic Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Device Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Device ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.deviceId}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Serial Number
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.serialNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Device Model
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.deviceModel}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Device Make
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.deviceMake}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Manufacturer
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.manufacturer}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Device Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.deviceType}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      User & Access Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          User Name
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.userName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Vendor ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {router.vendorId}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Activation Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(router.activationDate)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Technical Information Tab */}
        {activeTab === 1 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SettingsIcon color="primary" />
                  <Typography variant="h6">Technical Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      MAC Address
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5, fontFamily: "monospace" }}>
                      {router.macAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      IP Address
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5, fontFamily: "monospace" }}>
                      {router.ipAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Firmware Version
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {router.firmwareVersion}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Seen
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                      {formatDate(router.lastSeen)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}

        {/* Location & Status Tab */}
        {activeTab === 2 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationIcon color="primary" />
                  <Typography variant="h6">Location & Status Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <LocationIcon fontSize="small" color="info" />
                      <Typography variant="h6" fontWeight={700}>
                        {router.location}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      {router.status ? (
                        <CheckCircleIcon fontSize="small" color="success" />
                      ) : (
                        <CancelIcon fontSize="small" color="error" />
                      )}
                      <Chip
                        label={router.status ? "Online" : "Offline"}
                        color={router.status ? "success" : "error"}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RouterDetails
