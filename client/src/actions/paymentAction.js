import axios from "axios";
import { PAYMENT_CREATE_REQUEST,PAYMENT_CREATE_SUCCESS,PAYMENT_CREATE_FAILURE, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAILURE } from "../constants/paymentConstants";
import { userLogout } from "./userAction";

export const createPayment = (id) => async(dispatch,getState)=>{
    try{
        dispatch({type:PAYMENT_CREATE_REQUEST})
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
            authorization: `Bearer ${userInfo.token}`,
            },
        }
        const response = await axios.get(`/api/payment/createPayment/${id}`,config);
        dispatch({type:PAYMENT_CREATE_SUCCESS,load:response.data.orderId});
    }
    catch(error){
        if (error.response.data.message==='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:PAYMENT_CREATE_FAILURE,load:error.response.data.message});
    }
}

export const orderPaid = (id,paymentResult)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_PAYMENT_REQUEST})
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
            authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.post(`/api/payment/updatetopaid/${id}`,paymentResult,config);
        dispatch({type:ORDER_PAYMENT_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message==='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ORDER_PAYMENT_FAILURE,load:error.response.data.message});
    }
}