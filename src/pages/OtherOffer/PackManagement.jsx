"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  Paper,
  Fade,
  Container,
  Avatar,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  CheckCircle as ApprovedIcon,
  Schedule as PendingIcon,
  Cancel as RejectedIcon,
  Insights as InsightsIcon,
} from "@mui/icons-material"
import PackCard from "./PackCard"
import PackForm from "./PackForm"
import { mockPacks } from "./MockPacks"

const PackManagement = () => {
  const theme = useTheme()
  const [packs, setPacks] = useState(mockPacks)
  const [activeTab, setActiveTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [openForm, setOpenForm] = useState(false)
  const [editingPack, setEditingPack] = useState(null)

  const statusTabs = ["Approved", "Pending", "Rejected"]

  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const matchesStatus = pack.pack_status === statusTabs[activeTab]
      const matchesSearch =
        pack.pack_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.pack_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "All" || pack.category_name === categoryFilter

      return matchesStatus && matchesSearch && matchesCategory
    })
  }, [packs, activeTab, searchTerm, categoryFilter, statusTabs])

  const getPackCountByStatus = (status) => {
    return packs.filter((pack) => pack.pack_status === status).length
  }

  const handleAddPack = () => {
    setEditingPack(null)
    setOpenForm(true)
  }

  const handleEditPack = (pack) => {
    setEditingPack(pack)
    setOpenForm(true)
  }

  const handleDeletePack = (packId) => {
    setPacks((prev) => prev.filter((pack) => pack.pack_id !== packId))
  }

  const handleSavePack = (pack) => {
    if (editingPack) {
      setPacks((prev) => prev.map((p) => (p.pack_id === pack.pack_id ? pack : p)))
    } else {
      setPacks((prev) => [...prev, pack])
    }
  }

  const getTabConfig = (index) => {
    switch (index) {
      case 0:
        return {
          color: theme.palette.success.main,
          icon: <ApprovedIcon />,
        }
      case 1:
        return {
          color: theme.palette.warning.main,
          icon: <PendingIcon />,
        }
      case 2:
        return {
          color: theme.palette.error.main,
          icon: <RejectedIcon />,
        }
      default:
        return {
          color: theme.palette.primary.main,
          icon: <InsightsIcon />,
        }
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 2.5 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 4,
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #e0e0e0",
            boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255, 255, 255, 0.1)" : theme.shadows[1],
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  }}
                >
                  Tariff Management
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="medium"
                startIcon={<AddIcon />}
                onClick={handleAddPack}
                sx={{
                  borderRadius: 4,
                  px: 3,
                  py: 1,
                  backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                  },
                }}
              >
                Create New Pack
              </Button>
            </Box>

            <Grid container spacing={2}>
              {statusTabs.map((status, index) => {
                const config = getTabConfig(index)
                const count = getPackCountByStatus(status)
                return (
                  <Grid item xs={12} md={4} key={status}>
                    <Box
                      sx={{
                        backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                        border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
                        borderRadius: 3,
                        p: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                          }}
                        >
                          {config.icon}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 800,
                              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            }}
                          >
                            {count}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                            }}
                          >
                            {status} Packs
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 4,
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8} sx={{ width: 400 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search packs by name, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#666666" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ width: 300 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }}>
                  Category Filter
                </InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category Filter"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#666666" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    },
                  }}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="Prepaid">Prepaid</MenuItem>
                  <MenuItem value="Postpaid">Postpaid</MenuItem>
                  <MenuItem value="FWA">FWA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            mb: 3,
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            border: theme.palette.mode === "dark" ? "1px solid #666666" : "1px solid #e0e0e0",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: "0.85rem",
                py: 2,
                transition: "all 0.3s ease",
                color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                "&.Mui-selected": {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                },
              },
              "& .MuiTabs-indicator": {
                height: 4,
                borderRadius: 0,
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              },
            }}
          >
            {statusTabs.map((status, index) => {
              const config = getTabConfig(index)
              return (
                <Tab
                  key={status}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {config.icon}
                      <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                        {status}
                      </Typography>
                      <Chip
                        label={getPackCountByStatus(status)}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                          fontWeight: 700,
                          minWidth: 24,
                        }}
                      />
                    </Box>
                  }
                />
              )
            })}
          </Tabs>
        </Paper>

        <Fade in={true} timeout={800}>
          <Grid container spacing={4}>
            {filteredPacks.map((pack, index) => (
              <Grid item xs={12} sm={6} lg={4} key={pack.pack_id}>
                <PackCard pack={pack} onEdit={handleEditPack} onDelete={handleDeletePack} />
              </Grid>
            ))}
          </Grid>
        </Fade>

        {filteredPacks.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              border: theme.palette.mode === "dark" ? "2px dashed #666666" : "2px dashed #e0e0e0",
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mx: "auto",
                mb: 2,
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              }}
            >
              <InsightsIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              No packs found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                mb: 2,
              }}
            >
              Try adjusting your search criteria or create a new pack to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPack}
              size="medium"
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                },
              }}
            >
              Create Your First Pack
            </Button>
          </Paper>
        )}

        <PackForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSavePack}
          pack={editingPack}
          isEdit={!!editingPack}
        />
      </Container>
    </Box>
  )
}

export default PackManagement
