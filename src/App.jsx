import { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { lightTheme, darkTheme } from './theme';

// Dashboard pages
import DashboardHome from './pages/dashboard/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Customer from './pages/Customer/Customer';
import Offers from './pages/Offers/Offers';
import PlanManagement from './pages/Offers/PlanManagement';
import PackManagement from './pages/OtherOffer/PackManagement';
import DealerManagement from './pages/Dealer/DealerMangemnt';
import InventoryMangement from './pages/Inventory/InventoryMangement';
import Configuration from './pages/Configuration/Configuration';
import Report from './pages/reports/Reports';
import SimConversion from './pages/Configuration/SimConversion';
import CampaignManagement from './pages/Configuration/CampaignManagement';


function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/iot"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <Customer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/plan"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <PackManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/dealer"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <DealerManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/inventory"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <InventoryMangement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/config"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <CampaignManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/simConver"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <SimConversion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <Report />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
       
       
      </Routes>
    </ThemeProvider>
  );
}

export default App;