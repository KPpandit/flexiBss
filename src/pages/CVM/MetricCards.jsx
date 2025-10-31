import { Box, Card, Grid, Typography, Chip } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"

const MetricCards = () => {
  const metrics = [
    {
      title: "Revenue (Today)",
      value: "$21,395",
      subtitle: "vs 7d avg",
      change: "2.8% vs 7d",
      trend: "up",
    },
    {
      title: "Active Users",
      value: "6240",
      subtitle: "current online",
      change: "98 Δ",
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "4.25%",
      subtitle: "predicted lift",
      change: "2.8%",
      trend: "up",
    },
    {
      title: "Anomaly Score",
      value: "0.25",
      subtitle: "0 normal · 1 high",
      change: "OK",
      status: "success",
    },
  ]

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {metrics.map((metric, index) => (
        <Grid item sx={{width:'24.2%'}} xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>
              {metric.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5, fontSize: "1.5rem" }}>
              {metric.value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.65rem" }}>
                {metric.subtitle}
              </Typography>
              {metric.status ? (
                <Chip
                  label={metric.change}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    bgcolor: "#10b981",
                    color: "#fff",
                  }}
                />
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    color: metric.trend === "up" ? "#10b981" : "#ef4444",
                    fontSize: "0.65rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {metric.trend === "up" ? (
                    <TrendingUpIcon sx={{ fontSize: 12, mr: 0.3 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 12, mr: 0.3 }} />
                  )}
                  {metric.change}
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default MetricCards
