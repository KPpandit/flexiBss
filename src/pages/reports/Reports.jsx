"use client"

import { useState, lazy, Suspense } from "react"
import {
  Box,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
} from "@mui/material"
import {
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Public as PublicIcon,
  Business as BusinessIcon,
  PhoneAndroid as PhoneAndroidIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material"

const UsageReportSection = lazy(() => import("./UsageReportSection"))
const CustomerPackSection = lazy(() => import("./CustomerPackSection"))
const CDRDetailsSection = lazy(() => import("./CDRDetailsSection"))
const IDDReportsSection = lazy(() => import("./IDDReportsSection"))
const PartnerReportSection = lazy(() => import("./PartnerReportSection"))
const PrepaidPostpaidReportSection = lazy(() => import("./PrepaidPostpaidReportSection"))
const MainBalanceReportSection = lazy(() => import("./MainBalanceReportSection"))

export default function Report() {
  const theme = useTheme()
  const [expanded, setExpanded] = useState("panel1")

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const sections = [
    {
      id: "panel1",
      title: "Usage Reports",
      icon: <TrendingUpIcon />,
      badge: "Live",
      component: UsageReportSection,
    },
    {
      id: "panel2",
      title: "Customer Pack Details",
      icon: <PeopleIcon />,
      badge: "Active",
      component: CustomerPackSection,
    },
    {
      id: "panel3",
      title: "CDR Details",
      icon: <AssessmentIcon />,
      badge: "Real-time",
      component: CDRDetailsSection,
    },
    {
      id: "panel4",
      title: "IDD Reports",
      icon: <PublicIcon />,
      badge: "Analytics",
      component: IDDReportsSection,
    },
    {
      id: "panel5",
      title: "Partner Reports",
      icon: <BusinessIcon />,
      badge: "Revenue",
      component: PartnerReportSection,
    },
    {
      id: "panel6",
      title: "Prepaid & Postpaid Reports",
      icon: <PhoneAndroidIcon />,
      badge: "Segments",
      component: PrepaidPostpaidReportSection,
    },
    {
      id: "panel7",
      title: "Main Balance Reports",
      icon: <AccountBalanceIcon />,
      badge: "Balance",
      component: MainBalanceReportSection,
    },
  ]

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "1.1rem",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          mb: 2,
        }}
      >
        Reports Dashboard
      </Typography>

      {sections.map((section) => {
        const SectionComponent = section.component

        return (
          <Accordion
            key={section.id}
            expanded={expanded === section.id}
            onChange={handleChange(section.id)}
            sx={{
              mb: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: "0 0 16px 0",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />}
              sx={{
                "& .MuiAccordionSummary-content": {
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                }}
              >
                {section.icon}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                {section.title}
              </Typography>
              <Chip
                label={section.badge}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  bgcolor: theme.palette.mode === "dark" ? "#333333" : "#f5f5f5",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  border: `1px solid ${theme.palette.mode === "dark" ? "#666666" : "#e0e0e0"}`,
                }}
              />
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              {expanded === section.id && (
                <Suspense
                  fallback={
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
                      <CircularProgress
                        size={40}
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      />
                    </Box>
                  }
                >
                  <SectionComponent />
                </Suspense>
              )}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
