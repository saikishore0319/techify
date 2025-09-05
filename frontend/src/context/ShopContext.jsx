import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1
        }
        else {
            cartData[itemId] = 1
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const id in cartItems) {
            try {
                if (cartItems[id] > 0) {
                    totalCount += cartItems[id]
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount;
    }

    const UpdateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/update", { itemId, quantity }, { headers: { token } })
            } catch (error) {
                toast.error(error.message)
            }
        } else {
            toast.error("Please login")
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const id in cartItems) {
            let itemInfo = products.find((product) => product._id === id)
            try {
                if (itemInfo && cartItems[id] > 0) {
                    totalAmount += itemInfo.price * cartItems[id]
                }
            } catch (error) {
                console.log(error);
            }

        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list")
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);

        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.get(backendUrl + "/api/cart/get", { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {

            toast.error(error.message)
            console.log(error.message);
        }
    }
    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, UpdateQuantity,
        getCartAmount, navigate, backendUrl, token, setToken, setCartItems
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider