import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material"

const AnomaliesTable = () => {
  const anomalies = [
    { timestamp: "2025-10-07 07:19:29", metric: "demand", value: "165.74", method: "z-score", severity: "LOW" },
    { timestamp: "2025-10-08 07:19:29", metric: "demand", value: "171.07", method: "z-score", severity: "MEDIUM" },
    { timestamp: "2025-10-09 07:19:29", metric: "demand", value: "172.61", method: "z-score", severity: "MEDIUM" },
    { timestamp: "2025-10-10 07:19:29", metric: "demand", value: "173.38", method: "z-score", severity: "MEDIUM" },
    { timestamp: "2025-10-11 07:19:29", metric: "demand", value: "174.52", method: "z-score", severity: "MEDIUM" },
    { timestamp: "2025-10-12 07:19:29", metric: "demand", value: "178.12", method: "z-score", severity: "HIGH" },
    { timestamp: "2025-10-13 07:19:29", metric: "demand", value: "178.3", method: "z-score", severity: "HIGH" },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "LOW":
        return { bgcolor: "#10b981", color: "#fff" }
      case "MEDIUM":
        return { bgcolor: "#f59e0b", color: "#000" }
      case "HIGH":
        return { bgcolor: "#ef4444", color: "#fff" }
      default:
        return { bgcolor: "#6b7280", color: "#fff" }
    }
  }

  return (
    <Card
      sx={{
        p: 2.5,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Detected Anomalies (last 7 days)
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
          Z-score & IQR
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Timestamp
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Metric
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Value
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Method
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Severity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {anomalies.map((row, index) => (
              <TableRow key={index} sx={{ "&:hover": { bgcolor: "rgba(255, 255, 255, 0.02)" } }}>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.timestamp}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.metric}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.value}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.method}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <Chip
                    label={row.severity}
                    size="small"
                    sx={{ height: 20, fontSize: "0.65rem", fontWeight: 600, ...getSeverityColor(row.severity) }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default AnomaliesTable
