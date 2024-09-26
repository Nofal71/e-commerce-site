import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Tostify = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                closeOnClick
                draggable={false}
                pauseOnHover={false}
                style={{ fontSize: '0.85rem' }}
                theme="light"
            />
        </>
    )
}

export default Tostify
