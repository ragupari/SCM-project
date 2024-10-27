import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const CircularProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={200}
        thickness={4}
        sx={{
          color: (theme) => 
            value >= 100 
              ? theme.palette.error.main
              : theme.palette.primary.main
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" color="text.secondary">
          {value.toFixed(1)}%
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;