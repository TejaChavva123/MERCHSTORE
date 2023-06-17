import axios from 'axios';
import { ADD_TO_CART,REMOVE_FROM_CART, SAVE_PAYMENT_METHOD } from '../constants/cartConstant';
import { SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';

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
    // const info = await axios.get(`/api/products/${id}`);
    dispatch({
        type:REMOVE_FROM_CART,
        load:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const saveAddress = (address)=>async(dispatch,getState)=>{
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        load:address
    })
    localStorage.setItem('Address',JSON.stringify(address));
}

export const savePaymentMethod=(payment_type)=>async(dispatch)=>{
    dispatch({
        type:SAVE_PAYMENT_METHOD,
        load:payment_type
    })
    localStorage.setItem('paymentMethod',JSON.stringify(payment_type));
}
