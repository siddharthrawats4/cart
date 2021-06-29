import React,{useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Modal from './Modal';

import {AppContext} from '../AppContext';
import {editOrder} from '../actions/actions';
import axios from '../axios';

const useStyles = makeStyles({
    description:{
        display: '-webkit-box',
        maxWidth: '80vw',
        '-webkitLineClamp': '3',
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden'
    }
});

const OrderItem= ({item,orderId})=>{

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClickStatus = async(changedStatus)=>{
        const response= await axios.post(`/order/user/${item.product._id}/${orderId}`,{status: changedStatus});
        console.log(response.data);
        dispatch(editOrder(response.data));
    }

    const checkReturnStatus= item.deliveredDate?{isDelivered:true,isOrderSuccessful:Date.now()-1000*60*60*24*14>new Date(item.deliveredDate)}:{isDelivered:false,isOrderSuccessful:false}
    
    return (
        <>
            <Link to={`/product/${item.product._id}`}>
                <h4 className={classes.description} style={{fontFamily: `'IBM Plex Serif',serif`,color:'#2f7fe0',cursor:'pointer'}}>{item.product.name}</h4>
                <br/>
                <Grid container spacing={1}>
                    <Grid item xs={3} style={{marginTop:state.mobileView?'0vh':'2vh'}}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${item.product._id}/0`} style={{width:state.mobileView?'15vw':'60px',height:state.mobileView?'10vh':'80px'}}/>
                    </Grid>
                    <Grid item xs={state.mobileView?7:6}>
                        <div style={{marginBottom:'1vh'}}>
                            <h4 className={classes.description} style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>Status: {item.status!='Refunded'?item.status:'Returned'}</h4>
                        </div>
                        <h4 style={{fontFamily: `'IBM Plex Serif',serif`,color:'black',cursor:'pointer'}}>{item.deliveredDate?`Delivered Date: ${item.deliveredDate.substring(0,10)}`:`Expected Date: ${item.expectedDate.substring(0,10)}`}</h4>
                    </Grid>
                    <Grid item xs={state.mobileView?2:3}>
                        <div style={{color:'black'}}>
                            {state.mobileView?'':'Price : '}
                            <h6 style={{fontFamily: `'IBM Plex Serif',serif`,display:'inline'}}>
                                <del>₹{item.product.price}</del>
                            </h6>
                            <h4 style={{fontFamily: `'IBM Plex Serif',serif`,display:'inline'}}>
                                <strong> ₹{item.product.price-Math.trunc(item.product.discount/100*item.product.price)}</strong>
                            </h4>
                            <h5 style={{fontFamily: `'IBM Plex Serif',serif`,cursor:'pointer'}}>
                                {state.mobileView?'X':'Quantity:'}  {item.quantity}
                            </h5>
                        </div>
                    </Grid>
                </Grid>
            </Link>
            {
                !checkReturnStatus.isOrderSuccessful && item.status!='Returning' && item.status!='Refunded' && item.status!='Cancelled' && item.status!='Request Return' && (
                    <div style={{textAlign:'right',marginTop:'2vh',marginRight:state.mobileView?'2vw':'7vw'}}>
                        
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            {checkReturnStatus.isDelivered?'Return':'Cancel'}
                        </Button>

                        <Modal
                            open={open} 
                            handleOpen={handleOpen} 
                            handleClose={handleClose}
                            title= "My Orders"
                            description={`Are you sure you want to ${checkReturnStatus.isDelivered?'return':'cancel'} this product?`}
                            action={
                                async()=>{
                                    await onClickStatus(checkReturnStatus.isDelivered?'Request Return':'Cancelled');
                                    handleClose();
                                }
                            } 
                        />
                        
                    </div>
                )
            }
            <br/><br/>
        </>
    );
}

export default OrderItem;