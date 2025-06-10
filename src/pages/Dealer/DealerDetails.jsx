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
  Divider,
  Card,
  CardHeader,
  CardContent,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Description as DocumentIcon,
  AccountBalance as BalanceIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const DealerDetails = ({ open, onClose, dealer }) => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  if (!dealer) return null

  const formatDate = (date) => {
    if (!date) return "N/A"
    try {
      return typeof date === "string" ? date : format(date, "dd-MMM-yyyy")
    } catch (error) {
      return "Invalid Date"
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Dealer Details</Typography>
            <Chip label={dealer.businessName} color="primary" size="small" sx={{ fontWeight: 600, ml: 1 }} />
            {dealer.isNeotel && <Chip label="Neotel Partner" color="info" size="small" sx={{ fontWeight: 600 }} />}
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
          <Tab icon={<PersonIcon sx={{ mr: 1 }} />} iconPosition="start" label="Personal Info" />
          <Tab icon={<BusinessIcon sx={{ mr: 1 }} />} iconPosition="start" label="Business Info" />
          <Tab icon={<BalanceIcon sx={{ mr: 1 }} />} iconPosition="start" label="Financial Info" />
        </Tabs>

        {/* Personal Information Tab */}
        {activeTab === 0 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6">Personal Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Basic Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          First Name
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {dealer.firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Last Name
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {dealer.lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <EmailIcon fontSize="small" color="primary" />
                          <Typography variant="body1" fontWeight={600}>
                            {dealer.email}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Contact
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <PhoneIcon fontSize="small" color="success" />
                          <Typography variant="body1" fontWeight={600}>
                            {dealer.contact}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Document Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Document Type
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <DocumentIcon fontSize="small" color="warning" />
                          <Typography variant="body1" fontWeight={600}>
                            {dealer.documentType}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Document ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {dealer.documentId}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Creation Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(dealer.creationDate)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Token
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {dealer.token}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Business Information Tab */}
        {activeTab === 1 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BusinessIcon color="primary" />
                  <Typography variant="h6">Business Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3, mb: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Business Name
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                      {dealer.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Business Nature
                    </Typography>
                    <Chip label={dealer.businessNature} color="secondary" sx={{ mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Type
                    </Typography>
                    <Chip
                      label={dealer.type}
                      color={dealer.type === "Distributor" ? "primary" : "default"}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Locality
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <LocationIcon fontSize="small" color="info" />
                      <Typography variant="body1" fontWeight={600}>
                        {dealer.locality}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Business Address
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <LocationIcon fontSize="small" color="info" />
                      <Typography variant="body1" fontWeight={600}>
                        {dealer.businessAddress}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}

        {/* Financial Information Tab */}
        {activeTab === 2 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BalanceIcon color="primary" />
                  <Typography variant="h6">Financial & Status Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Total Core Balance
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 0.5 }}>
                      ${dealer.totalCoreBalance}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      {dealer.isActive ? (
                        <CheckCircleIcon fontSize="small" color="success" />
                      ) : (
                        <CancelIcon fontSize="small" color="error" />
                      )}
                      <Chip
                        label={dealer.isActive ? "Active" : "Inactive"}
                        color={dealer.isActive ? "success" : "error"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Neotel Partner
                    </Typography>
                    <Chip
                      label={dealer.isNeotel ? "Yes" : "No"}
                      color={dealer.isNeotel ? "info" : "default"}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                  {dealer.reasonStatus && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Reason Status
                      </Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                        {dealer.reasonStatus}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DealerDetails
