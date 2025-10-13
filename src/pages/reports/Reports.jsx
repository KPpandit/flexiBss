"use client"

import { useState } from "react"
import { Box, Typography, Paper, Tabs, Tab, useTheme, Container } from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Public as PublicIcon,
} from "@mui/icons-material"
import UsageReportSection from "./UsageReportSection"
import CustomerPackSection from "./CustomerPackSection"
import CDRDetailsSection from "./CDRDetailsSection"
import IDDReportsSection from "./IDDReportsSection"

export default function Report() {
  const theme = useTheme()
  const [activeSection, setActiveSection] = useState(0)

  const handleSectionChange = (event, newValue) => {
    setActiveSection(newValue)
  }

  const tabData = [
    {
      label: "Usage Reports",
      icon: <TrendingUpIcon />,
      component: <UsageReportSection />,
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    },
    {
      label: "Customer Pack Details",
      icon: <PeopleIcon />,
      component: <CustomerPackSection />,
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    },
    {
      label: "CDR Details",
      icon: <AssessmentIcon />,
      component: <CDRDetailsSection />,
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    },
    {
      label: "IDD Reports",
      icon: <PublicIcon />,
      component: <IDDReportsSection />,
      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: "left",
          mb: 2,
          borderRadius: 2,
          p: 3,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
        }}
      >
         <Typography variant="h4" sx={{ mb: 0, fontWeight: 600, color: theme.palette.text.primary }}>
          Reports
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
        }}
      >
        <Tabs
          value={activeSection}
          onChange={handleSectionChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              minHeight: 80,
              color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
            },
            "& .Mui-selected": {
              color: tabData[activeSection]?.color,
            },
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 2,
              backgroundColor: tabData[activeSection]?.color,
            },
          }}
        >
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              sx={{
                color: activeSection === index ? tab.color : "inherit",
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Content Area */}
      <Box sx={{ minHeight: "60vh" }}>
        {activeSection === 0 && <UsageReportSection />}
        {activeSection === 1 && <CustomerPackSection />}
        {activeSection === 2 && <CDRDetailsSection />}
        {activeSection === 3 && <IDDReportsSection />}
      </Box>
    </Container>
  )
}
