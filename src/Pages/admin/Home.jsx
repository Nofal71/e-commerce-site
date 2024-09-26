import React from 'react'
import SideBar from '../../Components/common/SideBar'
import Dashboard from '../../Components/admin-page/dashboard/Dashboard'
import ManageProducts from '../../Components/admin-page/products/ManageProducts'
import ManageUsers from '../../Components/admin-page/users/ManageUsers'
import Orders from '../../Components/admin-page/orders/Orders'
import Setting from '../../Components/admin-page/setting/Setting'


const Home = () => {
    const list = ['Dashboard', 'Manage Products', 'Manage Users', 'Manage Orders' , 'Settings']

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
