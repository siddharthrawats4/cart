import React, {createContext,useReducer} from "react";
import _ from 'lodash';

const AppContext = createContext({});

const initialState= {
    mobileView: false,
    products: null,
    users: null,
    cartValue: 0,
    cart:[],
    auth: {
        isSignedIn: false,
        user:null
    },
    categories:null,
    carousels:null,
    orders: null,
    cat:[],
    filter:{
        name: null
    },
    filteredCategories: {},
    filteredSubCategories:[],
    filteredProducts: [],
    isFilteredCategoryPresent: false,
    productsLimited: null
}

const reducer = (state, action)=>{
    console.log(action.type);
    switch (action.type){
        case "setMobileView":
            return {...state, mobileView: action.payload};
        case "isAuth":
            return {...state, auth:{ isSignedIn: action.payload.flag, user: action.payload.user}};
        case "changeProfile": 
            console.log(action.payload);
            return {...state , auth: {...state.auth , user: {...state.auth.user, ...action.payload }}}
        case "fetchOrders":
            return {...state,  orders: _.mapKeys(action.payload,'_id')}
        case "addOrder":
            return {...state,  orders: {[action.payload.order._id]: action.payload.order,...state.orders}}
        case "editOrder":
            return {...state, orders: {...state.orders,[action.payload.order._id]:action.payload.order}}
        case "setFilter":
            return {...state, filter:{ name: action.payload.name}};
        case "isFilteredCategoryPresent":
            return {...state, isFilteredCategoryPresent: action.payload};
        case "fetchCarousels":
            return {...state, carousels:_.mapKeys(action.payload,'_id')}
        case "fetchingCategories":
            return {...state, categories:_.mapKeys(action.payload,'_id')}
        case "fetchFilteredCategories":
            return {...state, filteredCategories: action.payload};
        case "fetchFilteredSubCategories":
            return {...state, filteredSubCategories: action.payload};
        case "fetchCategories":
            return {...state, cat: _.mapKeys(action.payload,'_id')};
        case "fetchProducts":
            return {...state, products: _.mapKeys(action.payload,'_id')};
        case "setStockQuantity":
            return {...state, products:{...state.products,[action.payload.id]:{...state.products[action.payload.id],stockQuantity:Number(action.payload.value)}}};
        case "fetchProductsLimited":
            return {...state, productsLimited: _.mapKeys(action.payload,'_id')};
        case "fetchFilteredProducts":
            return {...state, filteredProducts: _.mapKeys(action.payload,'_id')};
        case "fetchUsers":
            return {...state, users: _.mapKeys(action.payload,'email')};
        case "setCartValue":
            return {...state, cartValue: action.payload};
        case "setCartItemNull":
            return {...state, cart: [] };
        case "fetchCartItems":
            return {...state, cart: _.mapKeys(action.payload,'productId')};
        case "fetchCartItem":
            return { ...state, cart: _.mapKeys(action.payload,'_id')};
        case "addCartItem":
            console.log("grk");
            return {...state, cart:{...state.cart,[action.payload._id]: action.payload }};
        case "editCartItem":
            return { ...state, cart: {...state.cart,[action.payload._id]: action.payload}};
        case "deleteCartItem":
            return {...state, cart: _.omit(state.cart, action.payload)};
        default:
            return {...state};
    }
}
 
const AppContextProvider= (props)=>{
    const appState= {...initialState};

    const [state,dispatch]= useReducer(reducer,appState);

    let value = {state,dispatch};

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};