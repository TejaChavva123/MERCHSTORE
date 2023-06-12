import { PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

import { PRODUCT_DETAILS_FAILURE,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import axios from 'axios';

export const listProducts =()=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const info = await axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS,load:info.data});
    }
    catch(err){
        dispatch({type:PRODUCT_LIST_FAILURE,load: err.response.data.message});
    }
}

export const detailsProduct =(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const info = await axios.get(`/api/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,load:info.data});
    }
    catch(err){
        dispatch({type:PRODUCT_DETAILS_FAILURE,load: err.response.data.message});
    }
}