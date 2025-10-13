"use client"

import { useState } from "react"
import { Box, Typography, Paper, useTheme, Tabs, Tab, Button, Collapse, Grid } from "@mui/material"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"

const FraudManagement = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [rulesExpanded, setRulesExpanded] = useState(true)

  // Scatter plot data for Anomaly Overview tab
  const callDurationData = [
    ...Array.from({ length: 50 }, () => ({
      calls: Math.random() * 20,
      duration: Math.random() * 25,
      anomaly: false,
    })),
    ...Array.from({ length: 15 }, () => ({
      calls: 30 + Math.random() * 70,
      duration: 30 + Math.random() * 110,
      anomaly: true,
    })),
  ]

  const smsDurationData = [
    ...Array.from({ length: 40 }, () => ({
      sms: Math.random() * 50,
      duration: Math.random() * 25,
      anomaly: false,
    })),
    ...Array.from({ length: 20 }, () => ({
      sms: 100 + Math.random() * 350,
      duration: 20 + Math.random() * 120,
      anomaly: true,
    })),
  ]

  const dataCallsData = [
    ...Array.from({ length: 60 }, () => ({
      data: Math.random() * 500,
      calls: Math.random() * 20,
      anomaly: false,
    })),
    ...Array.from({ length: 15 }, () => ({
      data: 500 + Math.random() * 1700,
      calls: Math.random() * 20,
      anomaly: true,
    })),
  ]

  // Built-in rules data for View Rules tab
  const builtInRules = [
    { rule: "roaming == 1 and num_calls_day > 30" },
    { rule: "call_duration > 20 and num_unique_dests > 10" },
    { rule: "sms_count > 200" },
    { rule: "data_volume_mb > 5000" },
    { rule: "sms_count > 100 and data_volume_mb == 0" },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1.5,
          }}
        >
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: theme.palette.text.primary }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value}
            </Typography>
          ))}
        </Box>
      )
    }
    return null
  }

  const renderRuleWithSyntaxHighlight = (rule) => {
    const parts = rule.split(/(\s+|==|>|<|and|or|\d+)/)
    return (
      <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.95rem" }}>
        {parts.map((part, index) => {
          let color = theme.palette.text.primary
          if (part === "and" || part === "or") color = "#4A90E2"
          else if (part === "==" || part === ">" || part === "<") color = "#FF9800"
          else if (/^\d+$/.test(part)) color = "#26A69A"
          return (
            <span key={index} style={{ color }}>
              {part}
            </span>
          )
        })}
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
        Fraud Management
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Anomaly Overview" />
          <Tab label="View Rules" />
        </Tabs>
      </Box>

      {/* Tab 0: Anomaly Overview */}
      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              component="img"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23E57373' strokeWidth='2'%3E%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E%3C/svg%3E"
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography variant="h5" fontWeight="600">
              Anomaly Overview
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Call vs Duration */}
            <Grid sx={{width:'32%'}} item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>
                    📞
                  </Box>
                  <Typography variant="h6" fontWeight="600">
                    Call vs Duration
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                  }}
                >
                  Zoom Call Chart
                </Button>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis
                      type="number"
                      dataKey="calls"
                      name="Calls/Day"
                      label={{ value: "Calls/Day", position: "bottom" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis
                      type="number"
                      dataKey="duration"
                      name="Duration"
                      label={{ value: "Duration", angle: -90, position: "insideLeft" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={callDurationData}>
                      {callDurationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.anomaly ? "#E57373" : "#4A90E2"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* SMS vs Duration */}
            <Grid sx={{width:'32%'}} item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>
                    💬
                  </Box>
                  <Typography variant="h6" fontWeight="600">
                    SMS vs Duration
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                  }}
                >
                  Zoom SMS Chart
                </Button>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis
                      type="number"
                      dataKey="sms"
                      name="SMS Count"
                      label={{ value: "SMS Count", position: "bottom" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis
                      type="number"
                      dataKey="duration"
                      name="Call Duration"
                      label={{ value: "Call Duration", angle: -90, position: "insideLeft" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={smsDurationData}>
                      {smsDurationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.anomaly ? "#E57373" : "#50C878"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Data vs Calls */}
            <Grid sx={{width:'32%'}} item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>
                    📊
                  </Box>
                  <Typography variant="h6" fontWeight="600">
                    Data vs Calls
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                  }}
                >
                  Zoom Data Chart
                </Button>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis
                      type="number"
                      dataKey="data"
                      name="Data MB"
                      label={{ value: "Data MB", position: "bottom" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis
                      type="number"
                      dataKey="calls"
                      name="Calls/Day"
                      label={{ value: "Calls/Day", angle: -90, position: "insideLeft" }}
                      stroke={theme.palette.text.secondary}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={dataCallsData}>
                      {dataCallsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.anomaly ? "#E57373" : "#9C27B0"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Tab 1: View Rules */}
      {activeTab === 1 && (
        <Box>
          <Paper
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => setRulesExpanded(!rulesExpanded)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>
                  📘
                </Box>
                <Typography variant="h6" fontWeight="600">
                  View Rules
                </Typography>
              </Box>
              <ExpandMoreIcon
                sx={{
                  transform: rulesExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </Box>

            <Collapse in={rulesExpanded}>
              <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                Built-in Rules:
              </Typography>
              <Box
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? "#0d0d0d" : "#f5f5f5",
                  p: 2,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {builtInRules.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: index < builtInRules.length - 1 ? 2 : 0,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {renderRuleWithSyntaxHighlight(item.rule)}
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Paper>
        </Box>
      )}
    </Box>
  )
}

export default FraudManagement
