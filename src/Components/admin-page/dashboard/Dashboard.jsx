import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { ordersCompleted, ordersPending } from '../../../redux/Selectors/OrderSelector/adminSiteSelector'
import { productsCount } from '../../../redux/Selectors/ProductSelector/productSelectors'
import { usersCount } from '../../../redux/Selectors/UserSelector/AdminSiteSelector'

const Dashboard = () => {
    const numberofProducts = useSelector(productsCount)
    const numberOfCompletedOrders = useSelector(ordersCompleted)
    const numberOfPendingOrders = useSelector(ordersPending)
    const users = useSelector(usersCount)

    const cardComponentValues = [
        { msg: 'No of Active Users', value: users },
        { msg: 'No of Active Products', value: numberofProducts },
        { msg: 'No of Completed Orders', value: numberOfCompletedOrders },
        { msg: 'No of Pending Orders', value: numberOfPendingOrders },
    ]

    return (
        <>
            <Typography variant='h4' align='center'> Dashboard</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '50px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                {cardComponentValues && cardComponentValues.map((card, index) => (
                    <Card key={index} sx={{ width: { xs: '100%', sm: "60%", md: '40%', lg: '30%' } }}>
                        <CardContent>
                            <Typography sx={{
                                textWrap: 'nowrap',
                                fontSize: { xs: '9px', sm: '10px', md: '13px', lg: '16px' },
                            }} ><strong> {card.msg} </strong> : {card.value} </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    )
}

export default Dashboard
