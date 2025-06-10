"use client"

import { useState } from "react"
import { Box, Container, Typography, Tabs, Tab, Paper } from "@mui/material"
import CampaignManagement from "./CampaignManagement"
import SimConversion from "./SimConversion"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`configuration-tabpanel-${index}`}
      aria-labelledby={`configuration-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Configuration() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuration Management
      </Typography>

      <Paper sx={{ width: "100%", mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="configuration tabs">
            <Tab label="Campaign Management" />
            <Tab label="SIM Conversion" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <CampaignManagement />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <SimConversion />
        </TabPanel>
      </Paper>
    </Container>
  )
}
