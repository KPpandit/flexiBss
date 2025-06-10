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
  Business as BusinessIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import DealerForm from "./DealerForm.jsx"
import DealerDetails from "./DealerDetails"

// Enhanced sample data with detailed information
const sampleDealers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  firstName: `Dealer ${i + 1}`,
  lastName: `Last ${i + 1}`,
  businessName: `Business ${i + 1}`,
  email: `dealer${i + 1}@example.com`,
  contact: `674765432${i % 10}`,
  documentType: ["AadharCard", "PAN Card", "Passport"][Math.floor(Math.random() * 3)],
  documentId: `DOC${Math.floor(100000 + Math.random() * 900000)}`,
  isNeotel: Math.random() > 0.5,
  businessNature: ["retailers", "distributors", "wholesalers"][Math.floor(Math.random() * 3)],
  type: ["Agent", "Dealer", "Distributor"][Math.floor(Math.random() * 3)],
  creationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  isActive: Math.random() > 0.2,
  token: `${Math.floor(10000000 + Math.random() * 90000000)}`,
  totalCoreBalance: Math.floor(Math.random() * 10000),
  locality: ["Aiwo", "Yaren", "Baiti", "Anibare"][Math.floor(Math.random() * 4)],
  businessAddress: ["Delhi", "Mumbai", "Bangalore", "Chennai"][Math.floor(Math.random() * 4)],
  reasonStatus: Math.random() > 0.8 ? "Suspended for verification" : "",
}))

const DealerManagement = () => {
  const theme = useTheme()
  const [dealers, setDealers] = useState(sampleDealers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentDealer, setCurrentDealer] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedDealer, setSelectedDealer] = useState(null)
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

  // Filter dealers based on search term
  const filteredDealers = dealers.filter((dealer) =>
    Object.values(dealer).some((value) =>
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
  const handleMenuClick = (event, dealer) => {
    setAnchorEl(event.currentTarget)
    setSelectedDealer(dealer)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewDetails = () => {
    setDetailsDialog(true)
    handleMenuClose()
  }

  // CRUD operations
  const handleAddDealer = () => {
    setCurrentDealer(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditDealer = (dealer) => {
    setCurrentDealer(dealer)
    setIsEditMode(true)
    setOpenForm(true)
  }

  const handleDeleteDealer = (id) => {
    setDealers(dealers.filter((dealer) => dealer.id !== id))
    setNotification({
      open: true,
      message: "Dealer deleted successfully!",
      severity: "success",
    })
  }

  const handleSaveDealer = (dealer) => {
    if (isEditMode) {
      setDealers(dealers.map((d) => (d.id === dealer.id ? dealer : d)))
      setNotification({
        open: true,
        message: "Dealer updated successfully!",
        severity: "success",
      })
    } else {
      const newDealer = {
        ...dealer,
        id: dealers.length > 0 ? Math.max(...dealers.map((d) => d.id)) + 1 : 1,
        creationDate: new Date(),
        token: `${Math.floor(10000000 + Math.random() * 90000000)}`,
        totalCoreBalance: 0,
      }
      setDealers([...dealers, newDealer])
      setNotification({
        open: true,
        message: "Dealer added successfully!",
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
            title="Dealer Management"
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddDealer}
                sx={{ borderRadius: 2 }}
              >
                Add Dealer
              </Button>
            }
          />
          <Divider />
          <Toolbar sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search dealers..."
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
                  <TableCell sx={{ color: theme.palette.text.primary }}>Dealer</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Business</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Type</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Contact</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Status</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Balance</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Created</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Is-Shop</TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredDealers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dealer) => (
                  <TableRow key={dealer.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {dealer.firstName} {dealer.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {dealer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon sx={{ mr: 1, color: "action.active" }} />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {dealer.businessName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {dealer.businessNature}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={dealer.type}
                        color={dealer.type === "Distributor" ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body2">{dealer.contact}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {dealer.isActive ? (
                        <Chip icon={<CheckCircleIcon />} label="Active" color="success" size="small" />
                      ) : (
                        <Chip icon={<CancelIcon />} label="Inactive" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        Rs. {dealer.totalCoreBalance}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{format(dealer.creationDate, "dd MMM yyyy")}</Typography>
                    </TableCell>
                    <TableCell>
                      {dealer.isNeotel ? (
                        <Chip label="Yes" color="info" size="small" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEditDealer(dealer)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteDealer(dealer.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Options">
                        <IconButton onClick={(e) => handleMenuClick(e, dealer)}>
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
            count={filteredDealers.length}
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

        {/* Dealer Form Dialog */}
        <DealerForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveDealer}
          dealer={currentDealer}
          isEditMode={isEditMode}
        />

        {/* Dealer Details Dialog */}
        <DealerDetails open={detailsDialog} onClose={() => setDetailsDialog(false)} dealer={selectedDealer} />
      </Box>
    </LocalizationProvider>
  )
}

export default DealerManagement
