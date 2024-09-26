import React, { useContext } from 'react'
import ProductsList from '../../Components/customer-page/products/ProductsList'
import Header from '../../Components/common/Header'
import Footer from '../../Components/common/Footer'
import { Headerprovider } from '../../Components/admin-page/setting/HeaderProvider'

const Home = () => {

  const { header } = useContext(Headerprovider)

  return (
    <>
      <Header Header={header} />
      <ProductsList />
      <Footer />
    </>
  )
}

export default Home
