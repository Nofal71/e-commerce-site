import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const ProductCard = ({ product, button }) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: '20px 0',
                position: 'relative',
                minHeight: { xs: 290, sm: 390, md: 285, lg: 395 },
                maxHeight: { xs: 290, sm: 390, md: 285, lg: 395 },
                minWidth: { xs: 180, sm: 300, md: 200, lg: 300 },
                maxWidth: { xs: 180, sm: 300, md: 200, lg: 300 },
                marginBottom: '5px',
                backgroundColor: '#F5F5F5',
                ":hover": {
                    transform: 'scale(1.01)',
                    transitionDuration: '.75s',
                    cursor: 'pointer',
                    borderBottom: '1px solid blue'
                }

            }}>

                <Container>
                    <Typography sx={{
                        fontSize: { xs: '13px', sm: '16px', md: '20px', lg: '22px' },
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        textOverflow: 'ellipsis',
                        color: "#333333",
                    }} >
                        {product.title}
                    </Typography>
                </Container>
                <Container sx={{
                    minHeight: { xs: 150, sm: 220, md: 100, lg: 200 },
                    maxHeight: { xs: 150, sm: 220, md: 100, lg: 200 },
                    minWidth: { xs: 180, sm: 300, md: 200, lg: 300 },
                    maxWidth: { xs: 180, sm: 300, md: 200, lg: 300 },
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: '3/5'
                }}>
                    <img style={{ objectFit: 'cover', width: '100%' }} src={product.image} alt={product.tile} />
                </Container>
                <Container>
                    <Typography sx={{ fontSize: { xs: '10px', sm: '15px', md: '15px', lg: '18px' }, color: '#777777' }} >
                        RS : {product.price}
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: '9px', sm: '10px', md: '13px', lg: '16px' },
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        textOverflow: 'ellipsis',
                        color: '#777777'
                    }} >
                        {product.description}
                    </Typography>
                </Container>
                <Container sx={{ textAlign: 'right', marginTop: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end' }}  >
                    {
                        button && button.map((btn, index) => (
                            <div style={{ padding: 0, margin: 0  , marginRight:'5px', marginTop:'5px'}}  key={index}>
                                {btn}
                            </div>
                        ))
                    }
                </Container>

            </Box >

        </>
    );
}

export default ProductCard;
