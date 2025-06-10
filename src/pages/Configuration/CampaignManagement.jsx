"use client"

import { useState } from "react"
import { Box, Tabs, Tab, Paper, Typography } from "@mui/material"
import SingleCampaign from "./SingleCampaign"
import BulkCampaign from "./BulkCampaign"
import BatchCampaign from "./BatchCampaign"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function CampaignManagement() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Campaign Management
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="campaign tabs">
            <Tab label="Single Campaign" />
            <Tab label="Bulk Campaign" />
            <Tab label="Batch Campaign" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SingleCampaign />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <BulkCampaign />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <BatchCampaign />
        </TabPanel>
      </Paper>
    </Box>
  )
}
