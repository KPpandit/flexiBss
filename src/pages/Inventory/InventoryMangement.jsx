"use client"

import { useState } from "react"
import { Box, Tabs, Tab, Typography, useTheme, Paper, Container } from "@mui/material"
import { SimCard as SimIcon, Router as RouterIcon } from "@mui/icons-material"
import SimManagement from "../Inventory/SimInventory/SimManagement"
import RouterManagement from "../Inventory/Router/RouterManagement"

const InventoryManagement = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? `radial-gradient(ellipse at top, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
            : `radial-gradient(ellipse at top, ${theme.palette.grey[50]} 0%, ${theme.palette.common.white} 100%)`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`
                : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.secondary.light} 100%)`,
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              Inventory Management
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Manage your SIM cards and router inventory efficiently
            </Typography>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper
          elevation={2}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            background: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.common.white,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: "1rem",
                py: 3,
                transition: "all 0.3s ease",
                "&.Mui-selected": {
                  color: "white",
                },
              },
              "& .MuiTabs-indicator": {
                height: "100%",
                borderRadius: 0,
                background:
                  activeTab === 0
                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                zIndex: 0,
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
                  <SimIcon />
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    SIM Management
                  </Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
                  <RouterIcon />
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    Router Management
                  </Typography>
                </Box>
              }
            />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && <SimManagement />}
        {activeTab === 1 && <RouterManagement />}
      </Container>
    </Box>
  )
}

export default InventoryManagement
