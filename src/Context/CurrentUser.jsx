import React, { createContext, useEffect, useState } from 'react'

export const currentUserProvider = createContext()

const CurrentUser = ({ children }) => {

    const [currentUserEmail, setCurrentUser] = useState(false)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (email) {
            setCurrentUser(JSON.parse(email))
        }
    }, [isAdmin])

    return (
        <currentUserProvider.Provider value={{ currentUserEmail, setCurrentUser, isAdmin, setAdmin }}>
            {children}
        </currentUserProvider.Provider>
    )
}

export default CurrentUser
