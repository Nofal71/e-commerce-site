import React, { useContext, useState } from 'react'
import { Button, InputLabel, Stack, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { saveHeaderinFireBase } from '../../../../Firebase/siteSettings'
import { Headerprovider } from './HeaderProvider'

const Setting = () => {
    const { setHeader } = useContext(Headerprovider)
    const [input, setInput] = useState()

    return (
        <>
            <Stack direction={'column'} spacing={2} >
                <Typography variant='h5'>Set Header of Application</Typography>
                <InputLabel>Set Header</InputLabel>
                <TextField value={input} onChange={(e) => setInput(e.target.value)} placeholder='Set Header' />
                <Button onClick={() => {
                    toast.success('Header Updated')
                    saveHeaderinFireBase(input)
                    setHeader(input)
                }}>Save Header</Button>
            </Stack>

        </>
    )
}

export default Setting
