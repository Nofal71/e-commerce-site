import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Stack, Typography, Box, Card, CardContent, Divider, Grid, Button } from '@mui/material';
import { getUserById } from '../../../../redux/Selectors/UserSelector/AdminSiteSelector';
import { selectProductsByIds } from '../../../../redux/Selectors/ProductSelector/productSelectors';
import ProductCard from '../../../../Components/common/ProductCard';
import { toggleOrderStatus } from '../../../../redux/slices/adminSlice';

const OrderDetails = () => {
    const location = useLocation();
    const userId = location?.state;
    const user = useSelector(state => getUserById(state, userId));
    const userDetails = user.userDetails || '';
    const products = useSelector(state => selectProductsByIds(state, user.orders.ordersData));
    const dispatch = useDispatch();

    return (
        <Box sx={{ padding: { xs: '20px', sm: '50px', md: '100px' }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Card sx={{ maxWidth: 1000, width: '100%', margin: 'auto', boxShadow: 3 }}>
                <CardContent>
                    <Stack spacing={2} direction="column" alignItems="center">
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                            Order Details
                        </Typography>
                        <Divider sx={{ width: '100%', margin: '20px 0' }} />

                        <Box sx={{ width: '100%' }}>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                                Name: <Typography variant="body1" component="span">{userDetails.name}</Typography>
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                                Phone: <Typography variant="body1" component="span">{userDetails.phone}</Typography>
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                                Address: <Typography variant="body1" component="span">{userDetails.address}</Typography>
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                                Order State: <Typography variant="body1" component="span">{user.orders.state}</Typography>
                            </Typography>
                        </Box>

                        <Typography variant="h5" component="h2" sx={{ marginTop: '30px', fontWeight: 'bold' }}>
                            Products
                        </Typography>
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            {products && products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                        <Button onClick={() => dispatch(toggleOrderStatus({ userId: userId, orderState: user.orders.state }))} >Toggle State</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OrderDetails;
