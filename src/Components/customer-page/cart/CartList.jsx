import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ProductCard from '../../common/ProductCard';
import AppBarComponent from '../../common/AppBar';
import { LoaderProvider } from '../../../Firebase/fetchData';
import { waveform } from 'ldrs';
import Footer from '../../common/Footer';
import { removeFromCurrentCart } from '../../../redux/slices/currentUserSlice';
import { selectProductsByIds } from '../../../redux/Selectors/ProductSelector/productSelectors';
import { currentUser } from '../../../redux/Selectors/UserSelector/CustomerSiteReducer';
waveform.register();

const CartList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => currentUser(state));
    const { productLoader } = useContext(LoaderProvider);
    const productIds = user?.cart || [];
    const products = useSelector((state) => selectProductsByIds(state, productIds));
    if (productLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <l-waveform
                    size="35"
                    stroke="3.5"
                    speed="1"
                    color="black"
                ></l-waveform>
            </Box>
        );
    }
    return (
        <>
            <AppBarComponent />
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap='10px' padding={'30px'} flexWrap={'wrap'} sx={{ overflowX: 'hidden' }}>
                {products.length !== 0 ? (
                    products.map((product) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            button={[
                                <Button
                                    key={`remove-${product.id}`}
                                    onClick={() => {
                                        dispatch(removeFromCurrentCart(product.id))
                                    }}
                                >
                                    Remove From Cart
                                </Button>
                            ]}
                        />
                    ))
                ) : (
                    <Typography>No Products in Cart</Typography>
                )}
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0', right: '0', left: '0' }}>
                <Footer />
            </Box>
        </>
    );
};

export default CartList;
