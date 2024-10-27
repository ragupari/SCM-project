
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
  Stack,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  LocalShipping as TruckIcon,
  Person as DriverIcon,
  Map as MapIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { getSchedule } from '../services/api';
import { formatTime } from '../utils/dateUtils';

const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      gap: 2,
    }}
  >
    <CircularProgress size={48} />
    <Typography variant="body2" color="text.secondary">
      Loading schedule...
    </Typography>
  </Box>
);

const ErrorMessage = ({ message }) => (
  <Box sx={{ maxWidth: 'sm', mx: 'auto', mt: 4, p: 2 }}>
    <Alert
      severity="error"
      action={
        <IconButton
          color="inherit"
          size="small"
          onClick={() => window.location.reload()}
        >
          <RefreshIcon />
        </IconButton>
      }
    >
      <AlertTitle>Error Loading Schedule</AlertTitle>
      {message}
    </Alert>
  </Box>
);

const AssistantSchedule = ({ user, onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleData = await getSchedule(user.role, user.id);
        setSchedules(scheduleData);
      } catch (error) {
        setError(error.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [user.id, user.role]);

  const getStatusColor = (status) => {
    const statusColors = {
      active: {
        color: theme.palette.success.main,
        bgcolor: theme.palette.success.lighter || theme.palette.success.light + '20',
      },
      upcoming: {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.primary.lighter || theme.palette.primary.light + '20',
      },
      completed: {
        color: theme.palette.grey[600],
        bgcolor: theme.palette.grey[100],
      },
    };
    return statusColors[status.toLowerCase()] || statusColors.completed;
  };

  const handleDestinationsClick = (scheduleId) => {
    navigate(`/destinations/${scheduleId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
          background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        }}
      >
        <Box sx={{ p: 3, color: 'white' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '2rem',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {user.name[0]}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Assistant ID: {user.id}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Paper sx={{ borderRadius: 0 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={onLogout}
              sx={{ borderRadius: '20px' }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Paper>

      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Today's Schedule
      </Typography>

      {schedules.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography color="text.secondary">No schedules found for today</Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              elevation={2}
              sx={{
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Chip
                    icon={<TimeIcon />}
                    label={`${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`}
                    variant="outlined"
                    sx={{
                      borderRadius: '20px',
                      '& .MuiChip-icon': { color: theme.palette.primary.main },
                    }}
                  />
                  <Chip
                    label={schedule.status}
                    sx={{
                      borderRadius: '20px',
                      ...getStatusColor(schedule.status),
                    }}
                  />
                </Box>

                <Stack spacing={2.5}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <LocationIcon color="action" sx={{ mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {schedule.route}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Via: {schedule.mainTowns}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TruckIcon color="action" />
                    <Typography variant="body1">
                      Truck ID: {schedule.truck}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <DriverIcon color="action" />
                    <Typography variant="body1">
                      Driver: {schedule.driver}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleDestinationsClick(schedule.id)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    justifyContent: 'space-between',
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: theme.palette.primary.lighter || 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <MapIcon color="action" />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="subtitle2">Destinations</Typography>
                      <Typography variant="body2" color="text.secondary">
                        View delivery route details
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIcon
                    sx={{
                      transition: 'transform 0.2s',
                      '.MuiButton-root:hover &': {
                        transform: 'translateX(4px)',
                      },
                    }}
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default AssistantSchedule;