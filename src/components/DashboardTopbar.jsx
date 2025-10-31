"use client"

import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem, Avatar, Box, useTheme } from "@mui/material"
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const DashboardTopbar = ({ toggleTheme, mode }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn")

    // Navigate to login page
    navigate("/", { replace: true })

    // Prevent back navigation after logout
    window.history.pushState(null, "", window.location.href)
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href)
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(45deg, #000000 30%, #1a1a1a 90%)`
            : `linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: "48px !important", py: 0.5 }}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            mr: 1.5,
            color: theme.palette.text.primary,
            padding: "6px",
          }}
        >
          <MenuIcon sx={{ fontSize: "1.25rem" }} />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            color: theme.palette.text.primary,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          SAIRFlex BSS/OSS
        </Typography>

        <Select
          value={mode}
          onChange={toggleTheme}
          size="small"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(248,213,130,0.1)" : "rgba(248,213,130,0.2)",
            color: theme.palette.text.primary,
            mr: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            fontSize: "0.8rem",
            height: "32px",
            "& .MuiSelect-select": {
              py: 0.5,
              px: 1,
            },
            "& .MuiSelect-icon": {
              color: theme.palette.text.primary,
            },
          }}
          renderValue={(value) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {value === "dark" ? (
                <DarkModeIcon sx={{ fontSize: "1rem" }} />
              ) : (
                <LightModeIcon sx={{ fontSize: "1rem" }} />
              )}
              <Typography sx={{ ml: 0.75, color: theme.palette.text.primary, fontSize: "0.8rem" }}>
                {value === "dark" ? "Dark Mode" : "Light Mode"}
              </Typography>
            </Box>
          )}
        >
          <MenuItem value="light" sx={{ fontSize: "0.8rem" }}>
            <LightModeIcon sx={{ fontSize: "1rem", mr: 1 }} />
            Light
          </MenuItem>
          <MenuItem value="dark" sx={{ fontSize: "0.8rem" }}>
            <DarkModeIcon sx={{ fontSize: "1rem", mr: 1 }} />
            Dark
          </MenuItem>
        </Select>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: "0.8rem" }}>
              Hello, Admin
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.mode === "dark" ? "#000000" : "#000000",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          >
            A
          </Avatar>

          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{
              color: theme.palette.text.primary,
              padding: "6px",
              ml: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: theme.palette.mode === "dark" ? "#ff6b6b" : "#d32f2f",
                transform: "scale(1.1)",
              },
            }}
            title="Logout"
          >
            <LogoutIcon sx={{ fontSize: "1.1rem" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardTopbar
