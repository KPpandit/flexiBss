import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Avatar, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Divider,
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  Lock as LockIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';

const dummyUser = {
  username: 'admin',
  password: '123456'
};

export default function Login() {
  const theme = useTheme();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (form.username === dummyUser.username && form.password === dummyUser.password) {
        localStorage.setItem('isLoggedIn', 'true');
        // ✅ SUCCESS CASE: Fields clear karo
        setForm({ username: '', password: '' });
        navigate('/dashboard/mis-reports');
      } else {
        setError('Invalid username or password');
        // ✅ FAILURE CASE: Bhi fields clear karo
        setForm({ username: '', password: '' });
      }
      setIsLoading(false);
    }, 1000);
  };

  // ✅ Agar user back karke aata hai tab bhi fields clear rahenge
  // kyunki component mount hote hi form state reset ho jaati hai

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 450,
          overflow: 'hidden',
          borderRadius: 3,
          border: '2px solid #333333',
          backgroundColor: '#000000',
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#555555',
            boxShadow: '0 12px 48px rgba(255, 255, 255, 0.12)',
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
            color: 'white',
            textAlign: 'center',
            p: 4,
            borderBottom: '1px solid #333333'
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: '#ffffff', 
              color: '#000000', 
              mx: 'auto', 
              mb: 2,
              width: 60,
              height: 60
            }}
          >
            <LockIcon fontSize="large" />
          </Avatar>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem'
            }}
          >
            Sign in to your dashboard
          </Typography>
        </Box>
        
        {/* Form */}
        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: 'rgba(255,255,255,0.7)' }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#333333',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#555555'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#ffffff'
                  }
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                  fontSize: '1rem'
                },
             
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #000 inset', // black bg
                  WebkitTextFillColor: '#fff', // white text
                  transition: 'background-color 5000s ease-in-out 0s', // prevent flash
                },
              }}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'rgba(255,255,255,0.7)' }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#333333',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#555555'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#ffffff'
                  }
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                  fontSize: '1rem'
                },'& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #000 inset', // black bg
                  WebkitTextFillColor: '#fff', // white text
                  transition: 'background-color 5000s ease-in-out 0s', // prevent flash
                },
              }}
            />
            
            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mt: 2,
                  textAlign: 'center',
                  fontSize: '0.9rem'
                }}
              >
                {error}
              </Typography>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mt: 3,
              mb: 3
            }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    value="remember" 
                    sx={{
                      color: '#555555',
                      '&.Mui-checked': {
                        color: '#ffffff'
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                    Remember me
                  </Typography>
                }
              />
              <Link 
                href="#" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#ffffff',
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              endIcon={!isLoading && <ArrowForwardIcon />}
              sx={{ 
                py: 1.5,
                mb: 3,
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                border: '2px solid transparent',
                '&:hover': {
                  backgroundColor: '#e6e6e6',
                  borderColor: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
                },
                '&:disabled': {
                  backgroundColor: '#333333',
                  color: '#666666'
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>
        </Box>
        
        <Box sx={{ 
          backgroundColor: '#0a0a0a',
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid #333333'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.9rem'
            }}
          >
            Don't have an account?{' '}
            <Link 
              href="#" 
              sx={{ 
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}