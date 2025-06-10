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
  Router as RouterIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import RouterForm from "./RouterForm"
import RouterDetails from "./RouterDetails"

// Sample Router data
const sampleRouters = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  serialNumber: `RT${Math.floor(100000 + Math.random() * 900000)}`,
  vendorId: Math.floor(Math.random() * 10) + 1,
  macAddress: `00:1B:44:11:3A:${(i + 10).toString(16).toUpperCase().padStart(2, "0")}`,
  userName: `router_user_${i + 1}`,
  activationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  deviceId: `DEV${Math.floor(1000 + Math.random() * 9000)}`,
  deviceModel: ["RT-AC68U", "RT-AX88U", "RT-AC86U", "RT-AX58U"][Math.floor(Math.random() * 4)],
  deviceMake: ["ASUS", "Netgear", "Linksys", "TP-Link"][Math.floor(Math.random() * 4)],
  manufacturer: ["ASUS", "Netgear", "Linksys", "TP-Link"][Math.floor(Math.random() * 4)],
  deviceType: ["Wireless Router", "Mesh Router", "Gaming Router", "Business Router"][Math.floor(Math.random() * 4)],
  status: Math.random() > 0.2,
  ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  firmwareVersion: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`,
  location: ["Office A", "Office B", "Warehouse", "Data Center"][Math.floor(Math.random() * 4)],
  lastSeen: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
}))

const RouterManagement = () => {
  const theme = useTheme()
  const [routers, setRouters] = useState(sampleRouters)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentRouter, setCurrentRouter] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRouter, setSelectedRouter] = useState(null)
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

  // Filter routers based on search term
  const filteredRouters = routers.filter((router) =>
    Object.values(router).some((value) =>
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
  const handleMenuClick = (event, router) => {
    setAnchorEl(event.currentTarget)
    setSelectedRouter(router)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewDetails = () => {
    setDetailsDialog(true)
    handleMenuClose()
  }

  // CRUD operations
  const handleAddRouter = () => {
    setCurrentRouter(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditRouter = (router) => {
    setCurrentRouter(router)
    setIsEditMode(true)
    setOpenForm(true)
  }

  const handleDeleteRouter = (id) => {
    setRouters(routers.filter((router) => router.id !== id))
    setNotification({
      open: true,
      message: "Router deleted successfully!",
      severity: "success",
    })
  }

  const handleSaveRouter = (router) => {
    if (isEditMode) {
      setRouters(routers.map((r) => (r.id === router.id ? router : r)))
      setNotification({
        open: true,
        message: "Router updated successfully!",
        severity: "success",
      })
    } else {
      const newRouter = {
        ...router,
        id: routers.length > 0 ? Math.max(...routers.map((r) => r.id)) + 1 : 1,
        activationDate: new Date(),
        lastSeen: new Date(),
      }
      setRouters([...routers, newRouter])
      setNotification({
        open: true,
        message: "Router added successfully!",
        severity: "success",
      })
    }
    setOpenForm(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
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
            title="Router Inventory Management"
            action={
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleAddRouter}
                sx={{ borderRadius: 2 }}
              >
                Add Router
              </Button>
            }
          />
          <Divider />
          <Toolbar sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search routers..."
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
                  <TableCell sx={{ color: theme.palette.text.primary }}>Router Info</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Serial Number</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Model</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>MAC Address</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Status</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>User Name</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Location</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Activation Date</TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRouters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((router) => (
                  <TableRow key={router.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.secondary.main }}>
                          <RouterIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">ID: {router.deviceId}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {router.deviceMake}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {router.serialNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{router.deviceModel}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {router.deviceType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        {router.macAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={router.status ? <CheckCircleIcon /> : <CancelIcon />}
                        label={router.status ? "Online" : "Offline"}
                        color={router.status ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{router.userName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{router.location}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{format(router.activationDate, "dd MMM yyyy")}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEditRouter(router)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRouter(router.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Options">
                        <IconButton onClick={(e) => handleMenuClick(e, router)}>
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
            count={filteredRouters.length}
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

        {/* Router Form Dialog */}
        <RouterForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveRouter}
          router={currentRouter}
          isEditMode={isEditMode}
        />

        {/* Router Details Dialog */}
        <RouterDetails open={detailsDialog} onClose={() => setDetailsDialog(false)} router={selectedRouter} />
      </Box>
    </LocalizationProvider>
  )
}

export default RouterManagement
