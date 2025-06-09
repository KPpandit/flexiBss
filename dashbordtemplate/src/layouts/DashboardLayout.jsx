import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import { Box, CssBaseline, Toolbar } from '@mui/material';

const DashboardLayout = ({ children, toggleTheme, mode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardTopbar toggleTheme={toggleTheme} mode={mode} />
      <DashboardSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Spacer for the top bar */}
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default DashboardLayout;