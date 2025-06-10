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
      color: theme.palette.primary.main,
    },
    {
      label: "Customer Pack Details",
      icon: <PeopleIcon />,
      component: <CustomerPackSection />,
      color: theme.palette.success.main,
    },
    {
      label: "CDR Details",
      icon: <AssessmentIcon />,
      component: <CDRDetailsSection />,
      color: theme.palette.info.main,
    },
    {
      label: "IDD Reports",
      icon: <PublicIcon />,
      component: <IDDReportsSection />,
      color: theme.palette.warning.main,
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
          borderRadius: theme.shape.borderRadius,
          p: 1,
          boxShadow: 3,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.main,
            mb: 1,
          }}
        >
          Reports
        </Typography>
       
      </Box>

      {/* Navigation Tabs */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: theme.shape.borderRadius,
          boxShadow: 3,
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
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
