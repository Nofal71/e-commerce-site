import React from 'react';
import { Box, Typography } from '@mui/material';
import AppBarComponent from './AppBar';

export default function Header({Header}) {
  return (
    <>
      <AppBarComponent />
      <Box
        sx={{
          padding: '20px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center',
          borderBottom: '1px solid #ddd',
          mb: 4,
          color: '#8E24AA'
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontSize: {
              xs: '16px',
              sm: '20px',
              md: '24px',
              lg: '28px',
            },
          }}
        >
          <strong> {Header} </strong>
        </Typography>
      </Box>
    </>
  );
}
