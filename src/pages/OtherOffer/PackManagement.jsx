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
          gradient: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
        }
      case 1:
        return {
          color: theme.palette.warning.main,
          icon: <PendingIcon />,
          gradient: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
        }
      case 2:
        return {
          color: theme.palette.error.main,
          icon: <RejectedIcon />,
          gradient: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
        }
      default:
        return {
          color: theme.palette.primary.main,
          icon: <InsightsIcon />,
          gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? `radial-gradient(ellipse at top, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
            : `radial-gradient(ellipse at top, ${theme.palette.grey[50]} 0%, ${theme.palette.common.white} 100%)`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`
                : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.secondary.light} 100%)`,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
              opacity: 0.3,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                  Pack Management
                </Typography>
                {/* <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                  Please Make all Packs Analysis
                </Typography> */}
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleAddPack}
                sx={{
                  borderRadius: 4,
                  px: 4,
                  py: 1.5,
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Create New Pack
              </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3}>
              {statusTabs.map((status, index) => {
                const config = getTabConfig(index)
                const count = getPackCountByStatus(status)
                return (
                  <Grid item xs={12} md={4} key={status}>
                    <Box
                      sx={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        p: 3,
                        border: "1px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255,255,255,0.25)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: "rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        >
                          {config.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
                            {count}
                          </Typography>
                          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
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

        {/* Filters Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[700]} 100%)`
                : `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${theme.palette.grey[50]} 100%)`,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* Increased search bar width to 8 columns */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search packs by name, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  },
                }}
              />
            </Grid>
            {/* Reduced category filter to 4 columns */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category Filter</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category Filter"
                  sx={{
                    borderRadius: 3,
                    background: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
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

        {/* Status Tabs */}
        <Paper
          elevation={2}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            background: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.common.white,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: "1rem",
                py: 3,
                transition: "all 0.3s ease",
                "&.Mui-selected": {
                  color: "white",
                },
              },
              "& .MuiTabs-indicator": {
                height: "100%",
                borderRadius: 0,
                background: getTabConfig(activeTab).gradient,
                zIndex: 0,
              },
            }}
          >
            {statusTabs.map((status, index) => {
              const config = getTabConfig(index)
              return (
                <Tab
                  key={status}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
                      {config.icon}
                      <Typography variant="inherit" sx={{ fontWeight: 700 }}>
                        {status}
                      </Typography>
                      <Chip
                        label={getPackCountByStatus(status)}
                        size="small"
                        sx={{
                          backgroundColor: activeTab === index ? "rgba(255,255,255,0.2)" : config.color,
                          color: activeTab === index ? "white" : "white",
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

        {/* Pack Grid */}
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
              p: 8,
              textAlign: "center",
              borderRadius: 4,
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[700]} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.common.white} 100%)`,
              border: `2px dashed ${theme.palette.divider}`,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              <InsightsIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2, fontWeight: 600 }}>
              No packs found
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              Try adjusting your search criteria or create a new pack to get started
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddPack} size="large">
              Create Your First Pack
            </Button>
          </Paper>
        )}

        {/* Pack Form Dialog */}
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
