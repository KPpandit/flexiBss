"use client"

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Grid,
  useTheme,
  Avatar,
  LinearProgress,
  Fade,
  Zoom,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ApprovedIcon,
  Schedule as PendingIcon,
  Cancel as RejectedIcon,
  Phone as CallIcon,
  Sms as SmsIcon,
  Wifi as DataIcon,
  AttachMoney as PriceIcon,
  CalendarToday as ValidityIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material"
import { useState } from "react"

const PackCard = ({ pack, onEdit, onDelete }) => {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const getStatusConfig = (status) => {
    switch (status) {
      case "Approved":
        return {
          icon: <ApprovedIcon />,
          color: theme.palette.success.main,
          bgColor: theme.palette.success.light,
          gradient: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
        }
      case "Pending":
        return {
          icon: <PendingIcon />,
          color: theme.palette.warning.main,
          bgColor: theme.palette.warning.light,
          gradient: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
        }
      case "Rejected":
        return {
          icon: <RejectedIcon />,
          color: theme.palette.error.main,
          bgColor: theme.palette.error.light,
          gradient: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
        }
      default:
        return {
          icon: <PendingIcon />,
          color: theme.palette.grey[500],
          bgColor: theme.palette.grey[200],
          gradient: `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[700]} 100%)`,
        }
    }
  }

  const getCategoryConfig = (category) => {
    switch (category) {
      case "Prepaid":
        return {
          color: theme.palette.primary.main,
          gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          icon: <SpeedIcon />,
        }
      case "Postpaid":
        return {
          color: theme.palette.secondary.main,
          gradient: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          icon: <SecurityIcon />,
        }
      case "FWA":
        return {
          color: theme.palette.info.main,
          gradient: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
          icon: <DataIcon />,
        }
      default:
        return {
          color: theme.palette.grey[500],
          gradient: `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[700]} 100%)`,
          icon: <StarIcon />,
        }
    }
  }

  const statusConfig = getStatusConfig(pack.pack_status)
  const categoryConfig = getCategoryConfig(pack.category_name)

  const getDataUsagePercentage = () => {
    // Mock calculation for visual appeal
    return Math.min((pack.data_balance / 1000) * 100, 100)
  }

  return (
    <Zoom in={true} timeout={600}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: "100%", // Ensures consistent height
          minHeight: 580, // Set minimum height for consistency
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px ${statusConfig.color}40` : theme.shadows[4],
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 50%, ${theme.palette.grey[900]} 100%)`
              : `linear-gradient(145deg, ${theme.palette.common.white} 0%, ${theme.palette.grey[50]} 50%, ${theme.palette.common.white} 100%)`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: statusConfig.gradient,
            opacity: isHovered ? 1 : 0.8,
            transition: "opacity 0.3s ease",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at top right, ${statusConfig.color}08 0%, transparent 50%)`,
            pointerEvents: "none",
          },
        }}
      >
        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 1,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
            zIndex: 2,
          }}
        >
          <Tooltip title="Edit Pack" arrow>
            <IconButton
              onClick={() => onEdit(pack)}
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                width: 36,
                height: 36,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Pack" arrow>
            <IconButton
              onClick={() => onDelete(pack.pack_id)}
              size="small"
              sx={{
                backgroundColor: theme.palette.error.main,
                color: "white",
                width: 36,
                height: 36,
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <CardContent
          sx={{ p: 3, flexGrow: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                  }}
                >
                  {pack.pack_name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Chip
                    label={pack.pack_code}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    icon={categoryConfig.icon}
                    label={pack.category_name}
                    size="small"
                    sx={{
                      background: categoryConfig.gradient,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      "& .MuiChip-icon": {
                        color: "white",
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Status Badge */}
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: statusConfig.gradient,
                  boxShadow: `0 4px 12px ${statusConfig.color}40`,
                }}
              >
                {statusConfig.icon}
              </Avatar>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.5,
                fontStyle: "italic",
                height: 48, // Fixed height for description
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {pack.description}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, opacity: 0.6 }} />

          {/* Price Section */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.success.main}15 0%, ${theme.palette.success.main}05 100%)`,
              borderRadius: 3,
              p: 2,
              mb: 3,
              border: `1px solid ${theme.palette.success.main}20`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: theme.palette.success.main,
                  }}
                >
                  <PriceIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.success.main }}>
                    ₹{pack.pack_price.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {pack.pricing_model} Price
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ValidityIcon sx={{ fontSize: 16, color: theme.palette.info.main }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {pack.validity} {pack.validity_type}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Validity Period
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Benefits Grid - Flex-grow to take available space */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Grid container spacing={2}>
              {pack.onn_call_balance > 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`,
                      borderRadius: 2,
                      p: 1.5,
                      border: `1px solid ${theme.palette.primary.main}20`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CallIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        Voice Calls
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                      {pack.onn_assigned_call_balance}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: `${theme.palette.primary.main}20`,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              )}

              {pack.data_balance > 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.info.main}10 0%, ${theme.palette.info.main}05 100%)`,
                      borderRadius: 2,
                      p: 1.5,
                      border: `1px solid ${theme.palette.info.main}20`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <DataIcon sx={{ color: theme.palette.info.main, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        Data Allowance
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.info.main }}>
                      {pack.assigned_data_balance}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getDataUsagePercentage()}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: `${theme.palette.info.main}20`,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.info.main,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              )}

              {pack.onn_sms_balance > 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}10 0%, ${theme.palette.secondary.main}05 100%)`,
                      borderRadius: 2,
                      p: 1.5,
                      border: `1px solid ${theme.palette.secondary.main}20`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <SmsIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        SMS Messages
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                      {pack.onn_sms_balance} SMS
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: `${theme.palette.secondary.main}20`,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Status Footer */}
          <Box sx={{ mt: 2 }}>
            {pack.pack_status === "Rejected" && pack.approver_rejection_remark && (
              <Fade in={true}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    background: `linear-gradient(135deg, ${theme.palette.error.main}15 0%, ${theme.palette.error.main}05 100%)`,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.error.main}30`,
                  }}
                >
                  <Typography variant="caption" sx={{ color: theme.palette.error.main, fontWeight: 600 }}>
                    Rejection Reason:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary, mt: 0.5 }}>
                    {pack.approver_rejection_remark}
                  </Typography>
                </Box>
              </Fade>
            )}

            {pack.approver_name && pack.pack_status === "Approved" && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.success.main}10 0%, ${theme.palette.success.main}05 100%)`,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.success.main}20`,
                }}
              >
                <Avatar sx={{ width: 24, height: 24, backgroundColor: theme.palette.success.main }}>
                  <TrendingUpIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                    Approved by:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {pack.approver_name}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>

        {/* Animated Border Effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
            background: `linear-gradient(45deg, ${statusConfig.color}40, transparent, ${statusConfig.color}40)`,
            opacity: isHovered ? 0.1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </Card>
    </Zoom>
  )
}

export default PackCard
