"use client"

import { useState } from "react"
import { Box, Card, TextField, Button, Typography, InputAdornment, IconButton, Alert, useTheme } from "@mui/material"
import { Visibility, VisibilityOff, Person, Lock, Login as LoginIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // ✅ Typo fixed: naviagte → navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add your authentication logic here
      console.log("Login attempt:", formData)
        localStorage.setItem("isLoggedIn","true")
      // Example: Check credentials (replace with actual API call)
      if (formData.username === "admin" && formData.password === "admin@123") {
        console.log("Login Successfull")
        navigate("/dashboard/mis-reports") // ✅ This will now work correctly
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 360,
          width: "100%",
          p: 3,
          bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
          border: theme.palette.mode === "dark" ? "2px solid #333333" : "2px solid #e0e0e0",
          borderRadius: 2,
          boxShadow:
            theme.palette.mode === "dark" ? "0 8px 32px rgba(255, 255, 255, 0.08)" : "0 8px 32px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 12px 48px rgba(255, 255, 255, 0.12)"
                : "0 12px 48px rgba(0, 0, 0, 0.12)",
            borderColor: theme.palette.mode === "dark" ? "#666666" : "#999999",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: theme.palette.mode === "dark" ? "#000000" : "#f5f5f5",
              border: theme.palette.mode === "dark" ? "2px solid #333333" : "2px solid #e0e0e0",
              mb: 2,
            }}
          >
            <LoginIcon
              sx={{
                fontSize: 28,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              mb: 0.5,
              letterSpacing: "-0.5px",
              fontSize: "1.1rem",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#999999" : "#666666",
              fontSize: "0.8rem",
            }}
          >
            Sign in to access your dashboard
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: theme.palette.mode === "dark" ? "#2d1a1a" : "#ffebee",
              color: theme.palette.mode === "dark" ? "#ff6b6b" : "#c62828",
              border: theme.palette.mode === "dark" ? "1px solid #4d2626" : "1px solid #ef9a9a",
              fontSize: "0.8rem",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Username Field */}
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person
                      sx={{
                        color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                        fontSize: 18,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.mode === "dark" ? "#0a0a0a" : "#fafafa",
                  borderRadius: 1.5,
                  transition: "all 0.2s ease",
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                    borderWidth: "2px",
                  },
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#666666" : "#999999",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      borderWidth: "2px",
                    },
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #0a0a0a inset" : "0 0 0 100px #fafafa inset",
                    WebkitTextFillColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    caretColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    borderRadius: "6px",
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #000000 inset" : "0 0 0 100px #ffffff inset",
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #000000 inset" : "0 0 0 100px #ffffff inset",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                  fontSize: "0.85rem",
                  "&.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontWeight: 600,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.85rem",
                  padding: "10px 10px",
                },
              }}
            />
            {/* Password Field */}
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock
                      sx={{
                        color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                        fontSize: 18,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size="small"
                      sx={{
                        color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                        "&:hover": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.mode === "dark" ? "#0a0a0a" : "#fafafa",
                  borderRadius: 1.5,
                  transition: "all 0.2s ease",
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                    borderWidth: "2px",
                  },
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#666666" : "#999999",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    "& fieldset": {
                      borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      borderWidth: "2px",
                    },
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #0a0a0a inset" : "0 0 0 100px #fafafa inset",
                    WebkitTextFillColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    caretColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    borderRadius: "6px",
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #000000 inset" : "0 0 0 100px #ffffff inset",
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow:
                      theme.palette.mode === "dark" ? "0 0 0 100px #000000 inset" : "0 0 0 100px #ffffff inset",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                  fontSize: "0.85rem",
                  "&.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontWeight: 600,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.85rem",
                  padding: "10px 10px",
                },
              }}
            />
            {/* Forgot Password Link */}
            <Box sx={{ textAlign: "right", mt: -0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#999999" : "#666666",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>
            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.2,
                mt: 0.5,
                bgcolor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textTransform: "none",
                borderRadius: 1.5,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(255, 255, 255, 0.15)"
                    : "0 4px 12px rgba(0, 0, 0, 0.15)",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#e6e6e6" : "#1a1a1a",
                  transform: "translateY(-2px)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 6px 20px rgba(255, 255, 255, 0.2)"
                      : "0 6px 20px rgba(0, 0, 0, 0.2)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
                "&:disabled": {
                  bgcolor: theme.palette.mode === "dark" ? "#333333" : "#cccccc",
                  color: theme.palette.mode === "dark" ? "#666666" : "#999999",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </form>

        {/* Footer */}
        <Box sx={{ mt: 2.5, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#999999" : "#666666",
              fontSize: "0.75rem",
            }}
          >
            Don't have an account?{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.75rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign Up
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}