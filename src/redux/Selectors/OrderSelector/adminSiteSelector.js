export const getAllOrders = (state) => {
    return state.admin?.data?.filter(e => {
        const userId = e.userId
        const orders = e.orders.ordersData
        const userDetails = e.userDetails
        return orders.length > 0 ? { userId: userId, orders: orders, userDetails: userDetails } : null;
    })
};

export const ordersCompleted = (state) => {
    let length = 0;
    state.admin?.data?.forEach(e => {
        length += e.orders && e.orders.state === 'proceed' ? e.orders.ordersData?.length || 0 : 0;
    });
    return length;
};

export const ordersPending = (state) => {
    let length = 0;
    state.admin?.data?.forEach(e => {
        length += e.orders && e.orders.state === 'pending' ? e.orders.ordersData?.length || 0 : 0;
    });
    return length;
};