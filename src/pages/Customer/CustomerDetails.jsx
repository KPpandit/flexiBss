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
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Chip,
  Divider,
  Card,
  CardHeader,
  CardContent,
  useTheme,
} from "@mui/material"
import {
  Close as CloseIcon,
  SimCard as SimCardIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  CreditCard as CardIcon,
  DataUsage as DataIcon,
  Call as CallIcon,
  Sms as SmsIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"
import { format } from "date-fns"

const CustomerDetails = ({ open, onClose, customer }) => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()

  if (!customer) return null

  const getUsagePercentage = (used, offered) => {
    if (offered === "Unlimited" || offered === 0) return 0
    return (used / offered) * 100
  }

  const formatDate = (date) => {
    if (!date) return "N/A"
    try {
      return typeof date === "string" ? date : format(date, "dd-MMM-yyyy HH:mm:ss")
    } catch (error) {
      return "Invalid Date"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Expired":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Customer Details</Typography>
            <Chip label={customer.name} color="primary" size="small" sx={{ fontWeight: 600, ml: 1 }} />
            {customer.vip && <Chip label="VIP" color="warning" size="small" sx={{ fontWeight: 600 }} />}
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
          <Tab icon={<SimCardIcon sx={{ mr: 1 }} />} iconPosition="start" label="SIM Information" />
          <Tab icon={<DataIcon sx={{ mr: 1 }} />} iconPosition="start" label="Current Pack" />
          <Tab icon={<HistoryIcon sx={{ mr: 1 }} />} iconPosition="start" label="Recharge History" />
        </Tabs>

        {/* SIM Information Tab */}
        {activeTab === 0 && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SimCardIcon color="primary" />
                  <Typography variant="h6">SIM Information</Typography>
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
                          MSISDN
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <PhoneIcon fontSize="small" color="primary" />
                          <Typography variant="body1" fontWeight={600}>
                            {customer.msisdn}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          SIM Type
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <SimCardIcon fontSize="small" color="secondary" />
                          <Typography variant="body1" fontWeight={600}>
                            {customer.simType}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Allocation Date
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <CalendarIcon fontSize="small" color="info" />
                          <Typography variant="body1" fontWeight={600}>
                            {formatDate(customer.simDetails?.allocationDate)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          ICC ID
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <CardIcon fontSize="small" color="warning" />
                          <Typography variant="body1" fontWeight={600}>
                            {customer.simDetails?.iccId}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: "100%" }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Customer Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Service Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {customer.serviceType}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Customer Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {customer.customerType}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Gender
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {customer.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Date of Birth
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(customer.dob).split(" ")[0]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      eKYC Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          eKYC Status
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          {customer.ekycStatus === "Verified" ? (
                            <CheckCircleIcon fontSize="small" color="success" />
                          ) : (
                            <WarningIcon fontSize="small" color="warning" />
                          )}
                          <Typography variant="body1" fontWeight={600}>
                            {customer.ekycStatus}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          eKYC Token
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {customer.ekycToken}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          eKYC Date
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                          {formatDate(customer.ekycDate).split(" ")[0]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Current Pack Tab */}
        {activeTab === 1 && customer.currentPack && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DataIcon color="primary" />
                  <Typography variant="h6">Current Pack Information</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <Paper sx={{ p: 3, mb: 3 }} variant="outlined">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Pack Name
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                      {customer.currentPack.packName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Activation Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <CalendarIcon fontSize="small" color="success" />
                      <Typography variant="body1" fontWeight={600}>
                        {formatDate(customer.currentPack.activationDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Expiration Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <CalendarIcon fontSize="small" color="error" />
                      <Typography variant="body1" fontWeight={600}>
                        {formatDate(customer.currentPack.expirationDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Main Balance
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 0.5 }}>
                      A$ {customer.currentPack.mainBalance}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={new Date(customer.currentPack.expirationDate) > new Date() ? "Active" : "Expired"}
                      color={new Date(customer.currentPack.expirationDate) > new Date() ? "success" : "error"}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ p: 3 }} variant="outlined">
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Usage Details
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Details</TableCell>
                        <TableCell align="right">Offered</TableCell>
                        <TableCell align="right">Used</TableCell>
                        <TableCell align="right">Available</TableCell>
                        <TableCell align="right">Usage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <DataIcon fontSize="small" color="info" />
                            <Typography variant="body2" fontWeight={500}>
                              Total Data
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.totalData.offered} GB
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.totalData.used} GB
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.totalData.available} GB
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getUsagePercentage(
                                customer.currentPack.usage.totalData.used,
                                customer.currentPack.usage.totalData.offered,
                              )}
                              sx={{ width: 60 }}
                              color="info"
                            />
                            <Typography variant="caption">
                              {getUsagePercentage(
                                customer.currentPack.usage.totalData.used,
                                customer.currentPack.usage.totalData.offered,
                              ).toFixed(1)}
                              %
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CallIcon fontSize="small" color="success" />
                            <Typography variant="body2" fontWeight={500}>
                              ON-Net Calls
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={customer.currentPack.usage.onNetCalls.offered}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.onNetCalls.used} min
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={customer.currentPack.usage.onNetCalls.available}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <SmsIcon fontSize="small" color="success" />
                            <Typography variant="body2" fontWeight={500}>
                              ON-Net SMS
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={customer.currentPack.usage.onNetSms.offered}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.onNetSms.used}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={customer.currentPack.usage.onNetSms.available}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CallIcon fontSize="small" color="warning" />
                            <Typography variant="body2" fontWeight={500}>
                              OFF-Net Calls
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetCalls.offered} min
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetCalls.used} min
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetCalls.available} min
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getUsagePercentage(
                                customer.currentPack.usage.offNetCalls.used,
                                customer.currentPack.usage.offNetCalls.offered,
                              )}
                              sx={{ width: 60 }}
                              color="warning"
                            />
                            <Typography variant="caption">
                              {getUsagePercentage(
                                customer.currentPack.usage.offNetCalls.used,
                                customer.currentPack.usage.offNetCalls.offered,
                              ).toFixed(1)}
                              %
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <SmsIcon fontSize="small" color="warning" />
                            <Typography variant="body2" fontWeight={500}>
                              OFF-Net SMS
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetSms.offered}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetSms.used}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {customer.currentPack.usage.offNetSms.available}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={getUsagePercentage(
                                customer.currentPack.usage.offNetSms.used,
                                customer.currentPack.usage.offNetSms.offered,
                              )}
                              sx={{ width: 60 }}
                              color="warning"
                            />
                            <Typography variant="caption">
                              {getUsagePercentage(
                                customer.currentPack.usage.offNetSms.used,
                                customer.currentPack.usage.offNetSms.offered,
                              ).toFixed(1)}
                              %
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </CardContent>
          </Card>
        )}

        {/* Recharge History Tab */}
        {activeTab === 2 && customer.rechargeHistory && (
          <Card variant="outlined">
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HistoryIcon color="primary" />
                  <Typography variant="h6">Previous Recharge Transactions</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pack Name</TableCell>
                      <TableCell>Activation Date</TableCell>
                      <TableCell>Expiration Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Data Balance</TableCell>
                      <TableCell>ONN Calls</TableCell>
                      <TableCell>OFFN Calls</TableCell>
                      <TableCell>ONN SMS</TableCell>
                      <TableCell>OFFN SMS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customer.rechargeHistory.map((transaction, index) => {
                      const isExpired = new Date(transaction.expirationDate) < new Date()
                      return (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {transaction.packName}
                            </Typography>
                          </TableCell>
                          <TableCell>{transaction.activationDate}</TableCell>
                          <TableCell>{transaction.expirationDate}</TableCell>
                          <TableCell>
                            <Chip
                              label={isExpired ? "Expired" : "Active"}
                              color={isExpired ? "error" : "success"}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{transaction.dataBalance}</TableCell>
                          <TableCell>{transaction.onnCalls}</TableCell>
                          <TableCell>{transaction.offnCalls}</TableCell>
                          <TableCell>{transaction.onnSms}</TableCell>
                          <TableCell>{transaction.offnSms}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetails
