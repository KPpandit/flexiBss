import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Box
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const location = useLocation(); // 🔁 Get current route path

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      icon: <AnalyticsIcon />,
      text: 'Analytics',
      path: '/dashboard',
    },
    {
      icon: <RecentActorsIcon />,
      text: 'Customers',
      path: '/dashboard/iot'
    },
    {
      icon: <RequestQuoteIcon />,
      text: 'Tarrif Mangement',
      path: '/dashboard/plan'
    }
  ];

  return (
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
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: isActive ? theme.palette.action.selected : 'inherit',
                  color: isActive ? theme.palette.primary.main : 'inherit',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  mb: 1,
                }}
              >
                <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={item.text} />}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
