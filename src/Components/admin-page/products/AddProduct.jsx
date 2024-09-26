import { TextField, Button, Box, Input, Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import UploadIcon from '@mui/icons-material/Upload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../../../Firebase/cofig/firebase';
import { v4 } from 'uuid';
import { dotSpinner } from 'ldrs'
dotSpinner.register()

const AddProduct = ({ handleClose }) => {
    const [product, setProduct] = useState({});
    const [img, setImage] = useState('');
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)

    const Loader = () => {
        if (loader) {
            return (
                <Container sx={{ display: 'flex', padding: '0' }}>
                        <l-dot-spinner size="20" speed="0.9" color="white" />
                </Container>
            )
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImageAndSetProduct = async (file) => {
        if (!file) return null;
        try {
            const ImagePath = `Images/${v4()}`
            const imageRef = ref(imageDb, ImagePath);
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            return { downloadURL, ImagePath };
        } catch (error) {
            toast.error('Failed to upload image');
            return null;
        }
    };

    const handleSave = async () => {
        if (product.title && product.price) {
            setLoader(true)
            const imageData = await uploadImageAndSetProduct(img);
            if (imageData) {
                const productData = { ...product, image: imageData.downloadURL, imagePath: imageData.ImagePath }
                dispatch(addProduct(productData));
                setProduct({ title: '', price: '', description: '' });
                setLoader(false)
                handleClose();
            } else {
                toast.warn('Please fill all details about Product');
            }
        };
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}>
            <TextField placeholder="Add Product Title" label="Title" name="title" value={product.title} onChange={handleChange} />
            <TextField placeholder="Add Product Price" label="Price" name="price" value={product.price} onChange={handleChange} />
            <TextField placeholder="Add Product Description" label="Description" name="description" value={product.description} multiline rows={4} onChange={handleChange} />
            <Input type="file" endIcon={<UploadIcon />} onChange={(e) => setImage(e.target.files[0])}>Upload Image</Input>
            <Button variant="contained" onClick={handleSave} endIcon={<Loader />} >Save Product</Button>
        </Box>
    );
};

export default AddProduct;
