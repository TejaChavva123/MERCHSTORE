import axios from 'axios';
import { ADD_TO_CART,REMOVE_FROM_CART } from '../constants/cartConstant';

export const AddToCart = (id,qty)=>async(dispatch,getState)=>{
    const info = await axios.get(`/api/products/${id}`);
    dispatch({type:ADD_TO_CART,load:{
        product:info.data._id,
        name:info.data.name,
        image:info.data.image,
        price:info.data.price,
        countInStock:info.data.countInStock,
        qty
    }})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const RemoveFromCart = (id)=>async(dispatch,getState)=>{
    const info = await axios.get(`/api/products/${id}`);
    dispatch({
        type:REMOVE_FROM_CART,
        load:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}
