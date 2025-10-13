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
  SimCard as SimCardIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import SimForm from "./SimForm"
import SimDetails from "./SimDetails"

// Sample SIM data
const sampleSims = Array.from({ length: 50 }, (_, i) => ({
  id: 1221 + i,
  msisdn: `5261301${i % 10}`,
  category: ["NORMAL", "VIP", "PREMIUM"][Math.floor(Math.random() * 3)],
  specialNumber: Math.random() > 0.8,
  imsi: `5261020003222${i}`,
  pimsi: `1284${i}`,
  batchId: 2231 + Math.floor(i / 10),
  batchDate: new Date(2025, 10, 27),
  vendorId: Math.floor(Math.random() * 5) + 1,
  status: Math.random() > 0.3,
  provStatus: Math.random() > 0.2,
  allocationDate: new Date(2025, 6, 27, 17, 52, 46),
  activationDate: new Date(2025, 6, 27, 17, 54, 3),
  simType: ["micro-SIM", "nano-SIM", "eSIM"][Math.floor(Math.random() * 3)],
  buyingPriceUsd: Math.floor(Math.random() * 1000) + 100,
  sellingPriceUsd: Math.floor(Math.random() * 50),
  vat: "8.02%",
  otherTaxes: Math.floor(Math.random() * 10),
  minCommision: Math.floor(Math.random() * 5) + 1,
  maxCommision: Math.floor(Math.random() * 5) + 5,
  avgCommision: Math.floor(Math.random() * 5) + 2,
  partnerId: Math.floor(Math.random() * 50) + 1,
  validityDays: Math.floor(Math.random() * 365),
  activationStatus: ["Active", "Inactive", "Pending"][Math.floor(Math.random() * 3)],
  activationCode: `${Math.floor(10000000 + Math.random() * 90000000)}`,
  activationToken: `${Math.floor(100000000 + Math.random() * 900000000)}`,
  ki: "DB35195CAF26F89C7849A23162D55828",
  opc: "FC9E9B61F561587D6AC40B55FA9D61CE",
  iccId: `896740032420032228${i}`,
}))

const SimManagement = () => {
  const theme = useTheme()
  const [sims, setSims] = useState(sampleSims)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentSim, setCurrentSim] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSim, setSelectedSim] = useState(null)
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

  // Filter sims based on search term
  const filteredSims = sims.filter((sim) =>
    Object.values(sim).some((value) =>
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
  const handleMenuClick = (event, sim) => {
    setAnchorEl(event.currentTarget)
    setSelectedSim(sim)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewDetails = () => {
    setDetailsDialog(true)
    handleMenuClose()
  }

  // CRUD operations
  const handleAddSim = () => {
    setCurrentSim(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditSim = (sim) => {
    setCurrentSim(sim)
    setIsEditMode(true)
    setOpenForm(true)
  }

  const handleDeleteSim = (id) => {
    setSims(sims.filter((sim) => sim.id !== id))
    setNotification({
      open: true,
      message: "SIM deleted successfully!",
      severity: "success",
    })
  }

  const handleSaveSim = (sim) => {
    if (isEditMode) {
      setSims(sims.map((s) => (s.id === sim.id ? sim : s)))
      setNotification({
        open: true,
        message: "SIM updated successfully!",
        severity: "success",
      })
    } else {
      const newSim = {
        ...sim,
        id: sims.length > 0 ? Math.max(...sims.map((s) => s.id)) + 1 : 1,
        allocationDate: new Date(),
        activationDate: new Date(),
      }
      setSims([...sims, newSim])
      setNotification({
        open: true,
        message: "SIM added successfully!",
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

        <Card
          sx={{
            mb: 3,
            background: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
          }}
        >
          <CardHeader
            title="SIM Inventory Management"
            action={
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
                startIcon={<AddIcon />}
                onClick={handleAddSim}
              >
                Add SIM
              </Button>
            }
          />
          <Divider />
          <Toolbar sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search SIMs..."
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
                  <TableCell sx={{ color: theme.palette.text.primary }}>SIM Info</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>MSISDN</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Category</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>SIM Type</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Status</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Batch ID</TableCell>
                  {/* <TableCell sx={{ color: theme.palette.text.primary }}>Price (USD)</TableCell> */}
                  <TableCell sx={{ color: theme.palette.text.primary }}>Activation</TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sim) => (
                  <TableRow key={sim.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                          }}
                        >
                          <SimCardIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">ID: {sim.id}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            IMSI: {sim.imsi.substring(0, 10)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {sim.msisdn}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={sim.category}
                        sx={{
                          backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{sim.simType}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Chip
                          icon={sim.status ? <CheckCircleIcon /> : <CancelIcon />}
                          label={sim.status ? "Active" : "Inactive"}
                          color={sim.status ? "success" : "error"}
                          size="small"
                        />
                        {sim.specialNumber && <Chip label="Special" color="info" size="small" />}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{sim.batchId}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(sim.batchDate, "dd MMM yyyy")}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        ${sim.buyingPriceUsd}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Selling: ${sim.sellingPriceUsd}
                      </Typography>
                    </TableCell> */}
                    <TableCell>
                      <Typography variant="body2">{sim.activationStatus}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(sim.activationDate, "dd MMM yyyy")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEditSim(sim)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteSim(sim.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Options">
                        <IconButton onClick={(e) => handleMenuClick(e, sim)}>
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
            count={filteredSims.length}
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

        {/* SIM Form Dialog */}
        <SimForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSaveSim}
          sim={currentSim}
          isEditMode={isEditMode}
        />

        {/* SIM Details Dialog */}
        <SimDetails open={detailsDialog} onClose={() => setDetailsDialog(false)} sim={selectedSim} />
      </Box>
    </LocalizationProvider>
  )
}

export default SimManagement
