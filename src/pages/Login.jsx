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
  CircularProgress
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
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 450,
          overflow: 'hidden',
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)',
            color: 'white',
            textAlign: 'center',
            p: 3
          }}
        >
          <Avatar sx={{ bgcolor: 'white', color: '#3f51b5', mx: 'auto', mb: 1 }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            Sign in to your dashboard
          </Typography>
        </Box>
        
        {/* Form */}
        <Box sx={{ p: 3 }}>
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
                startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
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
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
            
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mt: 2,
              mb: 2
            }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              endIcon={!isLoading && <ArrowForwardIcon />}
              sx={{ 
                py: 1.5,
                mb: 2
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }}>Or continue with</Divider>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{ textTransform: 'none' }}
              >
                GitHub
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<TwitterIcon />}
                sx={{ textTransform: 'none' }}
              >
                Twitter
              </Button>
            </Box>
          </form>
        </Box>
        
        <Box sx={{ 
          backgroundColor: 'grey.50',
          py: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link href="#" color="primary">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}