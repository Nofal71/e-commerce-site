import React from 'react'
import Dashboard from './Components/dashboard/Dashboard'
import ManageProducts from './Components/products/ManageProducts'
import ManageUsers from './Components/users/ManageUsers'
import Orders from './Components/orders/Orders'
import Setting from './Components/setting/Setting'
import SideBar from '../../Components/common/SideBar'



const Home = () => {
    const list = ['Dashboard', 'Manage Products', 'Manage Users', 'Manage Orders', 'Settings']

    const component = [
        <Dashboard />,
        <ManageProducts />,
        <ManageUsers />,
        <Orders />,
        <Setting />
    ]
    return (
        <>
            <SideBar component={component} List={list} />
        </>
    )
}

export default Home
