import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../common/ProductCard';
import ModalComponent from '../../common/ModalComponent';
import AddProduct from './AddProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProduct from './EditProduct';
import EditIcon from '@mui/icons-material/Edit';
import { removeProduct } from '../../../redux/slices/productSlice';
import { LoaderProvider } from '../../../Firebase/fetchData';
import { selectAllProducts } from '../../../redux/Selectors/ProductSelector/productSelectors';
import WarningIcon from '@mui/icons-material/Warning';

const ManageProducts = () => {
    const products = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const { productLoader } = useContext(LoaderProvider);


    const DeleteConfirmation = ({ handleClose, Id, Path }) => {
        return (
            <>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} flexDirection={'column'} gap={'5px'} padding={'20px'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <WarningIcon />
                        <Typography variant='h6' >Confirm to Delete Product</Typography>
                    </Stack>
                    <Typography variant='body2' >Confirm to Delete Product <strong>Permenently ?</strong> </Typography>
                </Box>
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'flex-end'} mt={4}>
                    <Button variant='contained' onClick={() => {
                        handleClose()
                    }}>Cancel</Button>
                    <Button variant='contained' onClick={() => {
                        handleClose()
                        dispatch(removeProduct({ productId: Id, imagePath: Path }))
                    }}>Delete</Button>
                </Stack>
            </>
        )
    }

    if (productLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        )
    }


    return (
        <>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} my={4}>
                <ModalComponent component={<AddProduct />} lable={'Add Product'} />
            </Box>
            {
                products ?
                    (<>
                        <Box display={'flex'} justifyContent={'center'} gap={10} alignItems={'center'} flexWrap={'wrap'} sx={{ overflowX: 'hidden' }}>
                            {
                                products && products.map((product) => (
                                    <ProductCard product={product} key={product.id} button={
                                        [
                                            <ModalComponent component={<DeleteConfirmation Id={product.id} Path={product.imagePath} />} lable={<DeleteIcon />} />,
                                            <ModalComponent component={<EditProduct item={product} />} lable={<EditIcon />} />
                                        ]
                                    } />
                                ))
                            }
                        </Box>
                    </>) : (
                        <Box display="flex" justifyContent="center" alignItems="center" height={'10dvh'}>
                            <Typography>No Product Found</Typography>
                        </Box>
                    )
            }
        </>
    );
};

export default ManageProducts;

