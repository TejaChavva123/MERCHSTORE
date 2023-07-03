import { ORDER_CREATE_REQUEST,ORDER_CREATE_FAILURE,ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE, LIST_USER_ORDERS_REQUEST, LIST_USER_ORDERS_SUCCESS, LIST_USER_ORDERS_FAILURE } from "../constants/orderConstants";
import axios from "axios";
import { userLogout } from "./userAction";
import { CART_CLEAR } from "../constants/cartConstant";

export const addOrder = (order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_CREATE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
            authorization: `Bearer ${userInfo.token}`,
            },
        }
        const info = await axios.post(`/api/orders/addOrder`,order,config);
        dispatch({type:ORDER_CREATE_SUCCESS,load:info.data}); 
        dispatch({type:CART_CLEAR});
    }
    catch(error){
        if (error.response.data.message==='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ORDER_CREATE_FAILURE,load:error.response.data.message})
    }
}

export const getorderDetails = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
            authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get(`/api/orders/getOrder/${id}`,config);
        dispatch({type:ORDER_DETAILS_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message==='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ORDER_DETAILS_FAILURE,load:error.response.data.message});
    }
} 

export const userOrdersList = ()=>async(dispatch,getState)=>{
    try{
        dispatch({type:LIST_USER_ORDERS_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
            authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get(`/api/orders/userOrders`,config);
        dispatch({type:LIST_USER_ORDERS_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message==='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:LIST_USER_ORDERS_FAILURE,load:error.response.data.message});
    }

}