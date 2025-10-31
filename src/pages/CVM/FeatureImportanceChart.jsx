import { Card, Typography, Box } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const FeatureImportanceChart = () => {
  const data = [
    { feature: "marketing", importance: 28 },
    { feature: "season", importance: 8 },
    { feature: "churnRate", importance: 6 },
    { feature: "price", importance: 4 },
  ]

  return (
    <Card
      sx={{
        p: 2.5,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        height: "100%",
        width:"47vw"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Feature Importance (Permutation)
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
          Lower RMSE increase = less important
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={"90%"}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis dataKey="feature" stroke="#64748b" style={{ fontSize: "0.7rem" }} />
          <YAxis stroke="#64748b" style={{ fontSize: "0.7rem" }} domain={[0, 30]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 8,
              fontSize: "0.75rem",
            }}
          />
          <Bar dataKey="importance" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default FeatureImportanceChart
