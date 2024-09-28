import React, { createContext, useEffect, useState } from 'react'

export const currentUserProvider = createContext()

const CurrentUser = ({ children }) => {

    const email = localStorage.getItem('email')
    const [currentUserEmail, setCurrentUser] = useState(JSON.parse(email) || false)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        if (currentUserEmail) {
            localStorage.setItem('email', JSON.stringify(currentUserEmail))
        }
    }, [isAdmin, currentUserEmail])

    return (
        <currentUserProvider.Provider value={{ currentUserEmail, setCurrentUser, isAdmin, setAdmin }}>
            {children}
        </currentUserProvider.Provider>
    )
}

export default CurrentUser
