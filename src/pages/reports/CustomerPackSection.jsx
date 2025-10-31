"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Grid,
  useTheme,
  Chip,
  Avatar,
  Paper,
  Collapse,
  IconButton,
  TextField,
  Button,
} from "@mui/material"
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  PersonOff as PersonOffIcon,
  Repeat as RepeatIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material"

export default function CustomerPackSection() {
  const theme = useTheme()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [activeCustomersPage, setActiveCustomersPage] = useState(0)
  const [inactiveCustomersPage, setInactiveCustomersPage] = useState(0)
  const [repeatedCustomersPage, setRepeatedCustomersPage] = useState(0)
  const [newCustomersPage, setNewCustomersPage] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    inactive: false,
    repeated: false,
    new: false,
  })
  const rowsPerPage = 10

  const handleSearch = () => {
    console.log("[v0] Searching with date range:", startDate, "to", endDate)
    // Filter logic would go here
  }

  const activeCustomers = [
    {
      activationDate: "2025-01-15",
      expirationDate: "2025-02-15",
      msisdn: "675526167890",
      packName: "Premium Pack",
      mainBalance: 25.5,
    },
    {
      activationDate: "2025-01-16",
      expirationDate: "2025-02-16",
      msisdn: "675526167891",
      packName: "Basic Pack",
      mainBalance: 15.75,
    },
    {
      activationDate: "2025-01-17",
      expirationDate: "2025-02-17",
      msisdn: "675526167892",
      packName: "Business Pack",
      mainBalance: 45.25,
    },
  ]

  const inactiveCustomers = [
    {
      activationDate: "2025-01-10",
      expirationDate: "2025-01-20",
      msisdn: "675526167893",
      packName: "Premium Pack",
      mainBalance: 0.0,
    },
    {
      activationDate: "2025-01-05",
      expirationDate: "2025-01-15",
      msisdn: "675526167894",
      packName: "Basic Pack",
      mainBalance: 0.0,
    },
  ]

  const repeatedCustomers = [
    {
      packName: "Premium Pack",
      msisdn: "675526167890",
      activationDate: "2025-01-15",
      expirationDate: "2025-02-15",
      lastPackName: "Basic Pack",
      lastActivationDate: "2023-12-15",
      mainBalance: 20.5,
    },
    {
      packName: "Business Pack",
      msisdn: "675526167895",
      activationDate: "2025-01-20",
      expirationDate: "2025-02-20",
      lastPackName: "Premium Pack",
      lastActivationDate: "2023-12-20",
      mainBalance: 10.0,
    },
  ]

  const newCustomers = [
    {
      activationDate: "2025-01-15",
      expirationDate: "2025-02-15",
      msisdn: "675526167896",
      packName: "Starter Pack",
    },
    {
      activationDate: "2025-01-18",
      expirationDate: "2025-02-18",
      msisdn: "675526167897",
      packName: "Basic Pack",
    },
  ]

  const getPackColor = (packName) => {
    switch (packName.toLowerCase()) {
      case "premium pack":
        return "primary"
      case "business pack":
        return "secondary"
      case "basic pack":
        return "info"
      case "starter pack":
        return "success"
      default:
        return "default"
    }
  }

  const handleExpandClick = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderCustomerTable = (data, title, page, setPage, icon, color, sectionKey) => (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            p: 1,
          }}
          onClick={() => handleExpandClick(sectionKey)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>{icon}</Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
              >
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }}>
                {data.length} customers
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{
              transform: expandedSections[sectionKey] ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expandedSections[sectionKey]} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}` }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontSize: "0.875rem",
                      }}
                    >
                      Activation Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontSize: "0.875rem",
                      }}
                    >
                      Expiration Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontSize: "0.875rem",
                      }}
                    >
                      MSISDN
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        fontSize: "0.875rem",
                      }}
                    >
                      Pack Name
                    </TableCell>
                    {title !== "New Customers" && (
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontSize: "0.875rem",
                        }}
                      >
                        Main Balance
                      </TableCell>
                    )}
                    {title === "Repeated Customers" && (
                      <>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontSize: "0.875rem",
                          }}
                        >
                          Last Pack Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            fontSize: "0.875rem",
                          }}
                        >
                          Last Activation Date
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                        },
                        borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#666666" : "#e0e0e0"}`,
                      }}
                    >
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                      >
                        {row.activationDate}
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                      >
                        {row.expirationDate}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccountCircleIcon sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                          >
                            {row.msisdn}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={row.packName} color={getPackColor(row.packName)} size="small" variant="outlined" />
                      </TableCell>
                      {title !== "New Customers" && (
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color:
                                row.mainBalance > 0
                                  ? theme.palette.mode === "dark"
                                    ? "#ffffff"
                                    : "#000000"
                                  : theme.palette.mode === "dark"
                                    ? "#666666"
                                    : "#999999",
                            }}
                          >
                            $. {row.mainBalance?.toFixed(2)}
                          </Typography>
                        </TableCell>
                      )}
                      {title === "Repeated Customers" && (
                        <>
                          <TableCell>
                            <Chip
                              label={row.lastPackName}
                              color={getPackColor(row.lastPackName)}
                              size="small"
                              variant="filled"
                            />
                          </TableCell>
                          <TableCell
                            sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", fontSize: "0.875rem" }}
                          >
                            {row.lastActivationDate}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={data.length}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10]}
              sx={{
                borderTop: `1px solid ${theme.palette.mode === "dark" ? "#666666" : "#e0e0e0"}`,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              }}
            />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "0.85rem",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          mb: 2,
        }}
      >
        Customer Pack Details
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            minWidth: 160,
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              },
            },
            "& input[type='date']::-webkit-calendar-picker-indicator": {
              filter: theme.palette.mode === "dark" ? "invert(1) brightness(1.5)" : "invert(0)",
              opacity: theme.palette.mode === "dark" ? 1 : 0.7,
              cursor: "pointer",
            },
            "&:hover input[type='date']::-webkit-calendar-picker-indicator": {
              opacity: 1,
            },
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            minWidth: 160,
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              },
            },
            "& input[type='date']::-webkit-calendar-picker-indicator": {
              filter: theme.palette.mode === "dark" ? "invert(1) brightness(1.5)" : "invert(0)",
              opacity: theme.palette.mode === "dark" ? 1 : 0.7,
              cursor: "pointer",
            },
            "&:hover input[type='date']::-webkit-calendar-picker-indicator": {
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#1976d2",
            color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#cccccc" : "#1565c0",
            },
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {activeCustomers.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Active Customers
                  </Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {inactiveCustomers.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Inactive Customers
                  </Typography>
                </Box>
                <PersonOffIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {repeatedCustomers.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    Repeated Customers
                  </Typography>
                </Box>
                <RepeatIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#cccccc" : "#666666" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
              bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {newCustomers.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.mode === "dark" ? "#cccccc" : "#666666", fontSize: "0.8rem" }}
                  >
                    New Customers
                  </Typography>
                </Box>
                <PersonAddIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customer Tables */}
      {renderCustomerTable(
        activeCustomers,
        "Active Customers",
        activeCustomersPage,
        setActiveCustomersPage,
        <PeopleIcon />,
        theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        "active",
      )}

      {renderCustomerTable(
        inactiveCustomers,
        "Inactive Customers",
        inactiveCustomersPage,
        setInactiveCustomersPage,
        <PersonOffIcon />,
        theme.palette.mode === "dark" ? "#666666" : "#999999",
        "inactive",
      )}

      {renderCustomerTable(
        repeatedCustomers,
        "Repeated Customers",
        repeatedCustomersPage,
        setRepeatedCustomersPage,
        <RepeatIcon />,
        theme.palette.mode === "dark" ? "#cccccc" : "#666666",
        "repeated",
      )}

      {renderCustomerTable(
        newCustomers,
        "New Customers",
        newCustomersPage,
        setNewCustomersPage,
        <PersonAddIcon />,
        theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        "new",
      )}
    </Box>
  )
}
