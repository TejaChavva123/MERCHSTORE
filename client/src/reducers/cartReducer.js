import { ADD_TO_CART,REMOVE_FROM_CART } from "../constants/cartConstant";
import { SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant";

export const cartReducer = (state={cartItems:[],Address:{}},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.load;
            const isExistsItem = state.cartItems.find(x=>x.product===item.product);
            if (isExistsItem){
                return {...state,cartItems:state.cartItems.map(x=>x.product===isExistsItem.product ? item : x)};
            }
            else{
                return {...state,cartItems:[...state.cartItems,item]};
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.load),
            }
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,Address:action.load,saved:true
            }
        default:
            return state;
    }
} 