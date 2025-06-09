"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
  useTheme,
  Box,
  Paper,
  Avatar,
  Chip,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Fade,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  Close as CloseIcon,
  Info as InfoIcon,
  AttachMoney as PriceIcon,
  Schedule as ValidityIcon,
  Phone as CallIcon,
  Sms as SmsIcon,
  Wifi as DataIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const initialPackState = {
  pack_name: "",
  pack_code: "",
  creator_user_id: 1,
  approver_user_id: 0,
  approver_name: "",
  approver_rejection_remark: "",
  pack_status: "Pending",
  description: "",
  pricing_model: "Fixed",
  effective_date: null,
  billing_cycle: "Monthly",
  pack_price: 0,
  validity: 30,
  validity_type: "Days",
  onn_call_balance: 0,
  onn_call_balance_parameter: "Mins",
  onn_assigned_call_balance: "0 Mins",
  ofn_call_balance: 0,
  ofn_call_balance_parameter: "Mins",
  ofn_assigned_call_balance: "0 Mins",
  onn_sms_balance: 0,
  ofn_sms_balance: 0,
  data_balance: 0,
  data_balance_parameter: "GB",
  assigned_data_balance: "0 GB",
  category_name: "Prepaid",
  cug_mins: 0,
  cug_sms: 0,
  base_pack: {
    base_pack_id: 0,
    onn_sms_charges: "",
    onn_call_charges: "",
    ofn_sms_charges: "",
    ofn_call_charges: "",
    data_charges: "",
    roam_in_sms_tariff: 0,
    roam_in_call_tariff: 0,
    roam_in_data_Tariff: 0,
    roam_out_sms_tariff: 0,
    roam_out_call_tariff: 0,
    roam_out_data_tariff: 0,
    fup_id: 0,
    is_fup_enabled: false,
    fup_onn_sms_tariff: 0,
    fup_onn_call_tariff: 0,
    fup_ofn_sms_tariff: 0,
    fup_ofn_call_tariff: 0,
    fup_data_tariff: 0,
  },
}

const steps = ["Basic Info", "Pricing", "Benefits", "Settings"]

