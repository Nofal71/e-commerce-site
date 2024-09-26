import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCurrentUserDetails } from '../../../redux/slices/currentUserSlice';

const UserDetails = ({ handleClose }) => {
    const dispatch = useDispatch()
    // const [location, setLocation] = useState('')
    const [data, setData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSave = () => {
        handleClose();
        dispatch(updateCurrentUserDetails(data))
    }
    useEffect(() => {
        toast.warn('Please Add Details')
    }, [])

    // const getUserLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(postion => {
    //             setLocation({ lat: postion.coords.latitude, long: postion.coords.longitude })
    //         })
    //     }
    //     console.log(location)
    // }


    return (
        <>
            <Container style={{ marginTop: '5vh' }} className='anim'>
                <Typography variant='h4' align='center'>Enter Details</Typography>
                <Card>
                    <CardContent>
                        <Stack spacing={2} direction='column'>
                            <TextField name='name' placeholder='Enter Your Full Name' label='Name' value={data.name} onChange={handleChange} fullWidth />
                            <TextField name='phone' placeholder='Enter Your Phone Number' label='Phone' value={data.phone} onChange={handleChange} fullWidth />
                            <TextField name='address' placeholder='Enter Your Address' label='Address' value={data.address} onChange={handleChange} fullWidth />
                            {/* <TextField name='address' placeholder='Enter Your Address' label='Address' value={`${location.lat} , ${location.long}`} onChange={getUserLocation} fullWidth /> */}
                            <Button onClick={handleSave} fullWidth>Save Details</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default UserDetails
