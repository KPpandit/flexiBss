import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Select, 
  MenuItem, 
  Badge, 
  Avatar,
  Box,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';

const DashboardTopbar = ({ toggleTheme, mode }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Flexi 5G BSS
        </Typography>
        
        <Select
          value={mode}
          onChange={toggleTheme}
          size="small"
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            mr: 2,
            '& .MuiSelect-icon': {
              color: 'white'
            }
          }}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {value === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
              <Typography sx={{ ml: 1 }}>
                {value === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Typography>
            </Box>
          )}
        >
          <MenuItem value="light">
            <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
            Light
          </MenuItem>
          <MenuItem value="dark">
            <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
            Dark
          </MenuItem>
        </Select>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">Star</Typography>
            <Badge 
              badgeContent="25,494" 
              color="secondary" 
              sx={{ ml: 1 }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DownloadIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">470,000</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">CONTACT@AKVEO.COM</Typography>
          </Box>
          
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32,
              bgcolor: 'white',
              color: theme.palette.primary.main
            }}
          >
            NJ
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardTopbar;