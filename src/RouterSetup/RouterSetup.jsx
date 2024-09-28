import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useFetch } from '../Firebase/fetchData';
import PrivateRoute from './PrivateRouter';
import HeaderProvider from '../Pages/admin/Components/setting/HeaderProvider';
import Home from '../Pages/admin/Home';
import CustomerHome from '../Pages/customer/Home';
import ViewProduct from '../Pages/customer/Components/products/ViewProduct';
import CartList from '../Pages/customer/Components/cart/CartList';
import SignupForm from '../Pages/Authentication/SignupForm';
import OrderDetails from '../Pages/admin/Components/orders/OrderDetails';
import UserDetails from '../Pages/customer/Components/userDetails/UserDetails';
import LoginForm from '../Pages/Authentication/LoginForm';

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
        <Route path='/admin' element={<PrivateRoute><HeaderProvider><Home /></HeaderProvider></PrivateRoute>} />
        <Route path='/' element={<HeaderProvider><CustomerHome /></HeaderProvider>} />
        <Route path='/viewProduct' element={<ViewProduct />} />
        <Route path='/cart' element={<CartList />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/OrderDetails' element={<OrderDetails />} />
        <Route path='/userDetails' element={<UserDetails />} />
      </Routes>
    </>
  )
}

export default RouterSetup
