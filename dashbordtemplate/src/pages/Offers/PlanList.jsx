import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, Tooltip, useTheme, Box, Typography, TablePagination
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  PendingActions as PendingIcon
} from '@mui/icons-material';

const PlanList = ({ plans, onEdit, onDelete, onStatusChange, statusFilter }) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 
                theme.palette.grey[900] : theme.palette.grey[100]
            }}>
              <TableCell sx={{ color: theme.palette.text.primary }}>Plan Name</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Plan Code</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Category</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Price</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Data Balance</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Validity</TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>Status</TableCell>
              <TableCell align="right" sx={{ color: theme.palette.text.primary }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((plan) => (
              <TableRow key={plan.pack_id} hover>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  <Typography fontWeight="medium">{plan.pack_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plan.description}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{plan.pack_code}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  <Chip 
                    label={plan.category_name} 
                    size="small" 
                    color="primary"
                  />
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  ₹{plan.pack_price.toFixed(2)}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {plan.assigned_data_balance}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {plan.validity} {plan.validity_type}
                </TableCell>
                <TableCell>
                  <Chip
                    label={plan.pack_status}
                    color={getStatusColor(plan.pack_status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(plan)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(plan.pack_id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  
                  {statusFilter === 'pending' && (
                    <>
                      <Tooltip title="Approve">
                        <IconButton onClick={() => onStatusChange(plan.pack_id, 'Approved')}>
                          <ApproveIcon color="success" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton onClick={() => onStatusChange(plan.pack_id, 'Rejected')}>
                          <RejectIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={plans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: theme.palette.text.primary }}
      />
    </>
  );
};

export default PlanList;