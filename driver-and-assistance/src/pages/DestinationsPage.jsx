import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  LocalShipping as TruckIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { getDestinations } from '../services/api';
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
      Loading destinations...
    </Typography>
  </Box>
);

const ErrorMessage = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      p: 4,
      maxWidth: 400,
      mx: 'auto',
      textAlign: 'center'
    }}
  >
    <ErrorIcon color="error" sx={{ fontSize: 48 }} />
    <Typography color="error" variant="h6">
      {message}
    </Typography>
  </Box>
);

const DestinationsPage = () => {
  const theme = useTheme();
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations(scheduleId);
        setDestinationData(data);
      } catch (error) {
        setError(error.message || 'Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [scheduleId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!destinationData) return null;

  const { route, orders, shipment } = destinationData;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Delivery Destinations
        </Typography>
      </Box>

      {route && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {route.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            Main Towns: {route.mainTowns}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<TruckIcon />}
              label={`Truck: ${shipment.truckId}`}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            <Chip
              icon={<PersonIcon />}
              label={`Driver ID: ${shipment.driverId}`}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            <Chip
              icon={<TimeIcon />}
              label={`${formatTime(shipment.startTime)} - ${formatTime(shipment.endTime)}`}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </Box>
        </Paper>
      )}

      <Stepper
        orientation="vertical"
        sx={{
          '.MuiStepConnector-line': {
            borderLeftColor: theme.palette.primary.light,
          },
        }}
      >
        {orders.map((order) => (
          <Step key={order.orderId} active={true}>
            <StepLabel
              StepIconComponent={LocationIcon}
              sx={{
                '.MuiStepLabel-iconContainer': {
                  bgcolor: theme.palette.primary.lighter || 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '50%',
                  p: 1,
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {order.customerName}
              </Typography>
            </StepLabel>
            <StepContent>
              <Card
                sx={{
                  mt: 2,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Delivery Address
                    </Typography>
                    <Typography variant="body1">
                      {order.deliveryAddress}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      size="small"
                      icon={<TimeIcon />}
                      label={`Expected: ${formatTime(order.expectedTime)}`}
                      sx={{
                        borderRadius: '16px',
                        bgcolor: theme.palette.primary.lighter || 'rgba(0, 0, 0, 0.04)',
                      }}
                    />
                    <Chip
                      size="small"
                      icon={<PersonIcon />}
                      label={`Order: ${order.orderId}`}
                      sx={{
                        borderRadius: '16px',
                        bgcolor: theme.palette.grey[100],
                      }}
                    />
                    <Chip
                      size="small"
                      label={order.status}
                      sx={{
                        borderRadius: '16px',
                        bgcolor:
                          order.status.toLowerCase() === 'pending'
                            ? theme.palette.warning.lighter || theme.palette.warning.light
                            : theme.palette.success.lighter || theme.palette.success.light,
                        color:
                          order.status.toLowerCase() === 'pending'
                            ? theme.palette.warning.main
                            : theme.palette.success.main,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default DestinationsPage;