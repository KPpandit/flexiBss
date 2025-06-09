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
        {/* <Route
          path="/dashboard/forms"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <FormsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/dashboard/ui-features"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <UiFeatures />
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/dashboard/modal-overlays"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ModalOverlays />
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/dashboard/extra-components"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ExtraComponents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/maps"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <MapsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/charts"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ChartsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;