import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { ProductListReducer,ProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';


const reducer = combineReducers({
    productsList:ProductListReducer,
    productDetails:ProductDetailsReducer,
    cart:cartReducer,
});


const cartItems_From_Storage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState= {
    cart:{cartItems:cartItems_From_Storage}
};
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;