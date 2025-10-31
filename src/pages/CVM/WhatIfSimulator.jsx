"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

const WhatIfSimulator = () => {
  const [formData, setFormData] = useState({
    price: "10",
    marketingSpend: "50",
    churnRate: "0.05",
    seasonality: "0.2",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSimulation = () => {
    console.log("Running simulation with:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "#0B1120",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:'30vw',
        p: 3,
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #111827 0%, #1E293B 100%)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: 600,
            mb: 2.5,
            fontSize: "1.05rem",
          }}
        >
          What-If Simulator
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: "Price", field: "price" },
            { label: "Marketing Spend", field: "marketingSpend" },
            { label: "Churn Rate", field: "churnRate" },
            { label: "Seasonality", field: "seasonality" },
          ].map((item) => (
            <Grid item xs={6} key={item.field}>
              <Typography
                variant="caption"
                sx={{
                  color: "#94A3B8",
                  fontSize: "0.75rem",
                  mb: 0.6,
                  display: "block",
                }}
              >
                {item.label}
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData[item.field]}
                onChange={handleChange(item.field)}
                InputProps={{
                  sx: {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderRadius: 1.5,
                    color: "#fff",
                    fontSize: "0.85rem",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5B8DEF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5B8DEF",
                      boxShadow: "0 0 5px #5B8DEF",
                    },
                  },
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSimulation}
              sx={{
                mt: 5,
                bgcolor: "#5B8DEF",
                color: "#fff",
                py: 1.1,
                fontSize: "0.85rem",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: "0 0 8px rgba(91,141,239,0.5)",
                "&:hover": {
                  bgcolor: "#4A7CD6",
                  boxShadow: "0 0 12px rgba(91,141,239,0.7)",
                },
              }}
            >
              Run Simulation
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default WhatIfSimulator;
