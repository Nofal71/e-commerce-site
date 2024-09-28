import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../../../redux/Selectors/OrderSelector/adminSiteSelector';

const Orders = () => {
    const orders = useSelector(state => getAllOrders(state));
    const navigate = useNavigate()

    return (
        <>
            <Typography variant='h4'>Manage Orders</Typography>
            <Grid container spacing={3} padding={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.userId}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {order.userDetails.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Phone: {order.userDetails.phone}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Orders: {order.orders.ordersData.length}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    endIcon={<ArrowForwardIcon />}
                                    style={{ marginTop: '15px' }}
                                    onClick={() => navigate('/OrderDetails', { state: order.userId })}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Orders;
