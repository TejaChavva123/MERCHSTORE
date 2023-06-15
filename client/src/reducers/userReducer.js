import { USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAILURE,USER_LOGOUT, USER_UPDATE_RESET } from "../constants/userConstant";

import { USER_REGISTER_FAILURE,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST } from "../constants/userConstant";

import { USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAILURE,USER_DETAILS_RESET } from "../constants/userConstant";

import { USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAILURE } from "../constants/userConstant";
export const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true};
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.load};
        case USER_LOGIN_FAILURE:
            return {loading:false,error:action.load};
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.load};
        case USER_REGISTER_FAILURE:
            return {loading:false,error:action.load};
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userDetailsReducer = (state={user:{}},action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true,...state};
        case USER_DETAILS_SUCCESS:
            return {loading:false,user:action.load};
        case USER_DETAILS_FAILURE:
            return {loading:false,error:action.load};
        case USER_DETAILS_RESET:
            return {user:{}}
        default:
            return state;
    }
}

export const userUpdateReducer = (state={user:{}},action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading:true,};
        case USER_UPDATE_SUCCESS:
            return {loading:false,update:true,user:action.load};
        case USER_UPDATE_FAILURE:
            return {loading:false,error:action.load};
        case USER_UPDATE_RESET:
            return {user:{}};
        default:
            return state;
    }
}