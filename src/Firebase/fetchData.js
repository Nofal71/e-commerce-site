
import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './Products'
import { loadProducts } from '../redux/slices/productSlice'
import { loadAdmin } from '../redux/slices/adminSlice'
import { getAllUsersFromFirestore, getUserData } from './FireBaseServices'
import { currentUserProvider } from '../Context/CurrentUser'
import { loadCurrentUser } from '../redux/slices/currentUserSlice'
import { currentUser } from '../redux/Selectors/UserSelector/CustomerSiteReducer'

export const LoaderProvider = createContext();

export const Loader = ({ children }) => {

    const [productLoader, setProductLoader] = useState(true)
    const [userLoader, setUserLoader] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getAllUsersFromFirestore();
                const products = await getProducts();
                if (products) {
                    setProductLoader(false)
                } else {
                    setProductLoader(true)
                }

                if (users) {
                    setUserLoader(false)
                } else {
                    setUserLoader(true)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <LoaderProvider.Provider value={{ userLoader, productLoader }} >
            {children}
        </LoaderProvider.Provider>
    )

}

export const useFetch = () => {
    const dispatch = useDispatch();
    const { currentUserEmail, setAdmin } = useContext(currentUserProvider)
    const user = useSelector(currentUser)   // In Case of New User , Current state already updated

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                if (products && products.length > 0) {
                    dispatch(loadProducts(products));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const users = await getAllUsersFromFirestore();
                if (users && users.length > 0) {
                    dispatch(loadAdmin(users));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProducts();

        if (currentUserEmail) {
            const getUser = getUserData(currentUserEmail);
            console.log(user?.admin, 'isAdmin')
            getUser.then((data) => {
                dispatch(loadCurrentUser(data))
                if (user?.admin) {
                    fetchUsers()
                    setAdmin(true)
                } else {
                    setAdmin(false)
                }
            })
        }

    }, [dispatch, currentUserEmail, setAdmin, user?.admin]);

}