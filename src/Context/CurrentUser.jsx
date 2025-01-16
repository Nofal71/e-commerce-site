import React, { createContext, useEffect, useState } from 'react'

export const currentUserProvider = createContext()

const CurrentUser = ({ children }) => {

    const email = localStorage.getItem('email')
    const [currentUserEmail, setCurrentUser] = useState(email && JSON.parse(email))
    const [isAdmin, setAdmin] = useState(false)

    const logout = () => {
        setCurrentUser(null)
        setAdmin(null)
        localStorage.clear()
    }

    useEffect(() => {
        if (currentUserEmail) {
            localStorage.setItem('email', JSON.stringify(currentUserEmail))
        }
    }, [isAdmin, currentUserEmail])

    return (
        <currentUserProvider.Provider value={{ currentUserEmail, setCurrentUser, isAdmin, setAdmin, logout }}>
            {children}
        </currentUserProvider.Provider>
    )
}

export default CurrentUser
