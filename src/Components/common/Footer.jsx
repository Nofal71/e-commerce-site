import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'50px'} gap={'30px'} sx={{ backgroundColor: '#212121', mt: 5 }}>
                <Typography variant='h6' component={'span'} sx={{
                    fontSize: { xs: '12px', sm: '15px', md: '16px', lg: '20px' },
                    color: 'white',
                    cursor: 'pointer'
                }} >Home</Typography>
                <Typography variant='h6' component={'span'} sx={{
                    fontSize: { xs: '12px', sm: '15px', md: '16px', lg: '20px' },
                    color: 'white',
                    cursor: 'pointer'
                }} >About Us</Typography>
                <Typography variant='h6' component={'span'} sx={{
                    fontSize: { xs: '12px', sm: '15px', md: '16px', lg: '20px' },
                    color: 'white',
                    cursor: 'pointer'
                }} >Shoping</Typography>
            </Box>
        </>
    )
}

export default Footer
