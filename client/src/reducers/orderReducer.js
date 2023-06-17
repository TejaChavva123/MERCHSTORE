import { ORDER_CREATE_REQUEST,ORDER_CREATE_FAILURE,ORDER_CREATE_SUCCESS, ORDER_CREATE_RESET, LIST_USER_ORDERS_REQUEST, LIST_USER_ORDERS_SUCCESS, LIST_USER_ORDERS_FAILURE, LIST_USER_ORDERS_RESET } from "../constants/orderConstants";
import { ORDER_DETAILS_FAILURE,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST } from "../constants/orderConstants";
export const orderReducer = (state={order:{}},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {...state,loading:true}
        case ORDER_CREATE_SUCCESS:
            return {order:action.load,create:true,loading:false}
        case ORDER_CREATE_FAILURE:
            return {loading:false,error:action.load}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (state={order:{orderItems:[],shippingAddress:{},user:{}}},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state,loading:true}
        case ORDER_DETAILS_SUCCESS:
            return {order:action.load,loading:false}
        case ORDER_DETAILS_FAILURE:
            return {loading:false,error:action.load};
        default:
            return state
    }
}

export const listUserOrdersReducer = (state={orders:[]},action)=>{
    switch(action.type){
        case LIST_USER_ORDERS_REQUEST:
            return {Ordersloading:true}
        case LIST_USER_ORDERS_SUCCESS:
            return {Ordersloading:false,orders:action.load};
        case LIST_USER_ORDERS_FAILURE:
            return {Ordersloading:false,Orderserror:action.load};
        case LIST_USER_ORDERS_RESET:
            return {}
        default:
            return state
    }
}