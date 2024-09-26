import { Button, Card, CardContent, Container, Stack, TextField, Typography, Divider, Box, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { currentUserProvider } from '../../Context/CurrentUser';
import { auth } from '../../Firebase/cofig/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const { currentUserEmail, setCurrentUser } = useContext(currentUserProvider);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()
    const onSubmit = async (data) => {
        try {
            const signIn = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (!signIn) {
                throw new Error();
            } else {
                setCurrentUser(data.email)
                toast.success('Sigin Success')
                navigate('/')
            }
        } catch (error) {
            setError('root', { message: 'Email or Password is Incorrect' })
        }
    }


    useEffect(() => {
        currentUserEmail && navigate('/')
    }, [currentUserEmail, navigate]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ marginTop: '20vh', maxWidth: 'sm' }}>
                    <Typography variant='h4' align='center' gutterBottom>Login</Typography>
                    <Card>
                        <CardContent>
                            <Stack spacing={3} direction='column'>
                                <Stack direction={'column'} spacing={1}>
                                    <InputLabel>Email</InputLabel>
                                    <TextField
                                        {...register('email', {
                                            required: "Email is Required",
                                        })}
                                        placeholder='Enter Your Email'
                                        variant='outlined'
                                        fullWidth
                                    />
                                    {
                                        errors.email && (
                                            <Typography color="error" variant="body2">
                                                {errors.email.message}
                                            </Typography>
                                        )
                                    }
                                </Stack>
                                <Stack direction={'column'} spacing={1}>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder='Enter Password'
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", { required: "Password must contain 8 Letters", minLength: 8 })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {
                                        errors.password && (
                                            <Typography color="error" variant="body2">
                                                {errors.password.message}
                                            </Typography>
                                        )
                                    }
                                </Stack>

                                <Typography variant='subtitle2' align='center'>
                                    Don't have an account? <Link to='/signup'>Signup</Link>
                                </Typography>
                                {
                                    errors.root && (
                                        <Typography color="error" variant="body2">
                                            {errors.root.message}
                                        </Typography>
                                    )
                                }
                                <Divider />
                                <Button
                                    variant='contained'
                                    type='submit'
                                    size='large'
                                    disabled={isSubmitting}
                                    sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>
                                {isSubmitting && <Box display={'flex'} justifyContent={'center'}><l-dot-stream style={{ flexGrow: '1' }} size="90" speed="1" color="black" /></Box>}
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>

            </form>
        </>
    )
}

export default LoginForm
