import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../admin/Home'
import CustomerHome from '../customer/Home'
import ViewProduct from '../../Components/customer-page/products/ViewProduct'
import CartList from '../../Components/customer-page/cart/CartList'
// import Login from '../Authentication/Login'
// import SignUp from '../Authentication/SignUp'
import { useFetch } from '../../Firebase/fetchData'
import PrivateRoute from './PrivateRouter'
import OrderDetails from '../../Components/admin-page/orders/OrderDetails'
import SignupForm from '../Authentication/SignupForm'
import LoginForm from '../Authentication/LoginForm'

const RouterSetup = () => {
  const data = useFetch();
  useEffect(() => {
    if (!data) {
      console.log('Fetching .......')
    }
  }, [data])


  return (
    <>
      <Routes>
        <Route path='/admin' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/' element={<CustomerHome />} />
        <Route path='/viewProduct' element={<ViewProduct />} />
        <Route path='/cart' element={<CartList />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/OrderDetails' element={<OrderDetails />} />
      </Routes>
    </>
  )
}

export default RouterSetup
