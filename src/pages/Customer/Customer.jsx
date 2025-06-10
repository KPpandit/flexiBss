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
  Typography,
  Avatar,
  Chip,
  Card,
  CardHeader,
  Divider,
  useTheme,
  Toolbar,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
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
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import CustomerForm from "./CustomerForm"
import CustomerDetails from "./CustomerDetails"

// Enhanced sample data with detailed information
const sampleCustomers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  serviceType: ["Prepaid", "Postpaid", "Corporate"][Math.floor(Math.random() * 3)],
  customerType: ["Individual", "Business"][Math.floor(Math.random() * 2)],
  simType: ["micro-SIM", "nano-SIM", "eSIM"][Math.floor(Math.random() * 3)],
  msisdn: `230${["5", "4", "6"][Math.floor(Math.random() * 3)]}${Math.floor(1000000 + Math.random() * 9000000)}`,
  imsi: `61701${Math.floor(1000000000 + Math.random() * 9000000000)}`,

  vip: Math.random() > 0.8,
  gender: ["Male", "Female"][Math.floor(Math.random() * 2)], // Removed "Other" option
  dob: new Date(1995 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  ekycToken: `EKYC${Math.floor(100000 + Math.random() * 900000)}`,
  ekycDate: new Date(
    2020 + Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28),
  ),
  ekycStatus: ["Verified", "Pending", "Rejected"][Math.floor(Math.random() * 3)],
  // Additional detailed information
  simDetails: {
    allocationDate: new Date(2025, 0, 23, 14, 31, 55),
    iccId: `8967400324200324${Math.floor(100 + Math.random() * 900)}`,
  },
  currentPack: {
    packName: ["ENT 20", "Super 4", "Premium 50", "Basic 10"][Math.floor(Math.random() * 4)],
    activationDate: new Date(2025, 5, 3, 16, 59, 41),
    expirationDate: new Date(2025, 5, 10, 16, 59, 41),
    mainBalance: Math.floor(Math.random() * 100),
    usage: {
      totalData: { offered: 35, used: 2.93, available: 32.07 },
      onNetCalls: { offered: "Unlimited", used: 0, available: "Unlimited" },
      onNetSms: { offered: "Unlimited", used: 0, available: "Unlimited" },
      offNetCalls: { offered: 10, used: 0, available: 10 },
      offNetSms: { offered: 10, used: 0, available: 10 },
    },
  },
  rechargeHistory: [
    {
      packName: "ENT 20",
      activationDate: "2025-06-03 16:59:41",
      expirationDate: "2025-06-10 16:59:41",
      dataBalance: "35 GB",
      onnCalls: "Unlimited",
      offnCalls: "0 Mins",
      onnSms: "Unlimited",
      offnSms: "10",
    },
    {
      packName: "ENT 4",
      activationDate: "2025-05-15 20:49:04",
      expirationDate: "2025-05-16 20:49:04",
      dataBalance: "8 GB",
      onnCalls: "Unlimited",
      offnCalls: "0 Mins",
      onnSms: "Unlimited",
      offnSms: "10",
    },
    {
      packName: "ENT 20",
      activationDate: "2025-05-07 17:20:08",
      expirationDate: "2025-05-14 17:20:08",
      dataBalance: "35 GB",
      onnCalls: "Unlimited",
      offnCalls: "0 Mins",
      onnSms: "Unlimited",
      offnSms: "10",
    },
    {
      packName: "Super 4",
      activationDate: "2025-04-26 10:27:07",
      expirationDate: "2025-04-27 10:27:07",
      dataBalance: "8 GB",
      onnCalls: "Unlimited",
      offnCalls: "0 Mins",
      onnSms: "Unlimited",
      offnSms: "10",
    },
    {
      packName: "Super 4",
      activationDate: "2025-04-24 01:46:01",
      expirationDate: "2025-04-25 01:46:01",
      dataBalance: "8 GB",
      onnCalls: "Unlimited",
      offnCalls: "0 Mins",
      onnSms: "Unlimited",
      offnSms: "10",
    },
  ],
}))

const Customer = () => {
  const theme = useTheme()
  const [customers, setCustomers] = useState(sampleCustomers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [detailsDialog, setDetailsDialog] = useState(false)

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value && typeof value === "object" ? false : String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Menu handlers
  const handleMenuClick = (event, customer) => {
    setAnchorEl(event.currentTarget)
    setSelectedCustomer(customer)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewDetails = () => {
    setDetailsDialog(true)
    handleMenuClose()
  }

  // CRUD operations
  const handleAddCustomer = () => {
    setCurrentCustomer(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsEditMode(true)
    setOpenForm(true)
  }

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
    setNotification({
      open: true,
      message: "Customer deleted successfully!",
      severity: "success",
    })
  }

  const handleSaveCustomer = (customer) => {
    if (isEditMode) {
      setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)))
      setNotification({
        open: true,
        message: "Customer updated successfully!",
        severity: "success",
      })
    } else {
      const newCustomer = {
        ...customer,
        id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
        // Add default values for detailed information
        simDetails: {
          allocationDate: new Date(),
          iccId: `8967400324200324${Math.floor(100 + Math.random() * 900)}`,
        },
        currentPack: {
          packName: "New Basic Pack",
          activationDate: new Date(),
          expirationDate: new Date(new Date().setDate(new Date().getDate() + 30)),
          mainBalance: 0,
          usage: {
            totalData: { offered: 10, used: 0, available: 10 },
            onNetCalls: { offered: "Unlimited", used: 0, available: "Unlimited" },
            onNetSms: { offered: "Unlimited", used: 0, available: "Unlimited" },
            offNetCalls: { offered: 10, used: 0, available: 10 },
            offNetSms: { offered: 10, used: 0, available: 10 },
          },
        },
        rechargeHistory: [],
      }
      setCustomers([...customers, newCustomer])
      setNotification({
        open: true,
        message: "Customer added successfully!",
        severity: "success",
      })
    }
    setOpenForm(false)
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
                <TableRow >
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>Customer</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>Service</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>SIM Type</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>MSISDN</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>VIP</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>Gender</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>DOB</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>eKYC</TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary ,fontWeight:'bold'}}>
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
                        <Typography variant="body2">{customer.simType}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <Tooltip title="More Options">
                        <IconButton onClick={(e) => handleMenuClick(e, customer)}>
                          <MoreVertIcon />
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

        {/* More Options Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewDetails}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
        </Menu>

        {/* Customer Form Dialog */}
        <CustomerForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveCustomer}
          customer={currentCustomer}
          isEditMode={isEditMode}
        />

        {/* Customer Details Dialog */}
        <CustomerDetails open={detailsDialog} onClose={() => setDetailsDialog(false)} customer={selectedCustomer} />
      </Box>
    </LocalizationProvider>
  )
}

export default Customer
