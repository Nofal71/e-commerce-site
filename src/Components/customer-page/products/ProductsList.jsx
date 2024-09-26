import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ProductCard from '../../common/ProductCard';
import { useNavigate } from 'react-router-dom';
import { LoaderProvider } from '../../../Firebase/fetchData';
import { waveform } from 'ldrs'
import { selectAllProducts } from '../../../redux/Selectors/ProductSelector/productSelectors';
waveform.register()

const ProductsList = () => {
    const data = useSelector(selectAllProducts);
    const { productLoader } = useContext(LoaderProvider)
    const [filter, setFilter] = useState('New First');
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const navigate = useNavigate();

    
    useEffect(() => {
        setProducts(data);
    }, [data]);

    
    const searchData = () => {
        return data.filter((product) => product.title.includes(search) || product.description.includes(search))
    }

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setFilter(selectedValue);

        if (selectedValue === 'HighToLow') {
            setProducts([...data].sort((a, b) => b.price - a.price));
        } else if (selectedValue === 'LowToHigh') {
            setProducts([...data].sort((a, b) => a.price - b.price));
        } else {
            setProducts(data);
        }
    };

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
        <> {products ?
            (<>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        my: '30px'
                    }}
                >
                    <TextField sx={{ width: { xs: '100%', sm: '80%', md: '50%', lg: '45%' } }} placeholder='Search Items .....' onChange={(e) => {
                        setSearch(e.target.value)
                        setProducts(searchData)
                        if (e.target.value === '') setProducts(data)
                    }} />
                    <Box sx={{ width: { xs: '180px', sm: '200px', md: '200px' }, marginLeft: 'auto' }}>
                        <InputLabel id="demo-select-small-label">Filter</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter}
                            label="Filter"
                            onChange={handleChange}
                            sx={{ width: '150px', height: { xs: '40px', sm: '50px', md: '55px', lg: '60px' } }}
                        >
                            <MenuItem value={filter}>
                                New First
                            </MenuItem>
                            <MenuItem value="HighToLow">High to Low Price</MenuItem>
                            <MenuItem value="LowToHigh">Low to High Price</MenuItem>
                        </Select>
                    </Box>
                </Box>


                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap='10px' flexWrap={'wrap'}>
                    {
                        products && products.map((product) => (
                            <ProductCard product={product} key={product.id} button={[
                                <Button onClick={() => navigate('/viewProduct', { state: product.id })}>View</Button>
                            ]} />
                        ))
                    }
                </Box>
            </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={'10dvh'}>
                    <Typography>No Product Found</Typography>
                </Box>
            )
        }
        </>
    );
};

export default ProductsList;
