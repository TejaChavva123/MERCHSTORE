import { ADMIN_USER_LIST_REQUEST,ADMIN_USER_LIST_SUCCESS,ADMIN_USER_LIST_FAILURE,ADMIN_USER_LIST_RESET, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAILURE, ADMIN_USER_DETAILS_REQUEST, ADMIN_USER_DETAILS_SUCCESS, ADMIN_USER_DETAILS_FAILURE, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, ADMIN_USER_UPDATE_FAILURE, ADMIN_PRODUCT_LIST_REQUEST, ADMIN_PRODUCT_LIST_FAILURE, ADMIN_PRODUCT_LIST_SUCCESS, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAILURE, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAILURE, ADMIN_PRODUCT_DETAILS_REQUEST, ADMIN_PRODUCT_DETAILS_SUCCESS, ADMIN_PRODUCT_DETAILS_FAILURE, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAILURE, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_FAILURE } from "../constants/adminConstants";
import axios from "axios";
import { userLogout } from "./userAction";
import { USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_SUCCESS } from "../constants/userConstant";
import { PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";

export const fetchUsersbyAdmin = ()=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_USER_LIST_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get('/api/admin/getUsers',config);
        dispatch({type:ADMIN_USER_LIST_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_USER_LIST_FAILURE,load:error.response.data.message});
    }
}

export const deleteUserByID = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_USER_DELETE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = axios.delete(`/api/admin/deleteuserbyid/${id}`,config);
        dispatch({type:ADMIN_USER_DELETE_SUCCESS})
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_USER_DELETE_FAILURE,load:error.response.data.message});
    }
}

export const fetchUserDetailsbyID = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_USER_DETAILS_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get(`/api/admin/getuserbyid/${id}`,config);
        dispatch({type:ADMIN_USER_DETAILS_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_USER_DETAILS_FAILURE,load:error.response.data.message});
    }
}

export const updateUserByID = (user,id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_USER_UPDATE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(`/api/admin/updateuserbyid/${id}`,user,config);
        dispatch({type:ADMIN_USER_UPDATE_SUCCESS,load:data});
        dispatch({type:USER_DETAILS_SUCCESS,load:data});
        dispatch({type:USER_DETAILS_RESET})
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_USER_UPDATE_FAILURE,load:error.response.data.message});
    }
}

export const fetchProductsbyAdmin = ()=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_LIST_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get('/api/admin/getProducts',config);
        dispatch({type:ADMIN_PRODUCT_LIST_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_PRODUCT_LIST_FAILURE,load:error.response.data.message});
    }
}

export const deleteProductByID = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_DELETE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = axios.delete(`/api/admin/deleteproductbyid/${id}`,config);
        dispatch({type:ADMIN_PRODUCT_DELETE_SUCCESS})
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_PRODUCT_DELETE_FAILURE,load:error.response.data.message});
    }
}

export const fetchProductDetailsbyID = (id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_DETAILS_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get(`/api/admin/getproductbyid/${id}`,config);
        dispatch({type:ADMIN_PRODUCT_DETAILS_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_PRODUCT_DETAILS_FAILURE,load:error.response.data.message});
    }
}


export const updateProductByID = (product,id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_UPDATE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(`/api/admin/updateproductbyid/${id}`,product,config);
        dispatch({type:ADMIN_PRODUCT_UPDATE_SUCCESS,load:data});
        dispatch({type:PRODUCT_DETAILS_SUCCESS,load:data});
        dispatch({type:USER_DETAILS_RESET})
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_PRODUCT_UPDATE_FAILURE,load:error.response.data.message});
    }
}

export const createProduct = (product)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_CREATE_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.post('/api/admin/createProduct',product,config);
        dispatch({type:ADMIN_PRODUCT_CREATE_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_PRODUCT_CREATE_FAILURE,load:error.response.data.message});
    }
}

export const fetchOrdersbyAdmin = ()=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_ORDER_LIST_REQUEST});
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.get('/api/admin/getOrders',config);
        dispatch({type:ADMIN_ORDER_LIST_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:ADMIN_ORDER_LIST_FAILURE,load:error.response.data.message});
    }
}