"use client"

import { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Box,
  Collapse,
  ListItemButton,
} from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import RequestQuoteIcon from "@mui/icons-material/RequestQuote"
import HandshakeIcon from "@mui/icons-material/Handshake"
import InventoryIcon from "@mui/icons-material/Inventory"
import AutoGraphIcon from "@mui/icons-material/AutoGraph"
import SettingsIcon from "@mui/icons-material/Settings"
import ScheduleIcon from "@mui/icons-material/Schedule"
import NotificationsIcon from "@mui/icons-material/Notifications"
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import RouterIcon from "@mui/icons-material/Router"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import AssessmentIcon from "@mui/icons-material/Assessment"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import StorageIcon from "@mui/icons-material/Storage"
import StoreIcon from "@mui/icons-material/Store"
import SmsIcon from "@mui/icons-material/Sms"
import EmailIcon from "@mui/icons-material/Email"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import SendIcon from "@mui/icons-material/Send"
import SpeedIcon from "@mui/icons-material/Speed" // Added icon for Rating Engine
import SecurityIcon from "@mui/icons-material/Security" // Added icon for Fraud Management
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber" // Added icon for Ticket Management

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState({})
  const theme = useTheme()
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleMenuClick = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  const menuItems = [
    // {
    //   icon: <AnalyticsIcon />,
    //   text: "Analytics",
    //   path: "/dashboard",
    // },
    {
      icon: <AnalyticsIcon />,
      text: "MIS Reports",
      path: "/dashboard/mis-reports",
    },
    {
      icon: <RecentActorsIcon />,
      text: "Customer",
      path: "/dashboard/iot",
    },
    {
      icon: <RequestQuoteIcon />,
      text: "Tarrif Management",
      path: "/dashboard/plan",
    },
    {
      icon: <HandshakeIcon />,
      text: "Partner Management",
      path: "/dashboard/partner",
    },
    {
      icon: <InventoryIcon />,
      text: "Inventory",
      path: "/dashboard/inventory",
    },
    {
      icon: <SpeedIcon />,
      text: "Rating Engine",
      path: "/dashboard/rating-engine",
    },
    {
      icon: <SecurityIcon />,
      text: "Fraud Management",
      path: "/dashboard/fraud-management",
    },
    {
      icon: <ConfirmationNumberIcon />,
      text: "Ticket Management",
      path: "/dashboard/ticket-management",
    },
    {
      icon: <AutoGraphIcon />,
      text: "Reports",
      path: "/dashboard/reports",
    },
    {
      icon: <SettingsIcon />,
      text: "Configuration",
      key: "configuration",
      submenus: [
        {
          icon: <ScheduleIcon />,
          text: "Schedule",
          key: "schedule",
          submenus: [
            {
              icon: <AssessmentIcon />,
              text: "Schedule Daily MIS",
              path: "/dashboard/config/schedule/daily-mis",
            },
            {
              icon: <TrendingUpIcon />,
              text: "Schedule Daily Revenue",
              path: "/dashboard/config/schedule/daily-revenue",
            },
            {
              icon: <StorageIcon />,
              text: "Schedule Inventory Report",
              path: "/dashboard/config/schedule/inventory-report",
            },
            {
              icon: <StoreIcon />,
              text: "Schedule Partner Report",
              path: "/dashboard/config/schedule/reseller-report",
            },
          ],
        },
        {
          icon: <NotificationsIcon />,
          text: "Configure Notification",
          key: "notification",
          submenus: [
            {
              icon: <SmsIcon />,
              text: "SMS Notification",
              path: "/dashboard/config/notification/sms",
            },
            {
              icon: <EmailIcon />,
              text: "Email Notification",
              path: "/dashboard/config/notification/email",
            },
          ],
        },
        {
          icon: <RouterIcon />,
          text: "Configure Mediation",
          key: "mediation",
          submenus: [
            {
              icon: <AccountBalanceIcon />,
              text: "Postpaid Mediation",
              path: "/dashboard/config/mediation/postpaid",
            },
            {
              icon: <CalendarTodayIcon />,
              text: "Bill Generate Date",
              path: "/dashboard/config/mediation/bill-generate",
            },
            {
              icon: <SendIcon />,
              text: "Bill Dispatch Date",
              path: "/dashboard/config/mediation/bill-dispatch",
            },
          ],
        },
        
      ],
    },
     {
      icon: <DoNotDisturbAltIcon />,
      text: "CVM Module InActive",
      path: "#",
      isInactive: true, // ✅ Added flag for inactive module
    },
  ]

  const renderMenuItem = (item, level = 0) => {
    const hasSubmenus = item.submenus && item.submenus.length > 0
    const isOpen = openMenus[item.key] || false
    const isActive = item.path && location.pathname === item.path
    const isInactiveItem = item.isInactive // ✅ Check if item is inactive

    if (hasSubmenus) {
      return (
        <Box key={item.key || item.text}>
          <ListItemButton
            onClick={() => handleMenuClick(item.key)}
            sx={{
              pl: 2 + level * 2,
              backgroundColor: isOpen
                ? theme.palette.mode === "dark"
                  ? "rgba(248,213,130,0.05)"
                  : "rgba(248,213,130,0.1)"
                : "inherit",
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              mb: 0.5,
              mx: 1,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <ListItemIcon
              sx={{
                color: isOpen ? theme.palette.primary.main : theme.palette.text.secondary,
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            {sidebarOpen && (
              <>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem",
                      fontWeight: isOpen ? 600 : 400,
                    },
                  }}
                />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItemButton>
          <Collapse in={isOpen && sidebarOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.submenus.map((submenu) => renderMenuItem(submenu, level + 1))}
            </List>
          </Collapse>
        </Box>
      )
    }

    return (
      <ListItem
        button
        key={item.path || item.text}
        component={item.path ? Link : "div"}
        to={item.path}
        sx={{
          pl: 2 + level * 2,
          backgroundColor: isActive
            ? theme.palette.mode === "dark"
              ? "rgba(248,213,130,0.1)"
              : "rgba(248,213,130,0.2)"
            : isInactiveItem
            ? theme.palette.mode === "dark"
              ? "rgba(244,67,54,0.1)" // Dark mode red background
              : "rgba(244,67,54,0.08)" // Light mode red background
            : "inherit",
          color: isInactiveItem 
            ? theme.palette.error.main // Red color for inactive items
            : isActive 
            ? theme.palette.text.primary 
            : theme.palette.text.secondary,
          borderLeft: isActive 
            ? `3px solid ${theme.palette.primary.main}` 
            : isInactiveItem
            ? `3px solid ${theme.palette.error.main}` // Red border for inactive
            : "3px solid transparent",
          "&:hover": {
            backgroundColor: isInactiveItem
              ? theme.palette.mode === "dark"
                ? "rgba(244,67,54,0.15)"
                : "rgba(244,67,54,0.12)"
              : theme.palette.action.hover,
            color: isInactiveItem 
              ? theme.palette.error.dark 
              : theme.palette.text.primary,
            transform: "translateX(2px)",
          },
          mb: 0.5,
          mx: 1,
          borderRadius: 1,
          transition: "all 0.2s ease-in-out",
          cursor: isInactiveItem ? "not-allowed" : "pointer", // Change cursor for inactive
        }}
        onClick={(e) => {
          if (isInactiveItem) {
            e.preventDefault() // Prevent navigation for inactive items
          }
        }}
      >
        <ListItemIcon
          sx={{
            color: isInactiveItem 
              ? theme.palette.error.main // Red icon for inactive
              : isActive 
              ? theme.palette.primary.main 
              : theme.palette.text.secondary,
            minWidth: 40,
          }}
        >
          {item.icon}
        </ListItemIcon>
        {sidebarOpen && (
          <ListItemText
            primary={item.text}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: level > 1 ? "0.8rem" : "0.875rem",
                fontWeight: isActive || isInactiveItem ? 600 : 400, // Bold for inactive too
                color: isInactiveItem ? "inherit" : "inherit",
              },
            }}
          />
        )}
      </ListItem>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 240 : 56,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarOpen ? 240 : 56,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.paper,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.divider,
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: theme.palette.text.secondary,
            },
          },
        }}
      >
        <List>{menuItems.map((item) => renderMenuItem(item))}</List>
      </Box>
    </Drawer>
  )
}

export default DashboardSidebar