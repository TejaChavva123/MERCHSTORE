import { PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

import { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAILURE,PRODUCT_DETAILS_RESET } from "../constants/productConstants";

export const ProductListReducer = (state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.load};
        case PRODUCT_LIST_FAILURE:
            return {loading:false,error:action.load};
        default:
            return state;
    }
}

export const ProductDetailsReducer = (state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true,...state};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false,product:action.load};
        case PRODUCT_DETAILS_FAILURE:
            return {loading:false,error:action.load};
        case PRODUCT_DETAILS_RESET:
            return {...state,product:{}};
        default:
            return state;
    }
}