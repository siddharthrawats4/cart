import axios from '../axios'
import { categoriesData } from '../helpers/categoriesData';

export const mobileView= (flag)=>{
    return {
        type: "setMobileView",
        payload:flag
    }
}
export const profile = (user)=>{
    return {
        type: "changeProfile",
        payload: user
    }
}
export const auth = (user,flag)=>{
    console.log(user);
    return {
        type: "isAuth",
        payload: {
            user,
            flag,
        }
    }
};

export const setStockQuantity = (id,value)=>{
    return {
        type: "setStockQuantity",
        payload: {
            id,
            value
        }
    }
};

export const addOrder = (order)=>{
    return {
        type: "addOrder",
        payload: {
            order
        }
    }
};

export const editOrder= (order)=>{
    return {
        type: "editOrder",
        payload:{
            order
        }
    }
}

export const cartValue= (value)=>{
    return {
        type: "setCartValue",
        payload:value
    }
}

export const setFilter= (data)=>{
    return {
        type: "setFilter",
        payload:data
    }
}

export const fetchCategories = ()=> {
    const response= categoriesData();
    return {
        type: "fetchCategories", 
        payload: response
    };
};

export const fetchCarousels = async()=> {
    const response= await axios.get('/carousel');
    return {
        type: "fetchCarousels", 
        payload: response.data
    };
};


export const fetchingCategories = async()=> {
    const response= await axios.get('/category');
    return {
        type: "fetchingCategories", 
        payload: response.data
    };
};

export const fetchProducts = async()=> {
    const response= await axios.get(`/product`);
    return {
        type: "fetchProducts", 
        payload: response.data
    };
};

export const fetchProductsLimited = async()=> {
    const response= await axios.get(`/product/filter`,{params:{search: "number",sorting: null,size:10}});
    return {
        type: "fetchProductsLimited", 
        payload: response.data
    };
};

export const fetchUsers = async()=> {
    const response= await axios.get('/user');
    return {
        type: "fetchUsers", 
        payload: response.data
    };
};

export const filteredCategories = (data)=> {
    console.log(data);
    return {
        type: "fetchFilteredCategories", 
        payload: data
    };
};
export const filteredSubCategories = (data)=> {
    console.log(data);
    return {
        type: "fetchFilteredSubCategories", 
        payload: data
    };
};

export const filteredCategoryPresent = (flag)=> {
    return {
        type: "isFilteredCategoryPresent", 
        payload: flag
    };
};

export const fetchOrders = async (email) => {
    const response = await axios.get(`/order/${email}`);
    return {
        type: 'fetchOrders', 
        payload: response.data
    }
};

export const setCartItemNull = () => {
    return { 
        type: 'setCartItemNull'
    }
};

export const fetchCartItems = async () => {
    const response = await axios.get('/cart');
    return {
        type: 'fetchCartItems', 
        payload: response.data
    }
};

export const fetchCartItem = async (id) => {
    console.log(`hello cart ${id}`);
    const response = await axios.get(`/cart/${id}`);
    console.log(response.data);
    return { 
        type: 'fetchCartItem', 
        payload: response.data
    }
};

export const addCartItem= async(cartId,formValues)=>{
    const response= await axios.post(`/cart/${cartId}`, formValues);

    console.log(response.data);
    return {
        type: 'addCartItem',
        payload: response.data
    }
};

export const editCartItem = async(id,quantity,user, formValues) =>{
    const response=  await axios.patch(`/cart/${user.cart}/${id}/${quantity}`, formValues);

    return { 
        type: 'editCartItem', 
        payload: response.data
    }
};

export const deleteCartItem = async (cartId,productId)=> {
    await axios.delete(`/cart/${cartId}/${productId}`);
    return {
        type: 'deleteCartItem',
        payload: productId
    }
}