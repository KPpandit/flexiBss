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
  CalendarToday as ValidityIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
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
        }
      case "Pending":
        return {
          icon: <PendingIcon />,
          color: theme.palette.warning.main,
        }
      case "Rejected":
        return {
          icon: <RejectedIcon />,
          color: theme.palette.error.main,
        }
      default:
        return {
          icon: <PendingIcon />,
          color: theme.palette.grey[500],
        }
    }
  }

  const getCategoryConfig = (category) => {
    switch (category) {
      case "Prepaid":
        return {
          color: theme.palette.primary.main,
          icon: <CallIcon />,
        }
      case "Postpaid":
        return {
          color: theme.palette.secondary.main,
          icon: <SmsIcon />,
        }
      case "FWA":
        return {
          color: theme.palette.info.main,
          icon: <DataIcon />,
        }
      default:
        return {
          color: theme.palette.grey[500],
          icon: <StarIcon />,
        }
    }
  }

  const getDataUsagePercentage = () => {
    // Mock calculation for visual appeal
    return Math.min((pack.data_balance / 1000) * 100, 100)
  }

  const statusConfig = getStatusConfig(pack.pack_status)
  const categoryConfig = getCategoryConfig(pack.category_name)

  return (
    <Zoom in={true} timeout={600}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: "100%",
          minHeight: 580,
          display: "flex",
          flexDirection: "column",
          width: 550,
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
          backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
          border: isHovered
            ? theme.palette.mode === "dark"
              ? "1px solid #ffffff"
              : "1px solid #000000"
            : theme.palette.mode === "dark"
              ? "1px solid #666666"
              : "1px solid #e0e0e0",
          boxShadow: isHovered
            ? theme.palette.mode === "dark"
              ? "0 20px 40px rgba(255,255,255,0.1)"
              : "0 20px 40px rgba(0,0,0,0.15)"
            : theme.shadows[4],
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
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                width: 36,
                height: 36,
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
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
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
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
                      backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    icon={categoryConfig.icon}
                    label={pack.category_name}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </Box>

              {/* Status Badge */}
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                }}
              >
                {statusConfig.icon}
              </Avatar>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                lineHeight: 1.5,
                fontStyle: "italic",
                height: 48,
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

          <Divider
            sx={{
              my: 2,
              opacity: 0.6,
              borderColor: theme.palette.mode === "dark" ? "#666666" : "#e0e0e0",
            }}
          />

          {/* Price Section */}
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
              borderRadius: 3,
              p: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    $ {pack.pack_price.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                    }}
                  >
                    {pack.pricing_model} Price
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ValidityIcon
                    sx={{
                      fontSize: 16,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    {pack.validity} {pack.validity_type}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                  }}
                >
                  Validity Period
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Benefits Grid */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Grid container spacing={2}>
              {pack.onn_call_balance > 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CallIcon
                        sx={{
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        Voice Calls
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {pack.onn_assigned_call_balance}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
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
                      backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <DataIcon
                        sx={{
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        Data Allowance
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {pack.assigned_data_balance}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getDataUsagePercentage()}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
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
                      backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <SmsIcon
                        sx={{
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        SMS Messages
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {pack.onn_sms_balance} SMS
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
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
                    backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.error.main,
                      fontWeight: 600,
                    }}
                  >
                    Rejection Reason:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mt: 0.5,
                    }}
                  >
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
                  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: theme.palette.success.main,
                  }}
                >
                  <TrendingUpIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.success.main,
                      fontWeight: 600,
                    }}
                  >
                    Approved by:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontWeight: 600,
                    }}
                  >
                    {pack.approver_name}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  )
}

export default PackCard
