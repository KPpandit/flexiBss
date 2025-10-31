import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material"

const RetentionOffersTable = () => {
  const offers = [
    { segment: "Youth Plan", predictedChurn: "15.2", offer: "Free Weekend Data", gain: "+8%" },
    { segment: "Postpaid", predictedChurn: "12.4", offer: "2-Month Netflix Promo", gain: "+6%" },
    { segment: "Heavy Data", predictedChurn: "17.1", offer: "Night-Pack 50% Off", gain: "+9%" },
    { segment: "Prepaid Basic", predictedChurn: "10.9", offer: "Extra 1GB Bundle", gain: "+5%" },
  ]

  return (
    <Card
      sx={{
        p: 2.5,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        height: "100%",
        width:"100%"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Recommended Retention Offers
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
          Based on Churn Prediction
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
                Segment
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Predicted Churn (%)
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Recommended Offer
              </TableCell>
              <TableCell
                sx={{
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                Retention Gain
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row, index) => (
              <TableRow key={index} sx={{ "&:hover": { bgcolor: "rgba(255, 255, 255, 0.02)" } }}>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.segment}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.predictedChurn}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  {row.offer}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.75rem",
                    color: "#10b981",
                    fontWeight: 600,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {row.gain}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default RetentionOffersTable
