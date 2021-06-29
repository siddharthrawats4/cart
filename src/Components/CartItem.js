import React,{useContext,useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';
import {editCartItem, deleteCartItem} from '../actions/actions';
import Modal from '../Components/Modal';
import _ from 'lodash'

const useStyles = makeStyles({
    description:{
        display: '-webkit-box',
        maxWidth: '80vw',
        '-webkitLineClamp': '3',
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden'
    }
});

const CartItem= (props)=>{

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [loadCompleted,setLoadCompeleted]= useState(true);

    const [arr,setArr]= useState([]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        var z=[];
        Object.values(state.cart).map((item)=>{
            z.push({productId:item._id,quantity:item.quantity});
        });
        setArr(z);
    },[]);

    const onClick= async(id,val)=>{

        console.log(id);
        console.log(val);

        if(val==0){
            handleOpen();
            return;
        }

        await setArr(prev=>{
            prev[_.findIndex(arr, ['productId', id])].quantity=val;
            return prev;
        });

        const formValues= {
            product:arr
        }

        setLoadCompeleted(false);
        dispatch(await editCartItem(id,val,state.auth.user,formValues));
        setLoadCompeleted(true);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={3} style={{marginTop:state.mobileView?'4vh':'2vh'}}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.ob._id}/0`} style={{width:state.mobileView?'15vw':'60px',height:state.mobileView?'12vh':'80px'}}/>
            </Grid>
            <Grid item xs={7}>
                <h4 style={{fontFamily: `'IBM Plex Serif',serif`,display:'inline'}}>
                    {props.ob.name} (
                    <h6 style={{display:'inline'}}>
                         <del> ₹{props.ob.price}</del> 
                    </h6>
                    &nbsp; ₹{props.ob.price-Math.trunc(props.ob.discount/100*props.ob.price)}
                    )
                </h4>
                
                <h5 className={classes.description} style={{fontFamily: `'IBM Plex Serif',serif`}}>{props.ob.description}</h5>
            </Grid>
            <Grid item xs={2}>
                <div style={{marginTop:'7vh'}}>
                    {
                        Number(props.ob.stockQuantity)==0 && (
                            <>
                                Out of Stock
                            </>
                        )||

                        !loadCompleted && (
                            <CircularProgress size={30}/>
                        )||

                        loadCompleted && (
                            <>
                                <div style={{width:'20px',height:'20px',color:'black',border:'1px solid black',marginLeft:state.mobileView?'':'30px'}}>
                                    {props.ob.quantity}
                                </div>
                                <Grid container spacing={0} style={{marginLeft:state.mobileView?'0px':'20px'}}>
                                    <Grid item>
                                        <button style={{width:'22px'}} disabled={(Number(props.ob.stockQuantity)-Number(props.ob.quantity))>0?false:true} onClick={async()=>await onClick(props.ob._id,parseInt(props.ob.quantity)+1)}>+</button>
                                    </Grid>
                                    <Grid item>
                                        <button style={{width:'22px'}} onClick={async()=>await onClick(props.ob._id,parseInt(props.ob.quantity)-1)}>-</button>
                                    </Grid>
                                </Grid>
                            </>   
                        )
                    }
                </div>
            </Grid>
            <Modal
                id={props.ob._id} 
                open={open} 
                handleOpen={handleOpen} 
                handleClose={handleClose}
                title= "My Cart"
                description= "Are you sure you want to remove the item from the cart?"
                action={
                    async()=>{
                        dispatch(await deleteCartItem(state.auth.user.cart,props.ob._id));
                        handleClose();
                    }
                } 
            />
        </Grid>
    )
}

export default CartItem;