import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import {Link,useHistory} from 'react-router-dom';

import {AppContext} from '../AppContext';
import CartItem from '../Components/CartItem';


const Cart= ()=> {

    const {state,dispatch}= useContext(AppContext);

    const history= useHistory();

    const [amount,setAmount]= useState(0);
    const [discount,setDiscount]= useState(0);

    useEffect(async()=>{
        var amt=0;
        var disct= 0;
        Object.values(state.cart).map((item)=>{
            console.log(item.stockQuantity);
            if(item.stockQuantity!=0){
                amt= amt+item.price*item.quantity;
                disct= disct+(Math.trunc(item.discount/100*item.price))*item.quantity;
            }
        });
        setAmount(amt);
        setDiscount(disct);
    },[state.cart]);

    console.log(state);

    const len = Object.values(state.cart).length; 

    const cartMenu= ()=>{

        if(!state.auth.isSignedIn)
            return (
                <Grid container spacing={3} justify="center" >
                    <Grid item>
                        <h1>Sign In before using cart</h1>
                        <VpnKeyOutlinedIcon style={{fontSize:state.mobileView?"20vw":"125px"}}/>
                    </Grid>
                </Grid>
            );

        if(amount==0)
            return (
                <Grid container spacing={3} justify="center" >
                    <Grid item>
                        <h1>Cart is Empty</h1>
                        <RemoveShoppingCartOutlinedIcon style={{fontSize:state.mobileView?"20vw":"125px"}}/>
                    </Grid>
                </Grid>
            );

        return (
            Object.values(state.cart).map((ob,index)=>{
                if(ob.stockQuantity!=0){
                    return (
                        <div style={{marginTop:'3vh',paddingBottom:'4vh'}} key={index}>
                            <CartItem ob={ob} />
                        </div>
                    
                    );
                }
            })
        )
    }

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:state.mobileView?'3vw':'10vw',marginRight:state.mobileView?'3vw':'10vw'}}>
            <Grid container spacing={2}>
                <Grid item sm={8}>
                    <Paper elevation={1} style={{width:state.mobileView?'95vw':'' , paddingTop: '1vh'}} >
                        <h3 style={{fontFamily: `'IBM Plex Serif',serif` }}>My Cart</h3>
                        <hr/>
                        {cartMenu()}
                    </Paper>
                </Grid>
                
                <Grid item sm={4}>
                    <Paper elevation={1} style={{width:state.mobileView?'95vw':'auto' , paddingTop: '1vh'}}>
                        <h3 style={{fontFamily: `'IBM Plex Serif',serif`}}>Price Details</h3>
                        <hr/>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item >
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Price({len} {len>1?'items':'item'})</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{amount}</h4>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item >
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Discount</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{discount}</h4>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>Total Amount</h4>
                            </Grid>
                            <Grid item>
                                <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}> ₹{amount-discount}</h4>
                            </Grid>
                        </Grid>
                        <br/><br/><br/>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item>
                                <Button onClick={()=>history.push('/cart/checkout',{flag:true,isCart:true,amount:amount-discount,items:Object.values(state.cart)})} disabled={(!state.auth.isSignedIn || Object.values(state.cart)==0)?true:false} variant="contained" color="primary">
                                    Place Your Order
                                </Button>
                            </Grid>
                        </Grid>
                        <br/>
                        
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cart;
