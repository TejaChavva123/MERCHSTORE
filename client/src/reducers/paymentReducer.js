import { PAYMENT_CREATE_REQUEST,PAYMENT_CREATE_SUCCESS,PAYMENT_CREATE_FAILURE, ORDER_PAYMENT_RESET,ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS } from "../constants/paymentConstants";

export const paymentReducer =(state={},action)=>{
    switch(action.type){
        case PAYMENT_CREATE_REQUEST:
            return {loading:false}
        case PAYMENT_CREATE_SUCCESS:
            return {orderId:action.load,loading:false}
        case PAYMENT_CREATE_FAILURE:
            return {loading:false,error:action.load};
        default:
            return state
    }
}

export const paymentUpdateReducer =(state={order:{}},action)=>{
    switch(action.type){
        case ORDER_PAYMENT_REQUEST:
            return {loading:false}
        case ORDER_PAYMENT_SUCCESS:
            return {order:action.load,loading:false,pay:true}
        case ORDER_PAYMENT_SUCCESS:
            return {loading:false,error:action.load};
        case ORDER_PAYMENT_RESET:
            return {}
        default:
            return state
    }
}