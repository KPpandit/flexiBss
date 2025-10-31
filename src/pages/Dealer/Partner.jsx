"use client"

import { useState, useEffect } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  useTheme,
  Toolbar,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { format } from "date-fns"
import PartnerForm from "./PartnerForm"
import PartnerDetails from "./PartnerDetails"

// Enhanced sample data with detailed information
const samplePartners = [
  {
    id: 1,
    firstName: "John",
    lastName: "Kila",
    businessName: "Port Moresby Telecom Hub",
    email: "john.kila@pmtelecom.pg",
    contact: "+675 7234 5678",
    documentType: "Passport",
    documentId: "PNG123456",
    isNeotel: true,
    businessNature: "retailers",
    type: "Outside",
    creationDate: new Date(2025, 0, 15),
    isActive: true,
    token: "87654321",
    totalCoreBalance: 15000,
    locality: "Port Moresby",
    businessAddress: "Waigani Drive, Port Moresby, NCD, Papua New Guinea",
    reasonStatus: "",
    country: "Papua New Guinea",
    state: "National Capital District",
    city: "Port Moresby",
  },
  {
    id: 2,
    firstName: "Mary",
    lastName: "Toua",
    businessName: "Lae Communications Center",
    email: "mary.toua@laecomm.pg",
    contact: "+675 7345 6789",
    documentType: "National ID",
    documentId: "PNG234567",
    isNeotel: true,
    businessNature: "distributors",
    type: "Telco Shop",
    creationDate: new Date(2025, 1, 20),
    isActive: true,
    token: "76543210",
    totalCoreBalance: 22000,
    locality: "Lae",
    businessAddress: "Bumbu Road, Lae, Morobe Province, Papua New Guinea",
    reasonStatus: "",
    country: "Papua New Guinea",
    state: "Morobe Province",
    city: "Lae",
  },
  {
    id: 3,
    firstName: "Peter",
    lastName: "Nambawan",
    businessName: "Highlands Mobile Solutions",
    email: "peter.nambawan@highlands.pg",
    contact: "+675 7456 7890",
    documentType: "Passport",
    documentId: "PNG345678",
    isNeotel: false,
    businessNature: "wholesalers",
    type: "Outside",
    creationDate: new Date(2025, 2, 10),
    isActive: true,
    token: "65432109",
    totalCoreBalance: 18500,
    locality: "Mount Hagen",
    businessAddress: "Kagamuga, Mount Hagen, Western Highlands, Papua New Guinea",
    reasonStatus: "",
    country: "Papua New Guinea",
    state: "Western Highlands Province",
    city: "Mount Hagen",
  },
  {
    id: 4,
    firstName: "Grace",
    lastName: "Kaupa",
    businessName: "Madang Digital Services",
    email: "grace.kaupa@madangdigital.pg",
    contact: "+675 7567 8901",
    documentType: "National ID",
    documentId: "PNG456789",
    isNeotel: true,
    businessNature: "retailers",
    type: "Inside",
    creationDate: new Date(2025, 3, 5),
    isActive: false,
    token: "54321098",
    totalCoreBalance: 8500,
    locality: "Madang",
    businessAddress: "Modilon Road, Madang, Madang Province, Papua New Guinea",
    reasonStatus: "Suspended for verification",
    country: "Papua New Guinea",
    state: "Madang Province",
    city: "Madang",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Pato",
    businessName: "Kokopo Network Partners",
    email: "david.pato@kokopo.pg",
    contact: "+675 7678 9012",
    documentType: "Passport",
    documentId: "PNG567890",
    isNeotel: true,
    businessNature: "distributors",
    type: "Outside",
    creationDate: new Date(2025, 4, 12),
    isActive: true,
    token: "43210987",
    totalCoreBalance: 31000,
    locality: "Kokopo",
    businessAddress: "Mango Avenue, Kokopo, East New Britain, Papua New Guinea",
    reasonStatus: "",
    country: "Papua New Guinea",
    state: "East New Britain Province",
    city: "Kokopo",
  },
]

