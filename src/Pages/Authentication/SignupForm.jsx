import { Container, InputLabel, Stack, Input, Typography, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CheckUser } from '../../Firebase/globalData';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slices/currentUserSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/cofig/firebase';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm();
    const onSubmit = async (data) => {
        try {
            const userFound = await CheckUser(data.email);
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            if (userFound && !userCredential) {
                throw new Error()
            } else {
                const userDetails = {
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    name: `${data.firstname} ${data.lastname}`,
                }
                dispatch(addUser(userDetails))
                navigate('/')
                toast.success("Signup successfully!");
            };
        } catch (error) {
            setError('email', { message: " This email already taken" })
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction={'column'}
                    spacing={2}
                    alignItems={'center'}
                    sx={{
                        padding: '50px 50px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        Sign Up
                    </Typography>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>First Name</InputLabel>
                        <Input
                            {...register('firstname', { required: "First Name is Required" })}
                            type='text'
                            fullWidth
                            placeholder='Enter Your First Name'
                        />
                        {errors.firstname && (
                            <Typography color="error" variant="body2">
                                {errors.firstname.message}
                            </Typography>
                        )}
                    </Container>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Last Name</InputLabel>
                        <Input
                            {...register('lastname', { required: "Last Name is Required" })}
                            fullWidth
                            placeholder='Enter Your Last Name'
                        />
                        {errors.lastname && (
                            <Typography color="error" variant="body2">
                                {errors.lastname.message}
                            </Typography>
                        )}
                    </Container>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Phone</InputLabel>
                        <Input
                            {...register('phone', {
                                required: "Phone is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Phone must be a number",
                                },
                            })}
                            fullWidth
                            placeholder='Enter Your Phone Number'
                        />
                        {errors.phone && (
                            <Typography color="error" variant="body2">
                                {errors.phone.message}
                            </Typography>
                        )}
                    </Container>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Address</InputLabel>
                        <Input
                            {...register('address', { required: "Address is Required" })}
                            fullWidth
                            placeholder='Enter Your Address'
                        />
                        {errors.address && (
                            <Typography color="error" variant="body2">
                                {errors.address.message}
                            </Typography>
                        )}
                    </Container>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Email</InputLabel>
                        <Input
                            {...register('email', {
                                required: "Email is Required",
                            })}
                            fullWidth
                            placeholder='Enter Your Email'
                        />
                        {errors.email && (
                            <Typography color="error" variant="body2">
                                {errors.email.message}
                            </Typography>
                        )}
                    </Container>

                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Password</InputLabel>
                        <Input
                            {...register('password', {
                                required: "Password is Required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            fullWidth
                            placeholder='Enter Your Password'
                            type='password'
                        />
                        {errors.password && (
                            <Typography color="error" variant="body2">
                                {errors.password.message}
                            </Typography>
                        )}
                    </Container>
                    <Container sx={{ paddingBottom: '10px', maxHeight: '9dvh' }}>
                        <InputLabel shrink>Confirm Password</InputLabel>
                        <Input
                            {...register('confirmPassword', {
                                required: "Confirm Password is Required",
                                validate: (value) =>
                                    value === watch('password') || "Passwords do not match",
                            })}
                            fullWidth
                            placeholder='Confirm Your Password'
                            type='password'
                        />
                        {errors.confirmPassword && (
                            <Typography color="error" variant="body2">
                                {errors.confirmPassword.message}
                            </Typography>
                        )}
                    </Container>

                    <Button disabled={isSubmitting} type='submit' variant="contained" color="primary" sx={{ marginTop: '20px', width: '100%' }}>
                        {isSubmitting ? 'Loading...' : 'Submit'}
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export default SignupForm;
