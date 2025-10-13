import { Outlet } from "react-router-dom"
import DashboardSidebar from "../components/DashboardSidebar"
import DashboardTopbar from "../components/DashboardTopbar"
import CRMChatbot from "../pages/AIChatBot/CRMChatbot"
import { Box, CssBaseline, Toolbar } from "@mui/material"

const DashboardLayout = ({ children, toggleTheme, mode, customers = [], currentCustomer = null }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <DashboardTopbar toggleTheme={toggleTheme} mode={mode} />
      <DashboardSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Toolbar /> {/* Spacer for the top bar */}
        {children || <Outlet />}
      </Box>
      <CRMChatbot customers={customers} currentCustomer={currentCustomer} />
    </Box>
  )
}

export default DashboardLayout
