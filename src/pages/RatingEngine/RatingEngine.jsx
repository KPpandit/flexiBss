"use client"

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material"

const RatingEngine = () => {
  const theme = useTheme()

  // Out of Pack Billing Rates data
  const outOfPackRates = [
    { category: "Prepaid", rate: "0.05" },
    { category: "Postpaid", rate: "0.03" },
  ]

  // Rating per Call/SMS/Data/Interconnect data
  const ratingData = [
    { type: "Voice Call (MoU)", domestic: "0.05", international: "0.2" },
    { type: "SMS", domestic: "0.02", international: "0.1" },
    { type: "Data (per KB)", domestic: "0.0012", international: "0.005" },
    { type: "Interconnect (Other Telcos)", domestic: "0.015", international: "0.04" },
  ]

  // Free offers data
  const freeOffers = [
    { name: "Weekend Calls", description: "Free calls on Sat-Sun", active: true },
    { name: "Night Data", description: "Free 1GB 12AM–6AM", active: true },
    { name: "Weekend SMS", description: "Unlimited SMS during weekends", active: false },
  ]

  // Override Rating Rules data
  const overrideRules = [
    {
      rule: "Corporate Plan Override",
      description: "Applies flat rate regardless of pack usage",
      appliedTo: "Corporate Subscribers",
    },
    {
      rule: "Festival Offer Override",
      description: "Overrides data rating to 50%",
      appliedTo: "All Prepaid Users",
    },
  ]

  // Anomaly Detection data
  const anomalyData = [
    { subscriber: "MSISDN_1001", type: "Voice Call", scope: "Domestic", limit: 600, actual: 900 },
    { subscriber: "MSISDN_1023", type: "Data", scope: "International", limit: 2, actual: 4 },
    { subscriber: "MSISDN_1040", type: "SMS", scope: "Domestic", limit: 500, actual: 750 },
  ]

  const tableCellStyle = {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
  }

  const tableHeaderStyle = {
    ...tableCellStyle,
    fontWeight: 600,
    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f8f9fa",
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
       Rating Engine
      </Typography>

      {/* Out of Pack Billing Rates */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Out of Pack Billing Rates
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Category</TableCell>
                <TableCell sx={tableHeaderStyle} align="right">
                  Rate (USD)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outOfPackRates.map((row) => (
                <TableRow key={row.category}>
                  <TableCell sx={tableCellStyle}>{row.category}</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    {row.rate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Rating per Call/SMS/Data/Interconnect */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Rating per Call/SMS/Data/Interconnect
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Type</TableCell>
                <TableCell sx={tableHeaderStyle} align="right">
                  Domestic
                </TableCell>
                <TableCell sx={tableHeaderStyle} align="right">
                  International
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratingData.map((row) => (
                <TableRow key={row.type}>
                  <TableCell sx={tableCellStyle}>{row.type}</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    {row.domestic}
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    {row.international}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Free Browsing / Calls / SMS Offers */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Free Browsing / Calls / SMS Offers
        </Typography>
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {freeOffers.map((offer, index) => (
            <Typography
              key={index}
              sx={{
                mb: 1,
                color: offer.active ? "#4caf50" : theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              <strong>{offer.name}</strong>: {offer.description}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Override Rating Rules */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Override Rating Rules
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Rule</TableCell>
                <TableCell sx={tableHeaderStyle}>Description</TableCell>
                <TableCell sx={tableHeaderStyle}>Applied To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overrideRules.map((row) => (
                <TableRow key={row.rule}>
                  <TableCell sx={tableCellStyle}>{row.rule}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.description}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.appliedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Anomaly Detection */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Anomaly Detection (Voice, Data, SMS)
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Subscriber</TableCell>
                <TableCell sx={tableHeaderStyle}>Type</TableCell>
                <TableCell sx={tableHeaderStyle}>Scope</TableCell>
                <TableCell sx={tableHeaderStyle} align="right">
                  Limit
                </TableCell>
                <TableCell sx={tableHeaderStyle} align="right">
                  Actual
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {anomalyData.map((row) => (
                <TableRow
                  key={row.subscriber}
                  sx={{
                    backgroundColor:
                      row.actual > row.limit
                        ? theme.palette.mode === "dark"
                          ? "rgba(244, 67, 54, 0.1)"
                          : "rgba(244, 67, 54, 0.08)"
                        : "inherit",
                  }}
                >
                  <TableCell sx={tableCellStyle}>{row.subscriber}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.type}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.scope}</TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    {row.limit}
                  </TableCell>
                  <TableCell sx={tableCellStyle} align="right">
                    {row.actual}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default RatingEngine
