import React,{useState,useContext, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderItem from '../Components/OrderItem';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
    paper:{
        width:'80vw',
        height:'7vh',
        backgroundColor: '#009933',
        color:'white',
        paddingTop:'2vh',
        marginBottom:'2vh',
        fontFamily: `'IBM Plex Serif',serif`,
        fontSize:'30px'
    }
});

const Orders= ()=> {

    const classes = useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [orders,setOrders]= useState(null);

    useEffect(()=>{
        if(state.auth.isSignedIn && state.orders)
            setOrders(Object.values(state.orders));
    },[state.orders])

    return (
        <div style={{marginTop:'3vh',marginBottom:'5vh',marginLeft:state.mobileView?'3vw':'10vw',marginRight:state.mobileView?'3vw':'10vw'}}>
                <div>
                    <Paper className={classes.paper} style={{width:state.mobileView?'94vw':'80vw'}}>
                        Orders
                    </Paper>
                    {
                        !state.auth.isSignedIn && (
                            <Paper >
                                <Grid container spacing={3} justify="center" >
                                    <Grid item>
                                        <h1>Sign in to see your ordered items</h1>
                                        <VpnKeyOutlinedIcon style={{fontSize:state.mobileView?"20vw":"100px"}}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )||

                        state.auth.isSignedIn && !orders && (
                            <Paper>
                                <Grid container spacing={3} justify="center" >
                                    <Grid item>
                                        <h1>No Order Placed</h1>
                                        <RemoveShoppingCartOutlinedIcon style={{fontSize:state.mobileView?"20vw":"125px"}}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )||

                        orders && orders.length!=0 && (
                            orders.map((order,index)=>{
                                return (
                                    <Paper key={index}>
                                        <hr/><br/>
                                        <h5 style={{textAlign:'center',fontFamily: `'IBM Plex Serif',serif`}}><strong>Order No: #{order.orderNo}</strong></h5>
                                        <div style={{marginLeft:'2vw',textAlign:'left'}}>
                                            <h5 style={{fontFamily: `'IBM Plex Serif',serif`}}>Purchase Date: {order.createdAt.substring(0,10)}</h5>
                                            <h5 style={{fontFamily: `'IBM Plex Serif',serif`}}>Address: C\O Mr B S Bhandari Astha Niwas Dehradun</h5>
                                        </div>

                                        <br/>
                                        {
                                            order.products.map((item,key)=>{
                                               return <OrderItem item={item} orderId={order._id} key={key} />
                                            })
                                        }
                                        <br/>
                                    </Paper>
                                )
                            })
                        )||

                        orders && orders.length==0 && (
                            <Paper>
                                <hr/>
                                <br/>
                                <Grid container spacing={3} justify="center" >
                                    <Grid item>
                                        <h1>No Order List Available</h1>
                                        <RemoveShoppingCartOutlinedIcon style={{fontSize:state.mobileView?"20vw":"125px"}}/>
                                    </Grid>
                                </Grid>
                                <br/>
                            </Paper>
                        )
                    }
                
                </div>
            </div>
    );
}

export default Orders;