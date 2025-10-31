import { Card, Typography, Box } from "@mui/material"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const DemandForecastChart = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    day: i + 1,
    actual: 90 + Math.random() * 20 + i * 1.5,
  }))

  return (
    <Card
      sx={{
        p: 2.5,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        width:"100%"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Demand Forecast (Next 14 days)
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
          Model: ES + Linear Trend
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: "0.7rem" }} />
          <YAxis stroke="#64748b" style={{ fontSize: "0.7rem" }} domain={[0, 180]} />
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
            formatter={(value) => <span style={{ color: "#3b82f6" }}>Actual</span>}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorActual)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default DemandForecastChart
