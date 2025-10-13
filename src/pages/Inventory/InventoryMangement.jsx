"use client"

import { useState } from "react"
import { Box, Tabs, Tab, Typography, useTheme, Paper, Container } from "@mui/material"
import { SimCard as SimIcon, Router as RouterIcon } from "@mui/icons-material"
import SimManagement from "./SimInventory/SimManagement"
import RouterManagement from "./router/RouterManagement"

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
        background: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          }}
        >
          <Box>
           <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 600,
                            marginBottom:1,
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          }}
                        >
              Inventory Management
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.7, fontWeight: 400 }}>
              Manage your SIM cards and router inventory efficiently
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            background: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
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
                color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                "&.Mui-selected": {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                },
              },
              "& .MuiTabs-indicator": {
                height: 4,
                borderRadius: 0,
                background: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SimIcon />
                  <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                    SIM Management
                  </Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
