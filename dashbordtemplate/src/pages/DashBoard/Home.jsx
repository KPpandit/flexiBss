import {
  Box, Grid, Card, CardContent, CardHeader, Typography,
  Button, Avatar, Divider, Select, MenuItem, IconButton, 
  useTheme, alpha, styled, keyframes
} from '@mui/material';
import {
  Edit as EditIcon, SimCard as SimCardIcon, TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon, ExpandMore as ExpandMoreIcon,
  ChevronLeft as ChevronLeftIcon, TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon, ArrowForward as ArrowForwardIcon,
  PhoneAndroid as MobileIcon, Laptop as DesktopIcon,
  Tablet as TabletIcon, DevicesOther as OtherIcon
} from '@mui/icons-material';
import {
  LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';

// Custom animation for cards
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled components for better customization
const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.shadows[6],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
    animation: `${floatAnimation} 3s ease-in-out infinite`,
  },
  width: 600,
  backgroundColor: theme.palette.background.paper,
  backgroundImage: 'none',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  }
}));

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme();
  return (
    <AnimatedCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" fontWeight={700} mt={1}>{value}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {change > 0 ? (
                <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 18 }} />
              ) : (
                <TrendingDownIcon sx={{ color: theme.palette.error.main, fontSize: 18 }} />
              )}
              <Typography 
                variant="body2" 
                ml={0.5}
                color={change > 0 ? 'success.main' : 'error.main'}
              >
                {change > 0 ? '+' : ''}{change}%
              </Typography>
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                vs last month
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ 
            bgcolor: alpha(color, 0.1), 
            color: color, 
            width: 48, 
            height: 48,
            boxShadow: theme.shadows[2],
          }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </AnimatedCard>
  );
};

