"use client"

import { useState } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardHeader,
  Divider,
  useTheme,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  SimCard as SimCardIcon,
  Phone as PhoneIcon,
  Female as FemaleIcon,
  Male as MaleIcon,
  Star as VIPIcon,
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"

// Initial customer data structure
const initialCustomerState = {
  name: "",
  serviceType: "Prepaid",
  customerType: "Individual",
  simType: "Physical",
  msisdn: "",
  imsi: "",
  vip: false,
  gender: "Male",
  dob: new Date(),
  ekycToken: "",
  ekycDate: new Date(),
  ekycStatus: "Pending",
}

// Sample data
const sampleCustomers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  serviceType: ["Prepaid", "Postpaid", "Corporate"][Math.floor(Math.random() * 3)],
  customerType: ["Individual", "Business"][Math.floor(Math.random() * 2)],
  simType: ["Physical", "eSIM"][Math.floor(Math.random() * 2)],
  msisdn: `8801${Math.floor(100000000 + Math.random() * 900000000)}`,
  imsi: `4520${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  vip: Math.random() > 0.8,
  gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
  dob: new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  ekycToken: `EKYC${Math.floor(100000 + Math.random() * 900000)}`,
  ekycDate: new Date(
    2020 + Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28),
  ),
  ekycStatus: ["Verified", "Pending", "Rejected"][Math.floor(Math.random() * 3)],
}))

const Customer = () => {
  const theme = useTheme()
  const [customers, setCustomers] = useState(sampleCustomers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState)
  const [isEditMode, setIsEditMode] = useState(false)
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'warning', 'info'
  })

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // CRUD operations
  const handleAddCustomer = () => {
    setCurrentCustomer(initialCustomerState)
    setIsEditMode(false)
    setOpenDialog(true)
  }

  const handleEditCustomer = (customer) => {
    setCurrentCustomer({ ...customer })
    setIsEditMode(true)
    setOpenDialog(true)
  }

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
    setNotification({
      open: true,
      message: "Customer deleted successfully!",
      severity: "success",
    })
  }

  const handleSaveCustomer = () => {
    if (isEditMode) {
      setCustomers(customers.map((customer) => (customer.id === currentCustomer.id ? currentCustomer : customer)))
      setNotification({
        open: true,
        message: "Customer updated successfully!",
        severity: "success",
      })
    } else {
      const newCustomer = {
        ...currentCustomer,
        id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
      }
      setCustomers([...customers, newCustomer])
      setNotification({
        open: true,
        message: "Customer added successfully!",
        severity: "success",
      })
    }
    setOpenDialog(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCurrentCustomer((prev) => ({
      ...prev,
      [name]: date || new Date(),
    }))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Success Notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title="Customer Management"
            // subheader="Please go through with all the point"
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{ borderRadius: 2 }}
              >
                Add Customer
              </Button>
            }
          />
          <Divider />
          <Toolbar sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search customers..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
              }}
              sx={{ width: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Refresh">
              <IconButton>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Customer</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Service</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>SIM Details</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>VIP</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Gender</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>DOB</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>eKYC</TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {customer.customerType}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.serviceType}
                        color={customer.serviceType === "Postpaid" ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SimCardIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {customer.simType}
                        </Typography>
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body2">{customer.msisdn}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.vip ? (
                        <Chip icon={<VIPIcon />} label="VIP" color="warning" size="small" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Regular
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {customer.gender === "Female" ? (
                          <FemaleIcon color="error" sx={{ mr: 1 }} />
                        ) : customer.gender === "Male" ? (
                          <MaleIcon color="primary" sx={{ mr: 1 }} />
                        ) : null}
                        <Typography variant="body2">{customer.gender}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{format(customer.dob, "dd MMM yyyy")}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {customer.ekycStatus === "Verified" ? (
                          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        ) : customer.ekycStatus === "Rejected" ? (
                          <CancelIcon color="error" sx={{ mr: 1 }} />
                        ) : null}
                        <Typography variant="body2">{customer.ekycStatus}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEditCustomer(customer)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteCustomer(customer.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        {/* Customer Form Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{isEditMode ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={currentCustomer.name}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Service Type</InputLabel>
                  <Select
                    name="serviceType"
                    value={currentCustomer.serviceType}
                    onChange={handleInputChange}
                    label="Service Type"
                  >
                    <MenuItem value="Prepaid">Prepaid</MenuItem>
                    <MenuItem value="Postpaid">Postpaid</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Customer Type</InputLabel>
                  <Select
                    name="customerType"
                    value={currentCustomer.customerType}
                    onChange={handleInputChange}
                    label="Customer Type"
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>SIM Type</InputLabel>
                  <Select name="simType" value={currentCustomer.simType} onChange={handleInputChange} label="SIM Type">
                    <MenuItem value="Physical">Physical SIM</MenuItem>
                    <MenuItem value="eSIM">eSIM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MSISDN"
                  name="msisdn"
                  value={currentCustomer.msisdn}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="IMSI"
                  name="imsi"
                  value={currentCustomer.imsi}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={currentCustomer.gender} onChange={handleInputChange} label="Gender">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                  <DatePicker
                    label="Date of Birth"
                    value={currentCustomer.dob}
                    onChange={(date) => handleDateChange("dob", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="eKYC Token"
                  name="ekycToken"
                  value={currentCustomer.ekycToken}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <Box sx={{ mt: 2 }}>
                  <DatePicker
                    label="eKYC Date"
                    value={currentCustomer.ekycDate}
                    onChange={(date) => handleDateChange("ekycDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                      },
                    }}
                  />
                </Box>
                <FormControl fullWidth margin="normal">
                  <InputLabel>eKYC Status</InputLabel>
                  <Select
                    name="ekycStatus"
                    value={currentCustomer.ekycStatus}
                    onChange={handleInputChange}
                    label="eKYC Status"
                  >
                    <MenuItem value="Verified">Verified</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    VIP Customer:
                  </Typography>
                  <input type="checkbox" name="vip" checked={currentCustomer.vip} onChange={handleInputChange} />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveCustomer} variant="contained" color="primary">
              {isEditMode ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}

export default Customer