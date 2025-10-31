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
import Partner from './pages/Dealer/Partner';
import ScheduleDailyMIS from './pages/config/ScheduleDailyMIS';
import ScheduleDailyRevenue from './pages/config/ScheduleDailyRevenue';
import ScheduleInventoryReport from './pages/config/ScheduleInventoryReport';
import ScheduleResellerReport from './pages/config/ScheduleResellerReport';
import SMSNotification from './pages/config/SMSNotification';
import EmailNotification from './pages/config/EmailNotification';
import PostpaidMediation from './pages/config/PostpaidMediation';
import BillGenerateDate from './pages/config/BillGenerateDate';
import BillDispatchDate from './pages/config/BillDispatchDate';
import RatingEngine from './pages/RatingEngine/RatingEngine';
import MISReports from './pages/MISReport/MISReports';
import FraudManagement from './pages/FroudMangement/FraudManagement';
import TicketManagement from './pages/TicketManagemnt/TicketManagement';
import CVMPage from './pages/CVM/CVMPage';
import CorporateCustomer from './pages/Customer/CorporateCustomer';


function App() {
  const [mode, setMode] = useState('dark');

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
          path="/dashboard/Cvm"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <CVMPage />
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
          path="/dashboard/rating-engine"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <RatingEngine />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/mis-reports"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <MISReports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/coporate"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <CorporateCustomer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/fraud-management"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <FraudManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/ticket-management"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <TicketManagement />
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
          path="/dashboard/partner"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <Partner />
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
         <Route
          path="/dashboard/config/schedule/daily-mis"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ScheduleDailyMIS />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/dashboard/config/schedule/daily-revenue"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ScheduleDailyRevenue />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/config/schedule/inventory-report"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ScheduleInventoryReport />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
       
       <Route
          path="/dashboard/config/schedule/inventory-report"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ScheduleInventoryReport />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/config/schedule/reseller-report"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <ScheduleResellerReport />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/config/notification/sms"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <SMSNotification />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
          <Route
          path="/dashboard/config/notification/email"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <EmailNotification />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/config/mediation/postpaid"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <PostpaidMediation />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/config/mediation/bill-generate"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <BillGenerateDate />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard/config/mediation/bill-dispatch"
          element={
            <ProtectedRoute>
              <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
                <BillDispatchDate />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
       
      </Routes>
    </ThemeProvider>
  );
}

export default App;