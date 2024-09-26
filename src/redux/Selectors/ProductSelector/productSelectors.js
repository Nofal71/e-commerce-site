export const selectAllProducts = (state) => state.products.products.length > 0 ?  state.products.products : null ;

export const productsCount = (state) => state.products.products.length;

export const selectProductById = (state, productId) => state.products.products.find(product => product.id === productId);

export const selectProductsByIds = (state, productIds) =>
    productIds.map(id => {
        const product = state.products.products.find(product => product.id === id);
        return product ? product : 'empty';
    });

