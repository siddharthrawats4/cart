import React,{useContext} from 'react';

import {AppContext} from "../AppContext";


const Categories= ()=> {

    const {state}=  useContext(AppContext);

    return (
        <div>
            Categories
        </div>
    );
}

export default Categories;