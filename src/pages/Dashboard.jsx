import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Select, 
  MenuItem, 
  Badge, 
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Apps as AppsIcon,
  Add as AddIcon,
  Map as MapIcon,
  BarChart as BarChartIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Edit as EditIcon,
  Work as WorkIcon
} from '@mui/icons-material';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ngx-admin
          </Typography>
          
          <Select
            value="light"
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              mr: 2,
              '& .MuiSelect-icon': {
                color: 'white'
              }
            }}
          >
            <MenuItem value="light">Material Light</MenuItem>
            <MenuItem value="dark">Material Dark</MenuItem>
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
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? 240 : 56,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: sidebarOpen ? 240 : 56,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar /> {/* For spacing under app bar */}
        
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem 
              button 
              sx={{ 
                backgroundColor: 'primary.light',
                color: 'primary.main',
                mb: 1
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="E-commerce" />}
            </ListItem>
            
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="IoT Dashboard" />}
            </ListItem>
          </List>
          
          {sidebarOpen && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="overline" sx={{ px: 3, display: 'block' }}>
                FEATURES
              </Typography>
              
              <List>
                {[
                  { icon: <DashboardIcon />, text: 'Layout' },
                  { icon: <DescriptionIcon />, text: 'Forms' },
                  { icon: <AppsIcon />, text: 'UI Features' },
                  { icon: <AppsIcon />, text: 'Modal & Overlays' },
                  { icon: <AddIcon />, text: 'Extra Components' },
                  { icon: <MapIcon />, text: 'Maps' },
                  { icon: <BarChartIcon />, text: 'Charts' },
                ].map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    <ChevronLeftIcon fontSize="small" />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          ml: sidebarOpen ? '240px' : '56px',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> {/* For spacing under app bar */}
        
        {/* Top Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <EditIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      Hire us to customize
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ngx-admin
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    CONTACT US
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <WorkIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      Documentation and
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      customization articles
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    LEARN MORE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>$</Typography>
                    <Typography variant="body1" sx={{ ml: 0.5, fontWeight: 'bold' }}>Profit</Typography>
                  </Box>
                }
                action={<ChevronRightIcon />}
              />
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: 'primary.main', 
                      borderRadius: '50%', 
                      mr: 1 
                    }} />
                    <Typography variant="body2" color="text.secondary">
                      transactions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: 'success.main', 
                      borderRadius: '50%', 
                      mr: 1 
                    }} />
                    <Typography variant="body2" color="text.secondary">
                      orders
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                  {Array.from({ length: 30 }, (_, i) => (
                    <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ 
                        bgcolor: 'success.main', 
                        borderRadius: 1,
                        height: `${Math.random() * 80 + 20}%`
                      }} />
                      <Box sx={{ 
                        bgcolor: 'primary.main', 
                        borderRadius: 1,
                        height: `${Math.random() * 60 + 10}%`
                      }} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Bitcoin</Typography>
                    <ExpandMoreIcon />
                  </Box>
                }
                action={<ChevronRightIcon />}
              />
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Daily Income
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        45,895
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                      <TrendingUpIcon fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        4%
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  height: 120, 
                  bgcolor: 'primary.main', 
                  borderRadius: 1 
                }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Traffic Section */}
        <Card>
          <CardHeader
            title="Traffic"
            action={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select
                  size="small"
                  defaultValue="week"
                  sx={{ '& .MuiSelect-select': { py: 1 } }}
                >
                  <MenuItem value="week">week</MenuItem>
                  <MenuItem value="month">month</MenuItem>
                </Select>
                <ChevronRightIcon />
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              py: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mon
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  932
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                  <TrendingDownIcon fontSize="small" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    12%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Sun
                  </Typography>
                  <Box sx={{ width: 32, height: 4, bgcolor: 'error.main', borderRadius: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Mon
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}