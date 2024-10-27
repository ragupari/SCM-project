import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
  CircularProgress
} from '@mui/material';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { getDriverProfile } from '../services/api';

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
      Loading profile...
    </Typography>
  </Box>
);

const ProfilePage = ({ user, onLogout }) => {
  const theme = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDriverProfile(user.id, user.role);
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id, user.role]);

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  const weeklyHoursPercentage = (profile.weeklyHours / 40) * 100;

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
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} ID: {user.id}
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

      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Weekly Work Hours
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              my: 4,
            }}
          >
            <CircularProgressWithLabel
              value={weeklyHoursPercentage}
              size={120}
              thickness={4}
            />
            <Typography
              variant="h5"
              color="primary"
              sx={{ mt: 2, fontWeight: 'medium' }}
            >
              {profile.weeklyHours} / 40 hours
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Performance Stats
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: theme.palette.primary.lighter || 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  {profile.deliveriesCompleted}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Deliveries Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: theme.palette.primary.lighter || 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  {profile.totalDistance}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Total Distance (km)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: theme.palette.success.lighter || 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: theme.palette.success.main, fontWeight: 'bold', mb: 1 }}
                >
                  {profile.onTimeDeliveryRate}%
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Completed Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;