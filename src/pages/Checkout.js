import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

import {addOrder, fetchCartItem, setCartItemNull, setStockQuantity} from "../actions/actions";

import CheckoutItem from '../Components/CheckoutItem';
import Modal from '../Components/Modal';
import Alert2 from '../Components/Alert2';

import {AppContext} from '../AppContext';
import axios from '../axios'

const useStyles = makeStyles({
    paper:{
        width:'80vw',
        height:'5vh',
        backgroundColor: '#009933',
        color:'white',
        paddingTop:'1vh',
        fontFamily: `'IBM Plex Serif',serif`,
        fontSize:'30px'
    }
});

const Checkout= (props)=> {

    console.log(props);

    const {state,dispatch}= useContext(AppContext);

    const classes= useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedValue, setSelectedValue] = useState(null);

    const [openAlert, setOpenAlert] = useState(false);

    const [arrayItems,setArrayItems]= useState(props.items);

    const [isAddressOrVerifyUserOk, setIsAddressOrVerifyUserOk] = useState(false);

    const [openAlert2, setOpenAlert2] = useState(false);

    const handleOpenAlert2 = () => {
        setOpenAlert2(true);
    };

    const handleCloseAlert2 = () => {
        setOpenAlert2(false);
    };

    useEffect(()=>{
        if(state.auth.user && state.auth.user.address && state.auth.user.isUserVerified){
            const {locality, colony, city}=  state.auth.user.address;
            if(locality && colony && city)
                setIsAddressOrVerifyUserOk(true);
        }
    },[state.auth.user]);

    console.log(isAddressOrVerifyUserOk);

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      console.log(selectedValue);
    };

    const onSubmit= async(e)=>{
        e.preventDefault();
        console.log(props.amount);

        if(!isAddressOrVerifyUserOk)
            return setOpenAlert2(true);

        const formValues= {
            emailOfUser: state.auth.user.email,
            typeOfPayment: selectedValue,
            amount: props.amount,
            products: props.items.map((item)=>{
                return {
                    product: item._id,
                    quantity: item.quantity
                }
            }) 
        }

        try{

            var response;
            if(props.isCart)
                response= await axios.post(`/order/cart/${state.auth.user._id}`,formValues);
            else
                response= await axios.post(`/order/buyNow/${state.auth.user._id}`,formValues);

            dispatch(addOrder(response.data));
            dispatch(setCartItemNull());

            setOpenAlert(true);
            setArrayItems([]);
            for await (let item of props.items)
                dispatch(setStockQuantity(item._id,Number(item.stockQuantity)-Number(item.quantity)));
        }
        catch(e){
            alert('Error in Order');
        }
    }

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            <Paper>
                <Paper className={classes.paper}>
                    Order Summary
                </Paper>
                {
                    arrayItems.length!=0 && (
                        arrayItems.map((item,index)=>{
                            
                            return (
                                <React.Fragment key={index}>
                                    <br/>
                                    <CheckoutItem ob={item} key={index}/>
                                </React.Fragment>
                            );
                        })
                    )
                }

                <br/><hr/>

                <Box display="flex"  bgcolor="background.paper">
                    <Box p={1} flexGrow={1} style={{textAlign:'left',marginLeft:state.mobileView?'4vw':'6vw'}}>
                        <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>
                            <strong>Total Amount:</strong>
                        </h4>
                    </Box>
                    <Box style={{marginTop:'.5vh',marginRight:state.mobileView?'4vw':'8vw'}}>
                        <h3 style={{fontFamily: `'IBM Plex Serif',serif`}}>
                            <strong>₹{props.amount}</strong>
                        </h3>
                    </Box>
                </Box>

                <br/>

                <Paper className={classes.paper}>
                    Address
                </Paper>

                {
                    state.auth.isSignedIn && state.auth.user.address && (
                        <h4 style={{fontFamily: `'IBM Plex Serif',serif`}}>
                            {state.auth.user.address.locality?state.auth.user.address.locality:''}, 
                            {state.auth.user.address.colony?state.auth.user.address.colony:''}, 
                            {state.auth.user.address.city?state.auth.user.address.city:''}, 
                            {state.auth.user.address.pincode?state.auth.user.address.pincode:''} 
                        </h4>
                    )
                }

                <br/><br/>

                <Paper className={classes.paper}>
                    Pay Now
                </Paper>
                <br/>
                
                <form onSubmit={onSubmit}>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue === 'cash'}
                        onChange={handleChange}
                        value="cash"
                        name="payment"
                        color="primary"
                    />
                     <label>Cash on Delivery</label>

                    <Radio
                        className={classes.radio}
                        checked={selectedValue === 'online'}
                        onChange={handleChange}
                        value="online"
                        name="payment"
                        color="primary"
                    />
                     <label>Online using Razorpay</label>
                     <br/>

                    {
                        !openAlert && (
                            <>
                                <Button disabled={!selectedValue?true:false} onClick={handleOpen} variant="contained" color="primary">
                                    Proceed
                                </Button>
                                <Modal
                                    open={open} 
                                    handleOpen={handleOpen} 
                                    handleClose={handleClose}
                                    title= "Checkout"
                                    description={`Click Yes for order confirmation`}
                                    action={
                                     async(e)=>{
                                            await onSubmit(e);
                                            handleClose();
                                        }
                                    }
                                />
                            </>
                        )||

                        openAlert && (
                            <Alert severity="success">
                                Your order has been placed.
                            </Alert>
                        )
                    }
                </form>
                <br/>
            
            </Paper>
            <Alert2
                open={openAlert2}
                handleClose= {handleCloseAlert2}
                title= {`Order Confirmation Error Alert`}
                description={`Complete Your Details. Either email is not verified or Address is not filled completely.`}
                action = {
                    {
                    agree: handleCloseAlert2
                    }
                }
            />
        </div>
    );
}

export default Checkout;