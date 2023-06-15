import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { ProductListReducer,ProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userDetailsReducer, userLoginReducer,userRegisterReducer, userUpdateReducer} from './reducers/userReducer';


const reducer = combineReducers({
    productsList:ProductListReducer,
    productDetails:ProductDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer
});


const cartItems_From_Storage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfo_From_Storage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null;
const address_From_Storage = localStorage.getItem('Address') ? JSON.parse(localStorage.getItem('Address')) : {};

const initialState= {
    cart:{
        cartItems:cartItems_From_Storage,
        Address: address_From_Storage
    },
    userLogin:{userInfo:userInfo_From_Storage}
};
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;