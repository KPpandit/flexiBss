import { Card, Typography, Box } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const ChurnRateTrendChart = () => {
  const data = [
    { week: "W2", churnRate: 5.2 },
    { week: "W4", churnRate: 5.8 },
    { week: "W6", churnRate: 5.5 },
    { week: "W8", churnRate: 4.8 },
    { week: "W11", churnRate: 5.0 },
    { week: "W14", churnRate: 4.7 },
    { week: "W17", churnRate: 4.9 },
    { week: "W20", churnRate: 4.6 },
    { week: "W23", churnRate: 5.3 },
    { week: "W26", churnRate: 4.8 },
    { week: "W30", churnRate: 4.7 },
  ]

  return (
    <Card
      sx={{
        p: 2.5,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        height: "100%",
        width:"39vw"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Churn Rate Trend (Weekly)
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
          Forecast 6 Weeks
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: "0.7rem" }} />
          <YAxis stroke="#64748b" style={{ fontSize: "0.7rem" }} domain={[0, 8]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 8,
              fontSize: "0.75rem",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "0.7rem" }}
            iconType="line"
            formatter={(value) => <span style={{ color: "#ef4444" }}>churnRate</span>}
          />
          <Line type="monotone" dataKey="churnRate" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default ChurnRateTrendChart
