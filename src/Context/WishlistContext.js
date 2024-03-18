import axios from "axios";
import { createContext } from "react";


export let WishlistContext = createContext()

export default function WishlistContextProvider(props){

let headers = {
    token: localStorage.getItem('userToken')
} 

function getWishlistItems(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers
    })
    .then((response) => response)
    .catch((err)=>err)
}

    function addToWhishlist(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId
       }, {
         headers
       })
       .then((response)=> response)
       .catch((err)=>err)
    }

    function deleteWishlistItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
        .then( (response)=> response)
        .catch( (err) => err)
    }



    return <WishlistContext.Provider value={{addToWhishlist, getWishlistItems, deleteWishlistItem}}>
        {props.children}
    </WishlistContext.Provider>
}