import { Alert, Box } from '@mui/material';

const ErrorMessage = ({ message }) => (
  <Box sx={{ p: 2 }}>
    <Alert severity="error">
      {message || 'An error occurred. Please try again.'}
    </Alert>
  </Box>
);

export default ErrorMessage;