const DashboardHome = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Enhanced chart style configurations
  const chartStyles = {
    textColor: isDarkMode ? theme.palette.text.primary : '#555',
    gridColor: isDarkMode ? alpha(theme.palette.divider, 0.2) : alpha('#000', 0.1),
    tooltip: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[4],
    },
    legend: {
      color: theme.palette.text.primary,
      padding: theme.spacing(1, 0),
    },
    axis: {
      tick: {
        fill: isDarkMode ? theme.palette.text.secondary : '#666',
        fontSize: 12,
      },
    },
  };

  // Data for charts
  const prepaidData = [
    { name: 'Jan', sales: 4200, activations: 3800 },
    { name: 'Feb', sales: 5000, activations: 4200 },
    { name: 'Mar', sales: 4800, activations: 4500 },
    { name: 'Apr', sales: 5500, activations: 5000 },
    { name: 'May', sales: 6000, activations: 5200 },
    { name: 'Jun', sales: 6500, activations: 5800 },
  ];

  const postpaidData = [
    { name: 'Jan', sales: 1800, activations: 1500 },
    { name: 'Feb', sales: 2200, activations: 1900 },
    { name: 'Mar', sales: 2500, activations: 2100 },
    { name: 'Apr', sales: 2800, activations: 2400 },
    { name: 'May', sales: 3200, activations: 2800 },
    { name: 'Jun', sales: 3500, activations: 3100 },
  ];

  const regionDistribution = [
    { name: 'North', prepaid: 4200, postpaid: 1800, color: theme.palette.primary.main },
    { name: 'South', prepaid: 3800, postpaid: 2200, color: theme.palette.secondary.main },
    { name: 'East', prepaid: 3500, postpaid: 2500, color: theme.palette.info.main },
    { name: 'West', prepaid: 4000, postpaid: 2000, color: theme.palette.warning.main },
  ];

  const deviceDistribution = [
    { name: 'Mobile', prepaid: 65, postpaid: 45, icon: <MobileIcon />, color: theme.palette.success.main },
    { name: 'Desktop', prepaid: 20, postpaid: 35, icon: <DesktopIcon />, color: theme.palette.info.main },
    { name: 'Tablet', prepaid: 10, postpaid: 15, icon: <TabletIcon />, color: theme.palette.warning.main },
    { name: 'Other', prepaid: 5, postpaid: 5, icon: <OtherIcon />, color: theme.palette.error.main },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ 
          backgroundColor: chartStyles.tooltip.backgroundColor,
          border: chartStyles.tooltip.border,
          borderRadius: chartStyles.tooltip.borderRadius,
          padding: chartStyles.tooltip.padding,
          color: chartStyles.tooltip.color,
          boxShadow: chartStyles.tooltip.boxShadow,
        }}>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>{label}</Typography>
          {payload.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                backgroundColor: item.color,
                borderRadius: '50%'
              }} />
              <Typography variant="body2">
                {item.name}: <strong>{item.value}</strong>
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ 
      p: 3,
      background: isDarkMode 
        ? 'linear-gradient(to bottom, #121212, #1e1e1e)'
        : 'linear-gradient(to bottom, #f5f7fa, #e8ecf1)',
      minHeight: '100vh',
    }}>
      {/* Quick Stats Row */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Prepaid SIMs" 
            value="24,568" 
            change={12.5} 
            icon={<SimCardIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Postpaid SIMs" 
            value="8,742" 
            change={8.2} 
            icon={<SimCardIcon />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Prepaid Growth" 
            value="+15.3%" 
            change={15.3} 
            icon={<TrendingUpIcon />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Postpaid Growth" 
            value="+6.8%" 
            change={6.8} 
            icon={<TrendingUpIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Main Charts Row */}
      <Grid container spacing={3} mb={3}>
        {/* Prepaid SIM Performance */}
        <Grid item xs={12} sm={6}>
          <AnimatedCard>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>Prepaid SIM Performance</Typography>}
              subheader="Last 6 months sales and activations"
              action={
                <IconButton sx={{ color: theme.palette.text.secondary }}>
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={prepaidData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActivations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={chartStyles.gridColor} 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="name" 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <YAxis 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={chartStyles.legend}
                    iconType="circle"
                    iconSize={10}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={theme.palette.primary.main} 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activations" 
                    stroke={theme.palette.secondary.main} 
                    fillOpacity={1} 
                    fill="url(#colorActivations)" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </AnimatedCard>
        </Grid>

        {/* Postpaid SIM Performance */}
        <Grid item xs={12} sm={6}>
          <AnimatedCard>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>Postpaid SIM Performance</Typography>}
              subheader="Last 6 months sales and activations"
              action={
                <IconButton sx={{ color: theme.palette.text.secondary }}>
                  <SettingsIcon />
                </IconButton>
              }
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={postpaidData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={chartStyles.gridColor} 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="name" 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <YAxis 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={chartStyles.legend}
                    iconType="circle"
                    iconSize={10}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill={theme.palette.info.main} 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="activations" 
                    fill={theme.palette.warning.main} 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={3}>
        {/* Regional Distribution */}
        <Grid item xs={12} sm={6}>
          <AnimatedCard>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>Regional Distribution</Typography>}
              subheader="Prepaid vs Postpaid by region"
              action={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Select 
                    size="small" 
                    defaultValue="current"
                    sx={{
                      '& .MuiSelect-select': {
                        py: 0.5,
                        fontSize: '0.875rem',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.divider,
                      },
                    }}
                  >
                    <MenuItem value="current">Current</MenuItem>
                    <MenuItem value="quarter">This Quarter</MenuItem>
                  </Select>
                  <IconButton sx={{ color: theme.palette.text.secondary }}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Box>
              }
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={regionDistribution}
                  layout="vertical"
                  margin={{ left: 30 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={chartStyles.gridColor}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    type="number" 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={chartStyles.axis.tick}
                    axisLine={{ stroke: chartStyles.gridColor }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={chartStyles.legend}
                    iconType="circle"
                    iconSize={10}
                  />
                  <Bar 
                    dataKey="prepaid" 
                    fill={theme.palette.primary.main} 
                    radius={[0, 4, 4, 0]} 
                    animationDuration={1500}
                    name="Prepaid"
                  />
                  <Bar 
                    dataKey="postpaid" 
                    fill={theme.palette.secondary.main} 
                    radius={[0, 4, 4, 0]} 
                    animationDuration={1500}
                    name="Postpaid"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </AnimatedCard>
        </Grid>

        {/* Device Distribution */}
        <Grid item xs={12} sm={6}>
          <AnimatedCard>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>Device Distribution</Typography>}
              subheader="Prepaid vs Postpaid by device type"
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" textAlign="center" mb={2}>
                    Prepaid SIMs
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={deviceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        dataKey="prepaid"
                        labelLine={false}
                        animationDuration={1500}
                      >
                        {deviceDistribution.map((entry, index) => (
                          <Cell 
                            key={index} 
                            fill={entry.color}
                            stroke={theme.palette.background.paper}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={<CustomTooltip />}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" textAlign="center" mb={2}>
                    Postpaid SIMs
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={deviceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        dataKey="postpaid"
                        labelLine={false}
                        animationDuration={1500}
                      >
                        {deviceDistribution.map((entry, index) => (
                          <Cell 
                            key={index} 
                            fill={entry.color}
                            stroke={theme.palette.background.paper}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={<CustomTooltip />}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mt={2}>
                    {deviceDistribution.map((device, index) => (
                      <Box key={index} display="flex" alignItems="center">
                        <Box 
                          width={12} 
                          height={12} 
                          bgcolor={device.color} 
                          borderRadius="50%" 
                          mr={1}
                        />
                        <Typography variant="body2">{device.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;