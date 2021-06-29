import React,{useState,useEffect,useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';
import Card from '../Components/Card';
import Filter from '../Components/Filter';
import { makeStyles } from '@material-ui/core';

import axios from '../axios';


const useStyles = makeStyles((theme) => ({
    loading_desktop:{
        marginTop:'30vh',
        marginLeft:'30vw'
    },
    loading_mobile:{
        marginTop:'10vh',
        marginBottom:'10vh'
    }
}));
const ProductsList = ({selectedCategory})=> {

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [loadingComplete,setLoadingComplete]= useState(true);

    const [data,setData]= useState(null)

    useEffect(()=>{

        if(state.products){

            setLoadingComplete(false);
            var array= Object.values(state.products);

            if(state.filter.name){

                if(state.filter.name=="ascendingName")
                    array= Object.values(state.products).sort((a,b)=>a.name>b.name?1:-1);
                else if(state.filter.name=="descendingName")
                    array= Object.values(state.products).sort((a,b)=>a.name<b.name?1:-1);
                else if(state.filter.name=="ascendingPrice")
                    array= Object.values(state.products).sort((a,b)=>Number(a.price)>Number(b.price)?1:-1);
                else if(state.filter.name=="descendingPrice")
                    array= Object.values(state.products).sort((a,b)=>Number(a.price)<Number(b.price)?1:-1);
            }
            
            setData(array);
            setLoadingComplete(true);
        }

    },[state.filteredSubCategories,state.filter.name,state.products]);

    if(!state.filteredSubCategories && !state.products && !data)
        return (
            <div style={{margin:'15vh'}}>
                Loading...
            </div>
        );
    
    return (
        <Grid container spacing={3} style={{marginTop:'1vh'}} justify="space-around">
            <Grid item lg={3} sm={12}>
                <Filter selectedCategory={selectedCategory} />
            </Grid>
            <Grid item lg={9} sm={12}>
                <Grid container spacing={3} justify={state.mobileView?'center':'flex-start'} >
                    <br/>
                    {
                        state.filteredSubCategories && state.products && loadingComplete && data && data.map((product,index)=>{
                            if(state.filteredSubCategories.includes(product.parent) || state.filteredSubCategories.length==0){
                                console.log(product);
                                return (
                                    <Grid item  key={index}>
                                        <Link to={`/product/${product._id}`} style={{textAlign:'center'}}>
                                            <Card product={product} />
                                        </Link>
                                    </Grid>
                                );
                            }
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductsList;