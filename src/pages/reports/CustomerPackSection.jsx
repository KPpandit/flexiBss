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
} from "@mui/material"
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  PersonOff as PersonOffIcon,
  Repeat as RepeatIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material"

export default function CustomerPackSection() {
  const theme = useTheme()
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

  // Sample data
  const activeCustomers = [
    {
      activationDate: "2024-01-15",
      expirationDate: "2024-02-15",
      msisdn: "230526167890",
      packName: "Premium Pack",
      mainBalance: 25.5,
    },
    {
      activationDate: "2024-01-16",
      expirationDate: "2024-02-16",
      msisdn: "230526167891",
      packName: "Basic Pack",
      mainBalance: 15.75,
    },
    {
      activationDate: "2024-01-17",
      expirationDate: "2024-02-17",
      msisdn: "230526167892",
      packName: "Business Pack",
      mainBalance: 45.25,
    },
  ]

  const inactiveCustomers = [
    {
      activationDate: "2024-01-10",
      expirationDate: "2024-01-20",
      msisdn: "230526167893",
      packName: "Premium Pack",
      mainBalance: 0.0,
    },
    {
      activationDate: "2024-01-05",
      expirationDate: "2024-01-15",
      msisdn: "230526167894",
      packName: "Basic Pack",
      mainBalance: 0.0,
    },
  ]

  const repeatedCustomers = [
    {
      packName: "Premium Pack",
      msisdn: "230526167890",
      activationDate: "2024-01-15",
      expirationDate: "2024-02-15",
      lastPackName: "Basic Pack",
      lastActivationDate: "2023-12-15",
    },
    {
      packName: "Business Pack",
      msisdn: "230526167895",
      activationDate: "2024-01-20",
      expirationDate: "2024-02-20",
      lastPackName: "Premium Pack",
      lastActivationDate: "2023-12-20",
    },
  ]

  const newCustomers = [
    {
      activationDate: "2024-01-15",
      expirationDate: "2024-02-15",
      msisdn: "230526167896",
      packName: "Starter Pack",
    },
    {
      activationDate: "2024-01-18",
      expirationDate: "2024-02-18",
      msisdn: "230526167897",
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
    <Card sx={{ mb: 2, borderRadius: theme.shape.borderRadius, boxShadow: 3, bgcolor: theme.palette.background.paper }}>
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
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {data.length} customers
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{
              transform: expandedSections[sectionKey] ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expandedSections[sectionKey]} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.grey[900]
                        : theme.palette.grey[100],
                  }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Activation Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Expiration Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>MSISDN</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Pack Name</TableCell>
                    {title !== "New Customers" && <TableCell sx={{ fontWeight: "bold" }}>Main Balance</TableCell>}
                    {title === "Repeated Customers" && (
                      <>
                        <TableCell sx={{ fontWeight: "bold" }}>Last Pack Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Last Activation Date</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index} sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>{row.activationDate}</TableCell>
                      <TableCell>{row.expirationDate}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccountCircleIcon sx={{ color: theme.palette.grey[400] }} />
                          {row.msisdn}
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
                              color: row.mainBalance > 0 ? theme.palette.success.main : theme.palette.error.main,
                            }}
                          >
                            Rs. {row.mainBalance?.toFixed(2)}
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
                          <TableCell>{row.lastActivationDate}</TableCell>
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
              sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
            />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PeopleIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          Customer Pack Details
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: theme.shape.borderRadius,
              boxShadow: 3,
              bgcolor: theme.palette.success.main,
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {activeCustomers.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Active Customers
                  </Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: theme.shape.borderRadius,
              boxShadow: 3,
              bgcolor: theme.palette.error.main,
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {inactiveCustomers.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Inactive Customers
                  </Typography>
                </Box>
                <PersonOffIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: theme.shape.borderRadius,
              boxShadow: 3,
              bgcolor: theme.palette.warning.main,
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {repeatedCustomers.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Repeated Customers
                  </Typography>
                </Box>
                <RepeatIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: theme.shape.borderRadius,
              boxShadow: 3,
              bgcolor: theme.palette.info.main,
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {newCustomers.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    New Customers
                  </Typography>
                </Box>
                <PersonAddIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
        theme.palette.success.main,
        "active",
      )}

      {renderCustomerTable(
        inactiveCustomers,
        "Inactive Customers",
        inactiveCustomersPage,
        setInactiveCustomersPage,
        <PersonOffIcon />,
        theme.palette.error.main,
        "inactive",
      )}

      {renderCustomerTable(
        repeatedCustomers,
        "Repeated Customers",
        repeatedCustomersPage,
        setRepeatedCustomersPage,
        <RepeatIcon />,
        theme.palette.warning.main,
        "repeated",
      )}

      {renderCustomerTable(
        newCustomers,
        "New Customers",
        newCustomersPage,
        setNewCustomersPage,
        <PersonAddIcon />,
        theme.palette.info.main,
        "new",
      )}
    </Box>
  )
}
