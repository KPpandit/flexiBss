"use client"

import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem, Avatar, Box, useTheme } from "@mui/material"
import { Menu as MenuIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from "@mui/icons-material"

const DashboardTopbar = ({ toggleTheme, mode }) => {
  const theme = useTheme()

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
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            mr: 2,
            color: theme.palette.text.primary, // Use theme text color
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            color: theme.palette.text.primary, // Use theme text color
          }}
        >
          Flexi 5G BSS
        </Typography>

        <Select
          value={mode}
          onChange={toggleTheme}
          size="small"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(248,213,130,0.1)" : "rgba(248,213,130,0.2)",
            color: theme.palette.text.primary,
            mr: 2,
            border: `1px solid ${theme.palette.divider}`,
            "& .MuiSelect-icon": {
              color: theme.palette.text.primary,
            },
          }}
          renderValue={(value) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {value === "dark" ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
              <Typography sx={{ ml: 1, color: theme.palette.text.primary }}>
                {value === "dark" ? "Dark Mode" : "Light Mode"}
              </Typography>
            </Box>
          )}
        >
          <MenuItem value="light">
            <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
            Light
          </MenuItem>
          <MenuItem value="dark">
            <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
            Dark
          </MenuItem>
        </Select>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              Hello, Admin
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main, // Use golden color
              color: theme.palette.mode === "dark" ? "#000000" : "#000000", // Black text on golden background
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardTopbar
