import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
export const ShopContext = createContext();

const  ShopContextProvider = (props)=>{

    const currency = '$';
    const delivery_fee = 10
    const [search , setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()

    const addToCart = async (itemId, size )=>{

        if(!size){
            toast.error('Selelct Product Size');
            return 
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1            
        }
        setCartItems(cartData);
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }
        return totalCount;
    } 

    const UpdateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity
        setCartItems(cartData);
    }

    const getCartAmount =  ()=>{
        let totaAmount = 0;
        for(const id in cartItems){
            let itemInfo = products.find((product)=> product._id === id)
            for(const size in cartItems[id]){
                try {
                    if(cartItems[id][size] > 0){
                        totaAmount += itemInfo.price * cartItems[id][size]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totaAmount;
    }


    const value ={
        products , currency , delivery_fee, 
        search, setSearch, showSearch, setShowSearch, 
        cartItems, addToCart, getCartCount, UpdateQuantity,
        getCartAmount, navigate
    }


    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider