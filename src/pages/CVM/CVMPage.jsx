"use client"

import { Box, Container, Grid, Typography } from "@mui/material"
import MetricCards from "./MetricCards"
import ChurnRateTrendChart from "./ChurnRateTrendChart"
import RetentionOffersTable from "./RetentionOffersTable"
import DemandForecastChart from "./DemandForecastChart"
import FeatureImportanceChart from "./FeatureImportanceChart"
import WhatIfSimulator from "./WhatIfSimulator"
import AnomaliesTable from "./AnomaliesTable"

export default function CVMPage() {
  return (
    <Container maxWidth={false} sx={{ py: 2.5, px: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 0.5 }}>
          Customer Value Management
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
          Analytics, Predictions & Retention Strategies
        </Typography>
      </Box>

      {/* Metric Cards */}
      <MetricCards />
      {/* Demand Forecast */}
      <Box sx={{ mb: 2 }}>
        <DemandForecastChart />
      </Box>

 {/* Feature Importance & What-If Simulator */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={12}>
          <FeatureImportanceChart />
        </Grid>
        <Grid item xs={12} md={12}>
          <WhatIfSimulator />
        </Grid>
      </Grid>
      {/* Anomalies Table */}
      <AnomaliesTable />
      {/* Churn Rate & Retention Offers */}
      <Grid container spacing={2} sx={{ mb: 2,mt:2 }}>
        <Grid item xs={12} md={6}>
          <ChurnRateTrendChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <RetentionOffersTable />
        </Grid>
      </Grid>

      

     

      
    </Container>
  )
}
