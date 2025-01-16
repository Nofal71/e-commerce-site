import React, { createContext, useEffect, useState } from 'react'
import { getHeaderFromFireBase } from '../../../../Firebase/siteSettings'


export const Headerprovider = createContext()

const HeaderProvider = ({ children }) => {

    const [header, setHeader] = useState('')
    useEffect(() => {
        const header = getHeaderFromFireBase()
        header.then((data) => {
            setHeader(data?.data().header)
        })
    }, [])

    return (
        <Headerprovider.Provider value={{ header, setHeader }}>
            {children}
        </Headerprovider.Provider>
    )
}

export default HeaderProvider