const PackForm = ({ open, onClose, onSave, pack, isEdit = false }) => {
  const theme = useTheme()
  const [formData, setFormData] = useState(initialPackState)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (pack && isEdit) {
      setFormData(pack)
    } else {
      setFormData(initialPackState)
    }
    setActiveStep(0)
  }, [pack, isEdit, open])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBasePackChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      base_pack: {
        ...prev.base_pack,
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSave = () => {
    const packToSave = {
      ...formData,
      pack_id: isEdit && pack ? pack.pack_id : Date.now(),
      onn_assigned_call_balance: `${formData.onn_call_balance} ${formData.onn_call_balance_parameter}`,
      ofn_assigned_call_balance: `${formData.ofn_call_balance} ${formData.ofn_call_balance_parameter}`,
      assigned_data_balance: `${formData.data_balance} ${formData.data_balance_parameter}`,
    }
    onSave(packToSave)
    onClose()
  }

  const getCategoryConfig = (category) => {
    switch (category) {
      case "Prepaid":
        return {
          color: theme.palette.primary.main,
          gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          icon: <CallIcon />,
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
          icon: <CategoryIcon />,
        }
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`,
                    border: `1px solid ${theme.palette.primary.main}20`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <InfoIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Basic Information
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Enter the fundamental details of your pack
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Pack Name"
                        value={formData.pack_name}
                        onChange={(e) => handleInputChange("pack_name", e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DescriptionIcon sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Pack Code"
                        value={formData.pack_code}
                        onChange={(e) => handleInputChange("pack_code", e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CodeIcon sx={{ color: theme.palette.secondary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={formData.category_name}
                          onChange={(e) => handleInputChange("category_name", e.target.value)}
                          label="Category"
                          sx={{
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          }}
                        >
                          <MenuItem value="Prepaid">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CallIcon sx={{ color: theme.palette.primary.main }} />
                              Prepaid
                            </Box>
                          </MenuItem>
                          <MenuItem value="Postpaid">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <SecurityIcon sx={{ color: theme.palette.secondary.main }} />
                              Postpaid
                            </Box>
                          </MenuItem>
                          <MenuItem value="FWA">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <DataIcon sx={{ color: theme.palette.info.main }} />
                              FWA
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={formData.pack_status}
                          onChange={(e) => handleInputChange("pack_status", e.target.value)}
                          label="Status"
                          sx={{
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          }}
                        >
                          <MenuItem value="Pending">
                            <Chip label="Pending" color="warning" size="small" />
                          </MenuItem>
                          <MenuItem value="Approved">
                            <Chip label="Approved" color="success" size="small" />
                          </MenuItem>
                          <MenuItem value="Rejected">
                            <Chip label="Rejected" color="error" size="small" />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )

      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.success.main}15 0%, ${theme.palette.success.main}05 100%)`,
                    border: `1px solid ${theme.palette.success.main}20`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <PriceIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Pricing & Validity
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Set the price and validity period for your pack
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Pack Price"
                        type="number"
                        value={formData.pack_price}
                        onChange={(e) => handleInputChange("pack_price", Number(e.target.value))}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PriceIcon sx={{ color: theme.palette.success.main }} />
                            </InputAdornment>
                          ),
                          endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Validity"
                        type="number"
                        value={formData.validity}
                        onChange={(e) => handleInputChange("validity", Number(e.target.value))}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ValidityIcon sx={{ color: theme.palette.info.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Validity Type</InputLabel>
                        <Select
                          value={formData.validity_type}
                          onChange={(e) => handleInputChange("validity_type", e.target.value)}
                          label="Validity Type"
                          sx={{
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          }}
                        >
                          <MenuItem value="Days">Days</MenuItem>
                          <MenuItem value="Months">Months</MenuItem>
                          <MenuItem value="Years">Years</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Pricing Model</InputLabel>
                        <Select
                          value={formData.pricing_model}
                          onChange={(e) => handleInputChange("pricing_model", e.target.value)}
                          label="Pricing Model"
                          sx={{
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          }}
                        >
                          <MenuItem value="Fixed">Fixed Price</MenuItem>
                          <MenuItem value="Variable">Variable Price</MenuItem>
                          <MenuItem value="Tiered">Tiered Pricing</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Billing Cycle</InputLabel>
                        <Select
                          value={formData.billing_cycle}
                          onChange={(e) => handleInputChange("billing_cycle", e.target.value)}
                          label="Billing Cycle"
                          sx={{
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          }}
                        >
                          <MenuItem value="Daily">Daily</MenuItem>
                          <MenuItem value="Weekly">Weekly</MenuItem>
                          <MenuItem value="Monthly">Monthly</MenuItem>
                          <MenuItem value="Quarterly">Quarterly</MenuItem>
                          <MenuItem value="Yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )

      case 2:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.info.main}15 0%, ${theme.palette.info.main}05 100%)`,
                    border: `1px solid ${theme.palette.info.main}20`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <DataIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Pack Benefits
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Configure the allowances and benefits for your pack
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    {/* Call Benefits */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}05 100%)`,
                          border: `1px solid ${theme.palette.primary.main}20`,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <CallIcon sx={{ color: theme.palette.primary.main }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Voice Call Benefits
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="On-Net Call Balance"
                              type="number"
                              value={formData.onn_call_balance}
                              onChange={(e) => handleInputChange("onn_call_balance", Number(e.target.value))}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Off-Net Call Balance"
                              type="number"
                              value={formData.ofn_call_balance}
                              onChange={(e) => handleInputChange("ofn_call_balance", Number(e.target.value))}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    {/* Data Benefits */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.info.main}10 0%, ${theme.palette.info.main}05 100%)`,
                          border: `1px solid ${theme.palette.info.main}20`,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <DataIcon sx={{ color: theme.palette.info.main }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Data Benefits
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Data Balance"
                              type="number"
                              value={formData.data_balance}
                              onChange={(e) => handleInputChange("data_balance", Number(e.target.value))}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">GB</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel>Data Parameter</InputLabel>
                              <Select
                                value={formData.data_balance_parameter}
                                onChange={(e) => handleInputChange("data_balance_parameter", e.target.value)}
                                label="Data Parameter"
                                sx={{
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                }}
                              >
                                <MenuItem value="MB">MB</MenuItem>
                                <MenuItem value="GB">GB</MenuItem>
                                <MenuItem value="TB">TB</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    {/* SMS Benefits */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main}10 0%, ${theme.palette.secondary.main}05 100%)`,
                          border: `1px solid ${theme.palette.secondary.main}20`,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <SmsIcon sx={{ color: theme.palette.secondary.main }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            SMS Benefits
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="On-Net SMS Balance"
                              type="number"
                              value={formData.onn_sms_balance}
                              onChange={(e) => handleInputChange("onn_sms_balance", Number(e.target.value))}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">SMS</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Off-Net SMS Balance"
                              type="number"
                              value={formData.ofn_sms_balance}
                              onChange={(e) => handleInputChange("ofn_sms_balance", Number(e.target.value))}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">SMS</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  background:
                                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )

      case 3:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.warning.main}15 0%, ${theme.palette.warning.main}05 100%)`,
                    border: `1px solid ${theme.palette.warning.main}20`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <SettingsIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Advanced Settings
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Configure advanced pack settings and policies
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.success.main}10 0%, ${theme.palette.success.main}05 100%)`,
                          border: `1px solid ${theme.palette.success.main}20`,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.base_pack.is_fup_enabled}
                              onChange={(e) => handleBasePackChange("is_fup_enabled", e.target.checked)}
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: theme.palette.success.main,
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                  backgroundColor: theme.palette.success.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Enable FUP (Fair Usage Policy)
                              </Typography>
                              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                Apply usage limits after certain thresholds
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Effective Date"
                        value={formData.effective_date ? new Date(formData.effective_date) : null}
                        onChange={(date) => handleInputChange("effective_date", date?.toISOString() || null)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                background:
                                  theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                              },
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="CUG Minutes"
                        type="number"
                        value={formData.cug_mins}
                        onChange={(e) => handleInputChange("cug_mins", Number(e.target.value))}
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="CUG SMS"
                        type="number"
                        value={formData.cug_sms}
                        onChange={(e) => handleInputChange("cug_sms", Number(e.target.value))}
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">SMS</InputAdornment>,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background:
                              theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )

      default:
        return null
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
                : `linear-gradient(145deg, ${theme.palette.common.white} 0%, ${theme.palette.grey[50]} 100%)`,
            minHeight: "80vh",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: "white",
            fontWeight: 700,
            fontSize: "1.5rem",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
              opacity: 0.3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {isEdit ? <SettingsIcon /> : <InfoIcon />}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                  {isEdit ? "Edit Pack" : "Create New Pack"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {isEdit ? "Update pack information" : "Configure your new telecom package"}
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Close">
              <IconButton
                onClick={onClose}
                sx={{
                  color: "white",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>

        {/* Stepper */}
        <Box sx={{ p: 3, pb: 0 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontWeight: 600,
                      color: index === activeStep ? theme.palette.primary.main : theme.palette.text.secondary,
                    },
                    "& .MuiStepIcon-root": {
                      color: index === activeStep ? theme.palette.primary.main : theme.palette.grey[400],
                      "&.Mui-completed": {
                        color: theme.palette.success.main,
                      },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <DialogContent sx={{ p: 3, minHeight: 400 }}>{renderStepContent(activeStep)}</DialogContent>

        {/* Actions */}
        <DialogActions
          sx={{
            p: 3,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[700]} 100%)`
                : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.common.white} 100%)`,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600,
              borderColor: theme.palette.grey[400],
              color: theme.palette.text.secondary,
            }}
          >
            Cancel
          </Button>

          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 600,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
            >
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: theme.shadows[4],
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                boxShadow: theme.shadows[4],
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isEdit ? "Update Pack" : "Create Pack"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default PackForm
