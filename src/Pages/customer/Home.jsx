import React, { useContext } from 'react'
import Header from '../../Components/common/Header'
import Footer from '../../Components/common/Footer'
import { Headerprovider } from '../admin/Components/setting/HeaderProvider'
import ProductsList from './Components/products/ProductsList'
import { Box } from '@mui/material'

const CustomerHome = () => {

  const { header } = useContext(Headerprovider)

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100dvh',
    }}>
      <Header Header={header} />
      <Box sx={{
        flexGrow: 1
      }}>
        <ProductsList />
      </Box>
      <Box sx={{
        marginTop: 'auto',
      }}>
        <Footer />
      </Box>
    </Box>
  )
}

export default CustomerHome
