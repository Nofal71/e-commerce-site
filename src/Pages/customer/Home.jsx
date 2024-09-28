import React, { useContext } from 'react'
import Header from '../../Components/common/Header'
import Footer from '../../Components/common/Footer'
import { Headerprovider } from '../admin/Components/setting/HeaderProvider'
import ProductsList from './Components/products/ProductsList'

const CustomerHome = () => {

  const { header } = useContext(Headerprovider)

  return (
    <>
      <Header Header={header} />
      <ProductsList />
      <Footer />
    </>
  )
}

export default CustomerHome
