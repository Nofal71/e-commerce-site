import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Button, Container, Input, InputLabel, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { dotSpinner } from 'ldrs'
import { imageDb } from '../../../../Firebase/cofig/firebase';
import { updateProduct } from '../../../../redux/slices/productSlice';
dotSpinner.register()


const EditProduct = ({ handleClose, item }) => {
    const [product, setProduct] = useState(item);
    const [img, setImage] = useState(null);
    const [currentImg, setCurrentImage] = useState(product.image);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const Loader = () => {
        if (loader) {
            return (
                <Container sx={{ display: 'flex', padding: '0' }}>
                    <l-dot-spinner size="20" speed="0.9" color="white" />
                </Container>
            )
        }
    }


    const ChangeImage = async (img) => {
        if (!img) return null;
        try {
            const ImagePath = product.imagePath
            const imageRef = ref(imageDb, ImagePath);
            await uploadBytes(imageRef, img);
            const downloadURL = await getDownloadURL(imageRef);
            return { downloadURL, ImagePath };
        } catch (error) {
            toast.error('Failed to upload image');
            return null;
        }
    }

    const handleSave = async () => {
        if (product.title && product.price) {
            if (img) {
                setLoader(true)
                const imageData = await ChangeImage(img);
                if (imageData) {
                    const productData = { ...product, image: imageData.downloadURL, imagePath: imageData.ImagePath }
                    dispatch(updateProduct(productData));
                    setLoader(false)
                    handleClose()
                }
            }else{
                dispatch(updateProduct(product));
                handleClose()
            }
        }else{
            toast.warn('Please Fill Empty Feilds First')
        }
    };

    const handleImageChange = async (e) => {
        const img = e.target.files[0];
        if (img) {
            setImage(img);
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgSrc = reader.result;
                setCurrentImage(imgSrc);
            };
            reader.readAsDataURL(img);
        } else {
            setCurrentImage(null);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}>
                <TextField placeholder="Add Product Title" label="Title" name="title" value={product.title} onChange={handleChange} />
                <TextField placeholder="Add Product Price" label="Price" name="price" value={product.price} onChange={handleChange} />
                <TextField placeholder="Add Product Description" label="Description" name="description" value={product.description} multiline onChange={handleChange} />
                <img src={currentImg} alt={product.title} />
                <InputLabel>Change Image</InputLabel>
                <Input type="file" onChange={handleImageChange} endIcon={<UploadIcon />} />
                <Button variant="contained" onClick={handleSave} endIcon={<Loader />} >Save Changes</Button>
            </Box>
        </>
    );
}

export default EditProduct
