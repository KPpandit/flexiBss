"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  Avatar,
  Paper,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Divider,
} from "@mui/material"
import {
  SimCard as SimCardIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  CreditCard as CardIcon,
  TrendingUp as LiveTvIcon,
  Recommend as RecommendIcon,
  ConfirmationNumber as TicketIcon,
  BarChart as UsageIcon,
  DataUsage as DataIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Upgrade as UpgradeIcon,
  Receipt as BillIcon,
  Sms as SmsIcon,
  Call as CallIcon,
  Wifi as DataUsageIcon,
  Warning as WarningIcon,
  Person as PersonIcon, // Added for Profile tab
  Verified as VerifiedIcon, // Added for eKYC
  MiscellaneousServices as ServiceIcon, // Added for Service Info
  ReportProblem as ReportProblemIcon, // Added for Raise Complaint button
  SwapHoriz as SwapIcon, // Added for SIM Swap
} from "@mui/icons-material"
import React from "react"

import SimSwapComponent from "../actions/SimSwapComponent"
import PlanUpgradeComponent from "../Actions/PlanUpgradeComponent"
import RaiseComplaintComponent from "../actions/RaiseComplaintComponent"
import GenerateBillComponent from "../actions/GenerateBillComponent"
import CustomerCycleComponent from "../Actions/CustomerCycleComponent" // Added for Customer Cycle

