import { ADMIN_USER_LIST_REQUEST,ADMIN_USER_LIST_SUCCESS,ADMIN_USER_DELETE_FAILURE,ADMIN_USER_LIST_FAILURE,ADMIN_USER_LIST_RESET, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DETAILS_REQUEST, ADMIN_USER_DETAILS_SUCCESS, ADMIN_USER_DETAILS_FAILURE, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, ADMIN_USER_UPDATE_FAILURE, ADMIN_USER_UPDATE_RESET, ADMIN_PRODUCT_LIST_REQUEST, ADMIN_PRODUCT_LIST_SUCCESS, ADMIN_PRODUCT_LIST_FAILURE, ADMIN_PRODUCT_LIST_RESET, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAILURE, ADMIN_USER_DELETE_RESET, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAILURE, ADMIN_PRODUCT_UPDATE_RESET, ADMIN_PRODUCT_DETAILS_REQUEST, ADMIN_PRODUCT_DETAILS_SUCCESS, ADMIN_PRODUCT_DETAILS_FAILURE, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAILURE, ADMIN_PRODUCT_CREATE_RESET, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_FAILURE, ADMIN_ORDER_LIST_RESET } from "../constants/adminConstants";

export const adminReducer = (state={users:[]},action)=>{
    switch(action.type){
        case ADMIN_USER_LIST_REQUEST:
            return {loading:true}
        case ADMIN_USER_LIST_SUCCESS:
            return {loading:false,users:action.load};
        case ADMIN_USER_LIST_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_USER_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const adminUserDeleteReducer = (state={user:{}},action)=>{
    switch(action.type){
        case ADMIN_USER_DELETE_REQUEST:
            return {...state,loading:true}
        case ADMIN_USER_DELETE_SUCCESS:
            return {successDelete:true,loading:false}
        case ADMIN_USER_DELETE_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const adminUserDetailsReducer = (state={user:{}},action)=>{
    switch(action.type){
        case ADMIN_USER_DETAILS_REQUEST:
            return {loading:true}
        case ADMIN_USER_DETAILS_SUCCESS:
            return {loading:false,user:action.load};
        case ADMIN_USER_DETAILS_FAILURE:
            return {loading:false,error:action.load};
        default:
            return state
    }
}

export const adminUserUpdateReducer = (state={user:{}},action)=>{
    switch(action.type){
        case ADMIN_USER_UPDATE_REQUEST:
            return {loading:true}
        case ADMIN_USER_UPDATE_SUCCESS:
            return {loading:false,successUpdate:true,user:action.load}
        case ADMIN_USER_UPDATE_FAILURE:
            return {loading:false}
        case ADMIN_USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}


export const adminProductListReducer = (state={},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_LIST_REQUEST:
            return {loading:true}
        case ADMIN_PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.load};
        case ADMIN_PRODUCT_LIST_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_PRODUCT_LIST_RESET:
            return {}
        default:
            return state
    }
}


export const adminProductDeleteReducer = (state={product:{}},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case ADMIN_PRODUCT_DELETE_SUCCESS:
            return {successDelete:true,loading:false}
        case ADMIN_PRODUCT_DELETE_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const adminProductDetailsReducer = (state={product:{}},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_DETAILS_REQUEST:
            return {loading:true}
        case ADMIN_PRODUCT_DETAILS_SUCCESS:
            return {loading:false,product:action.load};
        case ADMIN_PRODUCT_DETAILS_FAILURE:
            return {loading:false,error:action.load};
        default:
            return state
    }
}



export const adminProductUpdateReducer = (state={product:{}},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return {loading:true}
        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return {loading:false,successUpdate:true,product:action.load}
        case ADMIN_PRODUCT_UPDATE_FAILURE:
            return {loading:false}
        case ADMIN_PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const adminCreateProductReducer = (state={product:{}},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case ADMIN_PRODUCT_CREATE_SUCCESS:
            return {loading:false,successCreate:true,product:action.load};
        case ADMIN_PRODUCT_CREATE_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }

}


export const adminOrderListReducer = (state={},action)=>{
    switch(action.type){
        case ADMIN_ORDER_LIST_REQUEST:
            return {loading:true}
        case ADMIN_ORDER_LIST_SUCCESS:
            return {loading:false,orders:action.load};
        case ADMIN_ORDER_LIST_FAILURE:
            return {loading:false,error:action.load};
        case ADMIN_ORDER_LIST_RESET:
            return {}
        default:
            return state
    }
}