const Partner = ({ onPartnersChange, onCurrentPartnerChange }) => {
  const theme = useTheme()
  const [partners, setPartners] = useState(samplePartners)
  const [searchTerm, setSearchTerm] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [currentPartner, setCurrentPartner] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(samplePartners[0])
  const [notFoundDialog, setNotFoundDialog] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuPartner, setMenuPartner] = useState(null)
  const [showList, setShowList] = useState(false) // Changed default showList to false

  useEffect(() => {
    if (onPartnersChange) {
      onPartnersChange(partners)
    }
  }, [partners, onPartnersChange])

  useEffect(() => {
    if (onCurrentPartnerChange) {
      onCurrentPartnerChange(selectedPartner)
    }
  }, [selectedPartner, onCurrentPartnerChange])

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  // Filter partners based on search term
  const filteredPartners = partners.filter((partner) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      partner.firstName.toLowerCase().includes(searchLower) ||
      partner.lastName.toLowerCase().includes(searchLower) ||
      partner.businessName.toLowerCase().includes(searchLower) ||
      partner.email.toLowerCase().includes(searchLower) ||
      partner.contact.includes(searchTerm) ||
      partner.locality.toLowerCase().includes(searchLower) ||
      (partner.country && partner.country.toLowerCase().includes(searchLower)) ||
      (partner.city && partner.city.toLowerCase().includes(searchLower)) ||
      partner.id.toString().includes(searchTerm)
    )
  })

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Menu handlers
  const handleMenuClick = (event, partner) => {
    setAnchorEl(event.currentTarget)
    setMenuPartner(partner)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewDetails = () => {
    setSelectedPartner(menuPartner)
    setShowList(false) // Set showList to false when viewing partner details
    handleMenuClose()
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const exactMatches = partners.filter((partner) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          partner.firstName.toLowerCase().includes(searchLower) ||
          partner.lastName.toLowerCase().includes(searchLower) ||
          partner.contact.includes(searchTerm) ||
          partner.email.toLowerCase().includes(searchLower) ||
          partner.businessName.toLowerCase().includes(searchLower) ||
          partner.locality.toLowerCase().includes(searchLower) ||
          (partner.country && partner.country.toLowerCase().includes(searchLower)) ||
          partner.id.toString().includes(searchTerm)
        )
      })

      if (exactMatches.length > 0) {
        setSelectedPartner(exactMatches[0])
        setNotification({
          open: true,
          message: `Partner found: ${exactMatches[0].firstName} ${exactMatches[0].lastName}`,
          severity: "success",
        })
      } else {
        setNotFoundDialog(true)
      }
    }
  }

  const handleAddPartner = () => {
    setCurrentPartner(null)
    setIsEditMode(false)
    setOpenForm(true)
  }

  const handleEditPartner = (partner) => {
    setCurrentPartner(partner)
    setIsEditMode(true)
    setOpenForm(true)
  }

  const handleDeletePartner = (id) => {
    setPartners(partners.filter((partner) => partner.id !== id))
    setNotification({
      open: true,
      message: "Partner deleted successfully!",
      severity: "success",
    })
  }

  const handleSavePartner = (partner) => {
    if (isEditMode) {
      // Update existing partner
      setPartners((prev) => prev.map((p) => (p.id === partner.id ? partner : p)))
      setSelectedPartner(partner) // Update the selected partner display
    } else {
      // Add new partner
      const newPartner = { ...partner, id: partners.length + 1 }
      setPartners((prev) => [...prev, newPartner])
    }

    setNotification({
      open: true,
      message: isEditMode ? "Partner updated successfully!" : "Partner added successfully!",
      severity: "success",
    })
    setOpenForm(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          p: 3,
          maxWidth: "80vw",
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
          backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
          minHeight: "100vh",
          fontSize: "1rem",
        }}
      >
        {/* Success Notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>

        <Card
          sx={{
            mb: 3,
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
            boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Partner Module
              </Typography>
            }
          />
          <Divider
            sx={{
              borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
            }}
          />
          <Toolbar
            sx={{
              p: 3,
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <TextField
              variant="outlined"
              size="medium"
              placeholder="Search Partner Name, Business, Contact..."
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "action.active" }} />
                ),
              }}
              sx={{
                flexGrow: 1,
                maxWidth: { xs: "100%", md: 500 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                  opacity: 1,
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                  "&:disabled": {
                    backgroundColor: theme.palette.mode === "dark" ? "#666666" : "#cccccc",
                    color: theme.palette.mode === "dark" ? "#333333" : "#666666",
                  },
                }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPartner}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                <span style={{ color: theme.palette.mode === "dark" ? "#000000" : "#ffffff" }}>New Partner</span>
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => setShowList(!showList)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  "&:hover": {
                    borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {showList ? "Hide List" : "Show List Of Partners"}
              </Button>
            </Box>
          </Toolbar>
        </Card>

        {selectedPartner && !showList && (
          <PartnerDetails
            partner={selectedPartner}
            onClose={() => setSelectedPartner(null)}
            inline={true}
            onEdit={() => handleEditPartner(selectedPartner)}
            onPartnerUpdate={(updatedPartner) => {
              setPartners((prev) => prev.map((p) => (p.id === updatedPartner.id ? updatedPartner : p)))
              setSelectedPartner(updatedPartner)
            }}
          />
        )}

        {showList && (
          <Card
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  }}
                >
                  Partner Management
                </Typography>
              }
              action={
                <Tooltip title="Refresh">
                  <IconButton>
                    <RefreshIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider
              sx={{
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
              }}
            />
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: theme.palette.mode === "dark" ? "#000000" : theme.palette.grey[100],
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Partner
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Business
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Category
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Contact
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Balance
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}>
                      Created
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontWeight: 600 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredPartners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((partner) => (
                    <TableRow key={partner.id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                            <CameraIcon />
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                            >
                              {partner.firstName} {partner.lastName}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "text.secondary" }}
                            >
                              {partner.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <BusinessIcon
                            sx={{ mr: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "action.active" }}
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                            >
                              {partner.businessName}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "text.secondary" }}
                            >
                              {partner.businessNature}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={partner.type}
                          color={partner.type === "Inside" ? "primary" : "secondary"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon
                            sx={{ mr: 1, color: theme.palette.mode === "dark" ? "#ffffff" : "action.active" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                          >
                            {partner.contact}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {partner.isActive ? (
                          <Chip icon={<CheckCircleIcon />} label="Active" color="success" size="small" />
                        ) : (
                          <Chip icon={<CancelIcon />} label="Inactive" color="error" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="success.main">
                          ${partner.totalCoreBalance}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                        >
                          {format(partner.creationDate, "dd MMM yyyy")}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditPartner(partner)}
                            sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "primary.main" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDeletePartner(partner.id)}
                            sx={{ color: theme.palette.mode === "dark" ? "#ff6b6b" : "error.main" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Options">
                          <IconButton
                            onClick={(e) => handleMenuClick(e, partner)}
                            sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                          >
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
              count={filteredPartners.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                borderTop: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
              }}
            />
          </Card>
        )}

        {/* More Options Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewDetails}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
        </Menu>

        {/* Partner Form Dialog */}
        <PartnerForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSavePartner}
          partner={currentPartner}
          isEditMode={isEditMode}
        />

        {/* Partner Not Found Dialog */}
        <Dialog
          open={notFoundDialog}
          onClose={() => setNotFoundDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2,
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "none",
            },
          }}
        >
          <DialogContent sx={{ textAlign: "center", py: 4 }}>
            <Box sx={{ mb: 3 }}>
              <SearchIcon
                sx={{
                  fontSize: 80,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "text.secondary",
                  mb: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                Partner Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.mode === "dark" ? "#cccccc" : "text.secondary",
                  mb: 3,
                }}
              >
                We couldn't find any partner matching "{searchTerm}". Please check the details and try again.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => setNotFoundDialog(false)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "&:hover": {
                      borderColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setNotFoundDialog(false)
                    handleAddPartner()
                  }}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    },
                  }}
                >
                  Add New Partner
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}

export default Partner