const CustomerDetails = ({
  customer,
  onClose,
  inline = false,
  onEdit,
  onCustomerUpdate,
  onPlanUpgradeNotification,
}) => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [openPlanUpgrade, setOpenPlanUpgrade] = useState(false)
  const [openSimSwap, setOpenSimSwap] = useState(false)
  const [openComplaint, setOpenComplaint] = useState(false)
  const [openGenerateBill, setOpenGenerateBill] = useState(false)
  const [openCustomerCycle, setOpenCustomerCycle] = useState(false)

  if (!customer) return null

  const isPrepaid = customer.customerType === "Prepaid"
  const isPostpaid = customer.customerType === "Postpaid"

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getAvailableTabs = () => {
    const baseTabs = [
      { icon: <PersonIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Profile", show: true },
      { icon: <SimCardIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "SIM Information", show: true },
      { icon: <DataIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Current Pack", show: true },
      { icon: <UsageIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Usage", show: true },
      { icon: <LiveTvIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Live Details", show: true },
      { icon: <HistoryIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Recharge And Payment History", show: isPrepaid },
      { icon: <HistoryIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Bill in Payment History", show: isPostpaid },
      { icon: <RecommendIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Plan Recommendation", show: true },
      { icon: <TicketIcon sx={{ mr: 1, color: "#F8D582" }} />, label: "Ticket Issued", show: true },
    ]
    return baseTabs.filter((tab) => tab.show)
  }

  const availableTabs = getAvailableTabs()

  const getCartoonAvatar = (gender, name) => {
    const maleAvatars = [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=male1&backgroundColor=b6e3f4,c0aede,d1d4f9&clothingColor=262e33,65c9ff,5199e4,25557c",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=male2&backgroundColor=b6e3f4,c0aede,d1d4f9&clothingColor=262e33,65c9ff,5199e4,25557c",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=male3&backgroundColor=b6e3f4,c0aede,d1d4f9&clothingColor=262e33,65c9ff,5199e4,25557c",
    ]
    const femaleAvatars = [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=female1&backgroundColor=ffdfbf,ffd5dc,c0aede&clothingColor=262e33,65c9ff,5199e4,25557c",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=female2&backgroundColor=ffdfbf,ffd5dc,c0aede&clothingColor=262e33,65c9ff,5199e4,25557c",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=female3&backgroundColor=ffdfbf,ffd5dc,c0aede&clothingColor=262e33,65c9ff,5199e4,25557c",
    ]

    const avatars = gender === "Female" ? femaleAvatars : maleAvatars
    const index = name.length % avatars.length
    return avatars[index]
  }

  const containerSx = inline
    ? {
        width: "100%",
        maxWidth: "100%",
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
        minHeight: "100vh",
        p: 0,
        overflow: "hidden",
      }
    : {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        p: 2,
      }

  const contentSx = inline
    ? {
        width: "100%",
        maxWidth: "100%",
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
        overflow: "hidden",
      }
    : {
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
        borderRadius: 3,
        maxWidth: "95vw",
        maxHeight: "95vh",
        overflow: "auto",
        boxShadow: theme.shadows[24],
      }

  const renderTabContent = () => {
    const currentTab = availableTabs[activeTab]
    if (!currentTab) return null

    switch (currentTab.label) {
      case "Profile":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            {/* Personal Information Section */}
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: "none",
                width: "100%",
                backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 1, color: "#F8D582" }} />
                  Personal Information
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Email Address
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {customer.email || "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Date of Birth
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {formatDate(customer.dob)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Alternate Number
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {customer.alternateNumber || "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Registration Date
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {formatDate(customer.registrationDate)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Address
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {customer.address || "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* eKYC Information Section */}
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: "none",
                width: "100%",
                backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VerifiedIcon sx={{ mr: 1, color: "#F8D582" }} />
                  eKYC Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      eKYC Status
                    </Typography>
                    <Chip
                      label={customer.eKycStatus}
                      color={customer.eKycStatus === "Verified" ? "success" : "warning"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      eKYC Date
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {formatDate(customer.eKycDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      eKYC Token
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ fontFamily: "monospace", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.eKycToken || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Service Information Section */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "none",
                width: "100%",
                backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ServiceIcon sx={{ mr: 1, color: "#F8D582" }} />
                  Service Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      Customer Type
                    </Typography>
                    <Chip
                      label={customer.customerType}
                      sx={{
                        fontWeight: 600,
                        bgcolor: theme.palette.mode === "dark" ? "#404040" : "#f5f5f5",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        border: `1px solid ${theme.palette.mode === "dark" ? "#606060" : "#e0e0e0"}`,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      Service Type
                    </Typography>
                    <Chip
                      label={customer.serviceType}
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      Status
                    </Typography>
                    <Chip
                      label={customer.status}
                      color={customer.status === "Active" ? "success" : "error"}
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                      Customer ID
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ fontFamily: "monospace", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.id}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )

      case "SIM Information":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SimCardIcon sx={{ color: "#F8D582", fontSize: "2rem" }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: "1rem",
                  }}
                >
                  SIM Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Complete SIM card details and configuration
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  icon: <PhoneIcon />,
                  label: "MSISDN",
                  value: customer.msisdn,
                  color: "#F8D582",
                },
                {
                  icon: <SimCardIcon />,
                  label: "SIM Type",
                  value: customer.simType,
                  color: "#F8D582",
                },
                {
                  icon: <CalendarIcon />,
                  label: "Allocation Date",
                  value: formatDate(customer.simDetails?.allocationDate),
                  color: "#F8D582",
                },
                {
                  icon: <CardIcon />,
                  label: "ICC ID",
                  value: customer.simDetails?.iccId,
                  color: "#F8D582",
                },
                {
                  icon: <SimCardIcon />,
                  label: "IMSI",
                  value: customer.imsi || "617011234567890",
                  color: "#F8D582",
                },
              ].map((item, index) => (
                <Grid item xs={12} md={6} lg={index < 4 ? 3 : 6} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                      backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      boxShadow: "none",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "#F8D582",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "50%",
                          bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                          border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          sx: { color: "#F8D582" },
                        })}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        wordBreak: "break-all",
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )

      case "Current Pack":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DataIcon sx={{ color: "#F8D582", fontSize: "2rem" }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                >
                  Current Pack Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active plan details and benefits
                </Typography>
              </Box>
            </Box>

            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                boxShadow: "none",
                width: "100%",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                      Pack Name
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.currentPack.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                      Price
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.currentPack.price ? `$${customer.currentPack.price}` : "$0"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                      Validity
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.currentPack.validity} days
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )

      case "Recharge And Payment History":
      case "Bill in Payment History":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HistoryIcon sx={{ color: "#F8D582", fontSize: "2rem" }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: "1rem",
                  }}
                >
                  {isPrepaid ? "Recharge And Payment History" : "Bill in Payment History"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Complete transaction history and payment details
                </Typography>
              </Box>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                overflow: "auto",
                boxShadow: "none",
                // Updated table container background to light black with grey border
                bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                width: "100%",
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Payment Method</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(customer.rechargeHistory || []).map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": { bgcolor: theme.palette.action.hover },
                        "&:nth-of-type(odd)": { bgcolor: theme.palette.action.selected },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        {formatDate(item.date)}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "#4caf50", fontSize: "1rem" }}>
                          ${item.amount}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "1rem", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        {item.type}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.paymentMethod || "UPI"}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.paymentMethod === "Cash" ? "CBM" : "Payment Gateway"}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            bgcolor: item.status === "Success" ? theme.palette.success.main : theme.palette.error.main,
                            color:
                              item.status === "Success"
                                ? theme.palette.success.contrastText
                                : theme.palette.error.contrastText,
                            fontWeight: 600,
                            fontSize: "1rem",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )

      case "Live Details":
        return (
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LiveTvIcon color="primary" />
                  <Typography variant="h6">Live Connection Details</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}` }}
            />
            <CardContent
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="h6" gutterBottom>
                      Connection Status
                    </Typography>
                    <Chip label="Connected" color="success" sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Signal Strength: 85%
                    </Typography>
                    <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }} variant="outlined">
                    <Typography variant="h6" gutterBottom>
                      Network Information
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          RAT Type
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          NR
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Radio Id
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          gNB_10023_NR
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Sector Id/Band
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          Sector 2 / NR Band n78
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Current Bandwidth
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          700 Mbps
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          UL/DL
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          200 Mbps / 1 Gbps
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Tower ID
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          TWR-001
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          Central Zone
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )

      case "Plan Recommendation":
        return (
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RecommendIcon color="primary" />
                  <Typography variant="h6">Recommended Plans</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}` }}
            />
            <CardContent
              sx={{
                // Updated card content background to light black with grey border
                bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <Grid container spacing={3}>
                {[
                  { name: "Premium Pack", price: 599, data: "50GB", validity: 30, recommended: true },
                  { name: "Standard Pack", price: 399, data: "25GB", validity: 30, recommended: false },
                  { name: "Basic Pack", price: 199, data: "10GB", validity: 30, recommended: false },
                ].map((plan, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        border: plan.recommended ? `2px solid ${theme.palette.primary.main}` : "1px solid",
                        borderColor: plan.recommended ? theme.palette.primary.main : theme.palette.divider,
                        position: "relative",
                        boxShadow: "none",
                        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                        border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                      }}
                    >
                      {plan.recommended && (
                        <Chip
                          label="Recommended"
                          color="primary"
                          size="small"
                          sx={{ position: "absolute", top: -10, right: 10 }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        gutterBottom
                        color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                      >
                        {plan.name}
                      </Typography>
                      <Typography variant="h4" color="primary" gutterBottom>
                        ${plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.data} Data • {plan.validity} Days
                      </Typography>
                      <Button variant={plan.recommended ? "contained" : "outlined"} fullWidth sx={{ mt: 2 }}>
                        Select Plan
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )

      case "Ticket Issued":
        return (
          <Card variant="outlined" sx={{ width: "100%" }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TicketIcon color="primary" />
                  <Typography variant="h6">Tickets History</Typography>
                </Box>
              }
              sx={{ borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}` }}
            />
            <CardContent
              sx={{
                // Updated card content background to light black with grey border
                bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Ticket ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Created Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(customer.tickets || []).map((ticket, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": { bgcolor: theme.palette.action.hover },
                          "&:nth-of-type(odd)": { bgcolor: theme.palette.action.selected },
                        }}
                      >
                        <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                          {ticket.id}
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                          {ticket.subject}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ticket.priority}
                            size="small"
                            color={
                              ticket.priority === "High"
                                ? "error"
                                : ticket.priority === "Medium"
                                  ? "warning"
                                  : "default"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ticket.status}
                            size="small"
                            color={ticket.status === "Resolved" ? "success" : "primary"}
                          />
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                          {formatDate(ticket.createdDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )

      case "Usage":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UsageIcon sx={{ color: "#F8D582", fontSize: "2rem" }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: "1rem",
                  }}
                >
                  Usage Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                  Detailed usage statistics and consumption patterns
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.divider,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DataUsageIcon sx={{ color: "#F8D582" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      Data Usage
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    15.2 GB
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "1rem" }}>
                    of 25 GB used (60.8%)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60.8}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.action.hover,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F8D582",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.divider,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CallIcon sx={{ color: "#F8D582" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      Voice Usage
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    450 min
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "1rem" }}>
                    of unlimited (45%)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={45}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.action.hover,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F8D582",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.divider,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SmsIcon sx={{ color: "#F8D582" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      SMS Usage
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    85
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "1rem" }}>
                    of 100 SMS used (85%)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.action.hover,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F8D582",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.divider,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PhoneIcon sx={{ color: "#F8D582" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      IDD Usage
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    25 min
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "1rem" }}>
                    International calls this month
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={25}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.action.hover,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F8D582",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.divider,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        bgcolor: theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DataUsageIcon sx={{ color: "#F8D582" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      Roaming Usage
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    2.5 GB
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "1rem" }}>
                    Data used while roaming
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={50}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.action.hover,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F8D582",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )

      case "Bill Details":
      case "Plan Details":
        return (
          <Box sx={{ p: 4, width: "100%", boxSizing: "border-box" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 4, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
            >
              {isPostpaid ? "Bill Details" : "Plan Details"}
            </Typography>

            {isPostpaid ? (
              <Grid container spacing={4}>
                {customer.overdue && customer.overdue > 0 && (
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "none",
                        border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                        width: "100%",
                        backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? theme.palette.background.default
                              : theme.palette.action.hover,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: theme.palette.warning.main,
                          }}
                        >
                          <WarningIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                          Overdue Amount
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.warning.main }}>
                          ${customer.overdue.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Please clear the overdue amount to continue services
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "none",
                      width: "100%",
                      backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 3, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        Current Bill Summary
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", mb: 2 }}
                      >
                        ${customer.currentBill?.amount?.toLocaleString() || "0"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Due Date: {formatDate(customer.currentBill?.dueDate)}
                      </Typography>
                      <Chip
                        label={customer.currentBill?.status || "Pending"}
                        color={customer.currentBill?.status === "Paid" ? "success" : "warning"}
                        sx={{ fontWeight: 600 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "none",
                      width: "100%",
                      backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 3, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        Billing Information
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Next Invoice Date
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {formatDate(customer.nextInvoiceDate)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                          Bill Cycle
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {customer.billCycle || "Monthly"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "none",
                      width: "100%",
                      backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 3, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        Bill Breakdown
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography>Monthly Rental</Typography>
                        <Typography
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          ${customer.currentBill?.rental?.toLocaleString() || "999"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography>Extra Usage</Typography>
                        <Typography
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          ${customer.currentBill?.extraUsage?.toLocaleString() || "200"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography>Taxes & Fees</Typography>
                        <Typography
                          fontWeight={600}
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          ${customer.currentBill?.taxes?.toLocaleString() || "100"}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" fontWeight={700}>
                          Total Amount
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                        >
                          ${customer.currentBill?.amount?.toLocaleString() || "1,299"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                  boxShadow: "none",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                >
                  Active Plan Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Plan Name
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {customer.currentPack?.name || "Premium Pack"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Validity Remaining
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      28 days
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Plan Value
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                    >
                      ${customer.currentPack?.price || "599"}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box sx={containerSx}>
      <Box sx={contentSx}>
        {/* Header Section with Customer Info */}
        <Box
          sx={{
            p: 4,
            borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
            bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Avatar
              src={getCartoonAvatar(customer.gender, customer.name)}
              sx={{
                width: 140,
                height: 140,
                border: `2px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
                boxShadow: "none",
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "1rem",
                }}
              >
                {customer.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 2,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  fontSize: "1rem",
                }}
              >
                {customer.msisdn}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                {/* Customer ID FIRST */}
                <Chip
                  label={`Customer ID: ${customer.id}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    bgcolor: "transparent",
                  }}
                />
                {/* Service Type - neutral chip with tiny dot accent only */}
                <Chip
                  icon={<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: theme.palette.grey[500] }} />}
                  label={customer.serviceType}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& .MuiChip-icon": { mr: 0.5 },
                  }}
                />
                {/* Customer Type - neutral */}
                <Chip
                  label={customer.customerType}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  }}
                />
                {/* eKYC Status - subtle status colors only */}
                <Chip
                  label={`eKYC: ${customer.eKycStatus}`}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    color:
                      customer.eKycStatus === "Verified"
                        ? theme.palette.success.contrastText
                        : theme.palette.text.primary,
                    bgcolor:
                      customer.eKycStatus === "Verified"
                        ? theme.palette.success.main
                        : customer.eKycStatus === "Pending"
                          ? theme.palette.warning.light
                          : customer.eKycStatus === "Rejected"
                            ? theme.palette.error.light
                            : theme.palette.grey[300],
                  }}
                />
                {/* Active Status LAST */}
                <Chip
                  label={customer.status}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    color:
                      customer.status === "Active"
                        ? theme.palette.success.contrastText
                        : theme.palette.error.contrastText,
                    bgcolor: customer.status === "Active" ? theme.palette.success.main : theme.palette.error.main,
                  }}
                />

                {customer.vip && (
                  <Chip
                    label="VIP"
                    size="small"
                    sx={{
                      bgcolor: "#ffd700",
                      color: "#000",
                      fontWeight: 700,
                      border: "2px solid #ffb300",
                    }}
                  />
                )}
              </Box>
            </Box>

            {onEdit && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEdit}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                    borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                  },
                }}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>

        {/* Quick Actions Section */}
        <Box
          sx={{
            p: 4,
            borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "none",
              bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
              border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              width: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "flex-start",
                }}
              >
                {[
                  {
                    label: "Plan Upgrade",
                    icon: <UpgradeIcon sx={{ color: "#F8D582" }} />,
                    onClick: () => setOpenPlanUpgrade(true),
                  },
                  {
                    label: "SIM Swap",
                    icon: <SwapIcon sx={{ color: "#F8D582" }} />,
                    onClick: () => setOpenSimSwap(true),
                  },
                  {
                    label: "Raise Complaint",
                    icon: <ReportProblemIcon sx={{ color: "#F8D582" }} />,
                    onClick: () => setOpenComplaint(true),
                  },
                  {
                    label: "Generate Bill",
                    icon: <BillIcon sx={{ color: "#F8D582" }} />,
                    onClick: () => setOpenGenerateBill(true),
                  },
                  {
                    label: "Customer Cycle",
                    icon: <HistoryIcon sx={{ color: "#F8D582" }} />,
                    onClick: () => setOpenCustomerCycle(true),
                  },
                ].map((btn, i) => (
                  <Button
                    key={i}
                    variant="outlined"
                    startIcon={btn.icon}
                    onClick={btn.onClick}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1.25,
                      textTransform: "none",
                      fontWeight: 600,
                      minWidth: 160,
                      borderColor: theme.palette.mode === "dark" ? "#606060" : "#e0e0e0",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      "&:hover": {
                        bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                        borderColor: "#F8D582", // Golden border on hover
                      },
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ px: 4, pt: 2, width: "100%", boxSizing: "border-box" }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              mb: 2,
              "& .MuiTabs-scroller": {
                overflow: "auto !important",
                maxWidth: "100%",
                "& .MuiTabs-flexContainer": {
                  gap: 2,
                  flexWrap: "nowrap",
                  minWidth: "max-content",
                },
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem", // Increased tab font size
                minHeight: 48,
                px: 2,
                py: 1,
                borderRadius: 0,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                minWidth: "auto",
                flex: "0 0 auto",
                whiteSpace: "nowrap",
                "&:hover": {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  bgcolor: "transparent",
                },
                "&.Mui-selected": {
                  color: "#F8D582", // Golden color for selected tab
                },
              },
              "& .MuiTabs-indicator": {
                height: 2,
                backgroundColor: "#F8D582", // Golden indicator
                borderRadius: 1,
              },
              "& .MuiTabs-scrollButtons": {
                color: theme.palette.text.secondary,
                "&.Mui-disabled": {
                  opacity: 0.3,
                },
              },
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {availableTabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{
                  "& .MuiTab-iconWrapper": {
                    mb: 0,
                    mr: 1,
                    color: "inherit",
                  },
                  "&.Mui-selected .MuiTab-iconWrapper": {
                    color: "#F8D582", // Golden color for selected tab icon
                  },
                }}
              />
            ))}
          </Tabs>

          {/* Tab Content */}
          <Box
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#404040" : "#e0e0e0"}`,
              minHeight: 400,
              maxWidth: "100%",
              overflow: "hidden",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {renderTabContent()}
          </Box>
        </Box>

        <PlanUpgradeComponent
          open={openPlanUpgrade}
          onClose={() => setOpenPlanUpgrade(false)}
          customer={customer}
          onCustomerUpdate={onCustomerUpdate}
          onPlanUpgradeNotification={onPlanUpgradeNotification}
        />

        <SimSwapComponent open={openSimSwap} onClose={() => setOpenSimSwap(false)} customer={customer} />

        <RaiseComplaintComponent open={openComplaint} onClose={() => setOpenComplaint(false)} customer={customer} />

        <GenerateBillComponent open={openGenerateBill} onClose={() => setOpenGenerateBill(false)} customer={customer} />

        <CustomerCycleComponent // Added Customer Cycle Component
          open={openCustomerCycle}
          onClose={() => setOpenCustomerCycle(false)}
          customer={customer}
        />
      </Box>
    </Box>
  )
}

export default CustomerDetails
