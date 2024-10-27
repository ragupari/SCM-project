import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Alert,
  useTheme,
  CircularProgress,
  Paper,
  InputAdornment,
  alpha,
} from '@mui/material';
import {
  LocalShipping,
  Person as PersonIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { login } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const theme = useTheme();
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!role || !id) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const userData = await login(role, id.toUpperCase());
      onLogin(userData);
    } catch (error) {
      setError(error.message || `Invalid ${role} ID`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
          theme.palette.primary.dark,
          0.2
        )})`,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <Paper
            sx={{
              py: 4,
              px: 3,
              textAlign: 'center',
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
            }}
          >
            <LocalShipping 
              sx={{ 
                fontSize: 56,
                mb: 2,
                filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              SCMS Login
            </Typography>
            <Typography 
              variant="subtitle1"
              sx={{ 
                opacity: 0.9,
                textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              Driver & Assistant Portal
            </Typography>
          </Paper>

          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <FormControl 
                fullWidth 
                variant="outlined"
                sx={{ mb: 3 }}
              >
                <InputLabel>Select Role</InputLabel>
                <Select
                  value={role}
                  label="Select Role"
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="driver">Driver</MenuItem>
                  <MenuItem value="assistant">Driver Assistant</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Enter ID"
                variant="outlined"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: error ? 2 : 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: 24,
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: theme.shadows[4],
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CircularProgress 
                      size={24} 
                      thickness={5}
                      sx={{ color: 'inherit' }} 
                    />
                    <Typography variant="button">
                      Logging in...
                    </Typography>
                  </Box>
                ) : (
                  'Login'
                )}
              </Button>

              <Typography 
                variant="body2" 
                color="text.secondary"
                align="center"
                sx={{ mt: 3 }}
              >
                Please enter your credentials to access the system
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;