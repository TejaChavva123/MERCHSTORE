import { USER_LOGIN_REQUEST,USER_LOGIN_FAILURE,USER_LOGIN_SUCCESS, USER_LOGOUT, USER_DETAILS_RESET } from "../constants/userConstant";
import { USER_REGISTER_FAILURE,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST } from "../constants/userConstant";
import { USER_DETAILS_REQUEST,USER_DETAILS_FAILURE,USER_DETAILS_SUCCESS } from "../constants/userConstant";
import { USER_UPDATE_REQUEST,USER_UPDATE_FAILURE,USER_UPDATE_SUCCESS } from "../constants/userConstant";
import axios from 'axios';

export const userLogin = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const info = await axios.post('/api/users/login',{email,password});
        dispatch({type:USER_LOGIN_SUCCESS,load:info.data});
        localStorage.setItem('userInfo',JSON.stringify(info.data));
    }
    catch(error){
        dispatch({type:USER_LOGIN_FAILURE,load:error.response.data.message});
    }
}

export const userLogout = ()=>(dispatch)=>{
    localStorage.removeItem('userInfo');
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:USER_LOGOUT});
}

export const userRegister = (firstName,lastName,email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        const info = await axios.post('/api/users/register',{firstName,lastName,email,password});
        dispatch({type:USER_REGISTER_SUCCESS,load:info.data});
        dispatch({type:USER_LOGIN_SUCCESS,load:info.data});
        localStorage.setItem('userInfo',JSON.stringify(info.data));
    }
    catch(error){
        dispatch({type:USER_REGISTER_FAILURE,load:error.response.data.message});
    }
}

export const getuserDetails =()=>async(dispatch,getState)=> {
    try{
        dispatch({type:USER_DETAILS_REQUEST})
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get('/profile/getDetails', config);
        dispatch({type:USER_DETAILS_SUCCESS,load:data});
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:USER_DETAILS_FAILURE,load:error.response.data.message});
    }
}

export const updateUserProfile = (user)=>async(dispatch,getState)=>{
    try{
        dispatch({type:USER_UPDATE_REQUEST})
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put('/profile/updateDetails',user,config);
        dispatch({type:USER_UPDATE_SUCCESS,load:data});
        dispatch({type:USER_LOGIN_SUCCESS,load:data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        if (error.response.data.message=='No Authorization'){
            dispatch(userLogout());
        }
        dispatch({type:USER_UPDATE_FAILURE,load:error.response.data.message});
    }
}