import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel, Select,
  MenuItem, Grid, Box, Typography, useTheme, Divider,
  RadioGroup, FormControlLabel, Radio, Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PlanForm = ({ open, onClose, onSave, plan, isEdit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState(plan || {
    pack_name: '',
    pack_code: '',
    description: '',
    pricing_model: 'Fixed',
    pack_price: 0,
    validity: 30,
    validity_type: 'Days',
    data_balance: 0,
    data_balance_parameter: 'GB',
    category_name: 'FWA',
    pack_status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const completePlan = {
      ...formData,
      assigned_data_balance: `${formData.data_balance} ${formData.data_balance_parameter}`
    };
    onSave(completePlan);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>
          {isEdit ? 'Edit Plan' : 'Create New Plan'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plan Name"
                name="pack_name"
                value={formData.pack_name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Plan Code"
                name="pack_code"
                value={formData.pack_code}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Pricing Model</InputLabel>
                <Select
                  name="pricing_model"
                  value={formData.pricing_model}
                  onChange={handleChange}
                  label="Pricing Model"
                >
                  <MenuItem value="Fixed">Fixed</MenuItem>
                  <MenuItem value="Variable">Variable</MenuItem>
                  <MenuItem value="Usage-based">Usage-based</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Price"
                name="pack_price"
                type="number"
                value={formData.pack_price}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: '₹'
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="FWA">FWA</MenuItem>
                  <MenuItem value="Prepaid">Prepaid</MenuItem>
                  <MenuItem value="Postpaid">Postpaid</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Divider>
                <Chip label="Plan Details" color="primary" />
              </Divider>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Data Balance"
                  name="data_balance"
                  type="number"
                  value={formData.data_balance}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Unit</InputLabel>
                  <Select
                    name="data_balance_parameter"
                    value={formData.data_balance_parameter}
                    onChange={handleChange}
                    label="Unit"
                  >
                    <MenuItem value="MB">MB</MenuItem>
                    <MenuItem value="GB">GB</MenuItem>
                    <MenuItem value="TB">TB</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Validity"
                  name="validity"
                  type="number"
                  value={formData.validity}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Validity Type</InputLabel>
                  <Select
                    name="validity_type"
                    value={formData.validity_type}
                    onChange={handleChange}
                    label="Validity Type"
                  >
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                    <MenuItem value="Years">Years</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default PlanForm;