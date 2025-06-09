"use client"
import React, { useState } from 'react';
import {
  Box, Tabs, Tab, Paper, Typography, Button, useTheme,
  Divider, IconButton, Tooltip, Snackbar, Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Cancel as RejectedIcon
} from '@mui/icons-material';
import PlanList from './PlanList';
import PlanForm from './PlanForm';
import { samplePlans } from './PlanData';

const PlanManagement = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState('approved');
  const [plans, setPlans] = useState(samplePlans);
  const [openForm, setOpenForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPlans = plans.filter(plan => {
    if (tabValue === 'approved') return plan.pack_status === 'Approved';
    if (tabValue === 'pending') return plan.pack_status === 'Pending';
    if (tabValue === 'rejected') return plan.pack_status === 'Rejected';
    return true;
  });

  const handleAddPlan = () => {
    setCurrentPlan(null);
    setIsEditMode(false);
    setOpenForm(true);
  };

  const handleEditPlan = (plan) => {
    setCurrentPlan(plan);
    setIsEditMode(true);
    setOpenForm(true);
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.pack_id !== id));
    showNotification('Plan deleted successfully!', 'success');
  };

  const handleSavePlan = (planData) => {
    if (isEditMode) {
      setPlans(plans.map(plan => plan.pack_id === planData.pack_id ? planData : plan));
      showNotification('Plan updated successfully!', 'success');
    } else {
      const newPlan = {
        ...planData,
        pack_id: Math.max(...plans.map(p => p.pack_id)) + 1
      };
      setPlans([...plans, newPlan]);
      showNotification('Plan added successfully!', 'success');
    }
    setOpenForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setPlans(plans.map(plan => 
      plan.pack_id === id ? { ...plan, pack_status: newStatus } : plan
    ));
    showNotification(`Plan status changed to ${newStatus}`, 'success');
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Telecom Plan Management
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
        Manage all telecom plans and their approval status
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            }
          }}
        >
          <Tab 
            value="approved" 
            label="Approved Plans" 
            icon={<ApprovedIcon />}
            iconPosition="start"
            sx={{ color: theme.palette.success.main }}
          />
          <Tab 
            value="pending" 
            label="Pending Approval" 
            icon={<PendingIcon />}
            iconPosition="start"
            sx={{ color: theme.palette.warning.main }}
          />
          <Tab 
            value="rejected" 
            label="Rejected Plans" 
            icon={<RejectedIcon />}
            iconPosition="start"
            sx={{ color: theme.palette.error.main }}
          />
        </Tabs>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddPlan}
          sx={{ borderRadius: 2 }}
        >
          Add New Plan
        </Button>
      </Box>

      <Paper 
        sx={{ 
          p: 2,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          boxShadow: theme.shadows[3],
          borderRadius: 2
        }}
      >
        <PlanList 
          plans={filteredPlans} 
          onEdit={handleEditPlan} 
          onDelete={handleDeletePlan}
          onStatusChange={handleStatusChange}
          statusFilter={tabValue}
        />
      </Paper>

      <PlanForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSavePlan}
        plan={currentPlan}
        isEdit={isEditMode}
      />
    </Box>
  );
};

export default PlanManagement;