"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
} from "@mui/material"
import {
  Sms as SmsIcon,
  DataUsage as DataIcon,
  Phone as PhoneIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"

export default function UsageReportSection() {
  const theme = useTheme()
  const [usageTab, setUsageTab] = useState(0)
  const [smsPage, setSmsPage] = useState(0)
  const [dataPage, setDataPage] = useState(0)
  const [callsPage, setCallsPage] = useState(0)
  const rowsPerPage = 10

  // Sample data
  const smsUsageData = [
    {
      activationDate: "2025-01-15",
      msisdn: "675526167890",
      packName: "Premium SMS Pack",
      offeredSms: 1000,
      consumedSms: 750,
      offeredOffNetSms: 500,
      consumedOffNetSms: 320,
    },
    {
      activationDate: "2025-01-16",
      msisdn: "675526167891",
      packName: "Basic SMS Pack",
      offeredSms: 500,
      consumedSms: 450,
      offeredOffNetSms: 200,
      consumedOffNetSms: 180,
    },
    {
      activationDate: "2025-01-17",
      msisdn: "675526167892",
      packName: "Business SMS Pack",
      offeredSms: 2000,
      consumedSms: 1200,
      offeredOffNetSms: 800,
      consumedOffNetSms: 450,
    },
  ]

  const dataUsageData = [
    {
      activationDate: "2025-01-15",
      msisdn: "675526167890",
      packName: "Premium Data Pack",
      offeredData: "10GB",
      consumedData: "7.5GB",
      offeredOffNetData: "5GB",
      consumedOffNetData: "3.2GB",
    },
    {
      activationDate: "2025-01-16",
      msisdn: "675526167891",
      packName: "Basic Data Pack",
      offeredData: "5GB",
      consumedData: "4.5GB",
      offeredOffNetData: "2GB",
      consumedOffNetData: "1.8GB",
    },
  ]

  const callsUsageData = [
    {
      activationDate: "2025-01-15",
      msisdn: "+1234567890",
      packName: "Premium Call Pack",
      offeredMinutes: 1000,
      consumedMinutes: 750,
      offeredOffNetMinutes: 500,
      consumedOffNetMinutes: 320,
    },
    {
      activationDate: "2025-01-16",
      msisdn: "+1234567891",
      packName: "Basic Call Pack",
      offeredMinutes: 500,
      consumedMinutes: 450,
      offeredOffNetMinutes: 200,
      consumedOffNetMinutes: 180,
    },
  ]

  const handleUsageTabChange = (event, newValue) => {
    setUsageTab(newValue)
  }

  const getUsagePercentage = (consumed, offered) => {
    if (!consumed || !offered) return 0
    return Math.round((consumed / offered) * 100)
  }

  const renderUsageTable = (data, columns, page, setPage, title, icon) => (
    <Card
      sx={{
        mt: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon}
          <Typography
            variant="h6"
            sx={{ ml: 1, fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
          >
            {title}
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}` }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.875rem",
                      borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: "0.875rem",
                    borderBottom: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
                  }}
                >
                  Usage %
                </TableCell>
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{ fontSize: "0.875rem", color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={getUsagePercentage(
                          row[columns.find((col) => col.id.includes("consumed"))?.id],
                          row[columns.find((col) => col.id.includes("offered"))?.id],
                        )}
                        sx={{
                          width: 60,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
                      >
                        {getUsagePercentage(
                          row[columns.find((col) => col.id.includes("consumed"))?.id],
                          row[columns.find((col) => col.id.includes("offered"))?.id],
                        )}
                        %
                      </Typography>
                    </Box>
                  </TableCell>
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
          sx={{ mt: 2, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}
        />
      </CardContent>
    </Card>
  )

  const smsColumns = [
    { id: "activationDate", label: "Activation Date" },
    { id: "msisdn", label: "MSISDN" },
    { id: "packName", label: "Pack Name" },
    { id: "offeredSms", label: "Offered SMS" },
    { id: "consumedSms", label: "Consumed SMS" },
    { id: "offeredOffNetSms", label: "Offered OFF NET SMS" },
    { id: "consumedOffNetSms", label: "Consumed OFF NET SMS" },
  ]

  const dataColumns = [
    { id: "activationDate", label: "Activation Date" },
    { id: "msisdn", label: "MSISDN" },
    { id: "packName", label: "Pack Name" },
    { id: "offeredData", label: "Offered Data" },
    { id: "consumedData", label: "Consumed Data" },
    { id: "offeredOffNetData", label: "Offered OFF NET Data" },
    { id: "consumedOffNetData", label: "Consumed OFF NET Data" },
  ]

  const callsColumns = [
    { id: "activationDate", label: "Activation Date" },
    { id: "msisdn", label: "MSISDN" },
    { id: "packName", label: "Pack Name" },
    { id: "offeredMinutes", label: "Offered Minutes" },
    { id: "consumedMinutes", label: "Consumed Minutes" },
    { id: "offeredOffNetMinutes", label: "Offered OFF NET Minutes" },
    { id: "consumedOffNetMinutes", label: "Consumed OFF NET Minutes" },
  ]

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TrendingUpIcon sx={{ fontSize: 32, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", mr: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
          Customer Usage Reports
        </Typography>
      </Box>

      <Paper
        sx={{
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Tabs
          value={usageTab}
          onChange={handleUsageTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
            },
            "& .Mui-selected": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
          }}
        >
          <Tab icon={<SmsIcon />} iconPosition="start" label="SMS Usage" />
          <Tab icon={<DataIcon />} iconPosition="start" label="Data Usage" />
          <Tab icon={<PhoneIcon />} iconPosition="start" label="Calls Usage" />
        </Tabs>
      </Paper>

      {usageTab === 0 &&
        renderUsageTable(
          smsUsageData,
          smsColumns,
          smsPage,
          setSmsPage,
          "SMS Usage Report",
          <SmsIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />,
        )}
      {usageTab === 1 &&
        renderUsageTable(
          dataUsageData,
          dataColumns,
          dataPage,
          setDataPage,
          "Data Usage Report",
          <DataIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />,
        )}
      {usageTab === 2 &&
        renderUsageTable(
          callsUsageData,
          callsColumns,
          callsPage,
          setCallsPage,
          "Calls Usage Report",
          <PhoneIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />,
        )}
    </Box>
  )
}
