import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { currentUserProvider } from '../Context/CurrentUser';

const PrivateRoute = ({ children }) => {
    const {isAdmin} = useContext(currentUserProvider)
    if (!isAdmin) {
        return <Navigate to='/' />
    } else {
        return children || <Outlet />;
    }
}

export default PrivateRoute
