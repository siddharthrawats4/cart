import React,{useState,useContext, useEffect} from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';

import {AppContext} from "../AppContext";

const Carousel= ()=> {

    const {state, dispatch}=  useContext(AppContext);
  
    const [index,setIndex]= useState(0);

    useEffect(async()=>{
        if(state.carousels){
            const interval = setInterval(() => {
                setIndex(prev=>prev==data.length-1?0:prev+1)
            },5000)
        
            return () => {
                clearInterval(interval);
            };
        }
    },[state.carousels]);

    if(!state.carousels)
        return (
            <div style={{margin:'8vh'}}>
                <CircularProgress />
            </div>
        );

    const data= Object.values(state.carousels);

    return (
        <div>
            <ArrowBackIosIcon style={{position: 'absolute',marginTop:state.mobileView?'12vh':'20vh',cursor:'pointer'}} onClick={()=>setIndex(prev=>index==0?data.length-1:prev-1)} />
                <Link to={{pathname: "/showProducts",state: { selectedCategory: data[index].category}}}>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/carousel/photos/${data[index]._id}`} style={{width:state.mobileView?'100vw':'98.5vw',height: state.mobileView?'30vh':'45vh'}} />
                </Link>
            <ArrowForwardIosIcon style={{position: 'absolute',marginLeft:state.mobileView?'-6vw':'-2vw',marginTop:state.mobileView?'12vh':'20vh',cursor:'pointer'}} onClick={()=>setIndex(prev=>index==data.length-1?0:prev+1)}/>
        </div>
    );
}

export default Carousel;