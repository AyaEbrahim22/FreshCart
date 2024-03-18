import axios from "axios";
import { createContext } from "react";


export let CartContext = createContext()

export default function CartContextProvider(props){

let headers = {
    token: localStorage.getItem('userToken')
} 

    function checkOutSession(cartId, shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        } ,{
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }

    function addToCart(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId
       }, {
         headers
       })
       .then((response)=> response)
       .catch((err)=>err)
    }

    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((response) => response)
        .catch((err)=>err)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
        .then( (response)=> response)
        .catch( (err) => err)
    }
    function updateCartItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers
        })
        .then( (response) => response)
        .catch( (err) => err)
    }


    function deleteCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
        .then( (response)=> response)
        .catch( (err) => err)
    }


    return <CartContext.Provider value={{addToCart, getCartItems, deleteCartItem, updateCartItem, checkOutSession, deleteCart}}>
        {props.children}
    </CartContext.Provider>
}