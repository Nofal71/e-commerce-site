import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Input, InputLabel, Stack, Typography, CircularProgress, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { currentUserProvider } from '../../../../Context/CurrentUser'
import { getUserData, updateUserInFirestore } from '../../../../Firebase/FireBaseServices'

const UserDetails = () => {
    const { currentUserEmail } = useContext(currentUserProvider)
    const [loader, setLoader] = useState(true)
    const [userData, setUserData] = useState(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const FormData = [
        { Label: 'Name', target: 'name' },
        { Label: 'Phone', target: 'phone' },
        { Label: 'Address', target: 'address' },
    ]

    const Submit = async (data) => {
        try {
            const updatedUser = {
                ...userData,
                userDetails: { ...userData.userDetails, ...data }
            }
            await updateUserInFirestore(userData.userId, updatedUser)
            toast.success("User Data Updated Success")
        } catch (error) {
            toast.warn("Failed to Update Data", error.message)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setLoader(true)
                const data = await getUserData(currentUserEmail)
                setUserData(data)
                data ? toast.success('Data Load Success') : toast.warn('User Not Found')
            } catch (error) {
                toast.warn(`Error in Fetching Data: ${error.message}`)
            } finally {
                setLoader(false)
            }
        })()

        return () => {
            window.location.reload()
        }
    }, [currentUserEmail])

    return (
        <>
            {loader ? (
                <CircularProgress />
            ) : (
                <Box padding={'100px'}>
                    <form onSubmit={handleSubmit(Submit)}>
                        {FormData && FormData.map((form, index) => (
                            <Stack key={index} direction={'column'} spacing={2} mb={3}>
                                <InputLabel>{form.Label}</InputLabel>
                                <Input defaultValue={userData && userData.userDetails[form.target]} {...register(form.target, { required: `${form.Label} is required` })} />
                                {errors[form.target] && (
                                    <Typography color='error' variant='body2'>
                                        {errors[form.target].message}
                                    </Typography>
                                )}
                            </Stack>
                        ))}
                        <Button disabled={isSubmitting} type='submit' variant='contained' color='primary'>
                            {
                                isSubmitting ? 'Loading...' : 'Submit'
                            }
                        </Button>
                    </form>
                </Box>
            )}
        </>
    )
}

export default UserDetails
