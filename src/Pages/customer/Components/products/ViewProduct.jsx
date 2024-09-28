import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { selectProductById } from '../../../../redux/Selectors/ProductSelector/productSelectors';
import { currentUser } from '../../../../redux/Selectors/UserSelector/CustomerSiteReducer';
import { updateCurrentCart, updateOrders } from '../../../../redux/slices/currentUserSlice';
import AppBarComponent from '../../../../Components/common/AppBar';
import ModalComponent from '../../../../Components/common/ModalComponent';
import UserDetails from '../userDetails/UserDetails';


const ViewProduct = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productId = location.state;
    const product = useSelector(state => selectProductById(state, productId ? productId : "empty"));
    const user = useSelector((state) => currentUser(state))

    const [openModal, setModal] = useState();

    useEffect(() => {
        user?.userDetails?.phone.length > 0 ? setModal(false) : setModal(true);
        window.scroll(0, 0)
    }, [setModal, user]);

    const handleAddtoCart = () => {
        if (!user) {
            toast.warn("Please Login To add item in Cart");
            navigate('/login');
        } else if (user.userId && user.userDetails?.phone) {
            dispatch(updateCurrentCart(productId));
        }
    };

    const handlePlaceOrder = () => {
        if (!user) {
            toast.warn("Please Login To Place Order");
            navigate('/login');
        } else if (user.userId && user.userDetails?.phone) {
            dispatch(updateOrders(productId))
            console.log('Order Placed');
        } else {
            setModal(true);
        }
    };

    return (
        <>
            <AppBarComponent />
            {
                product ? (
                    <>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                            gap: '15px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            padding: '10px'
                        }}>
                            <Container sx={{
                                alignSelf: 'flex-start',
                                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                padding: '10px',
                                borderRadius: '8px',
                                maxWidth: '350px',
                            }}>
                                <img src={product.image} alt={product.title} style={{ objectFit: 'contain', width: '100%', borderRadius: '8px' }} />
                            </Container>
                            <Container sx={{
                                alignSelf: 'flex-start',
                                flexGrow: 0,
                                maxWidth: '450px',
                                overflowY: 'auto',
                                padding: '10px',
                                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                maxHeight: '100vh',
                                marginBottom: '55px'
                            }}>
                                <Stack spacing={1} direction={'column'}>
                                    <Typography sx={{ fontSize: { xs: '18px', sm: '22px', md: '24px', lg: '26px' }, color: '#3b3b3b' }}>
                                        {product.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, color: '#666' }}>
                                        Rs: {product.price}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }, color: '#777' }}>
                                        {product.description}
                                    </Typography>
                                </Stack>
                            </Container>
                        </Box>
                        <Box sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            zIndex: 1000,
                            borderTop: '1px solid #ddd'
                        }}>
                            {
                                openModal ? (
                                    <>
                                        <Button onClick={handlePlaceOrder} size='large' variant='string'>
                                            <ModalComponent component={<UserDetails />} lable={'Place Order'} />
                                        </Button>
                                        <Button onClick={handleAddtoCart} size='large' variant='string'>
                                            <ModalComponent component={<UserDetails />} lable={'Add To Cart'} />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={handlePlaceOrder} size='large' variant='contained' sx={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '8px', padding: '8px 16px' }}>
                                            Place Order
                                        </Button>
                                        <Button onClick={handleAddtoCart} size='large' variant='contained' sx={{ backgroundColor: '#8BC34A', color: '#fff', borderRadius: '8px', padding: '8px 16px' }}>
                                            Add To Cart
                                        </Button>
                                    </>
                                )
                            }
                        </Box>
                    </>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box>
                )
            }
        </>
    );
};

export default ViewProduct;
