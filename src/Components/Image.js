import React,{useState,useContext} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from "../AppContext";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    mainBox:{
        width:'40vw',
        height:'65vh',
        border:'1px solid white',
        backgroundColor: 'white'
    },
    mainBoxMobile:{
        width:'90vw',
        height:'45vh',
        border:'1px solid white',
        backgroundColor: 'white'
    },
    box:{
        width:'45px',
        height:'45px',
        border:'1px solid black',
        backgroundColor: 'white',
        cursor:'pointer',
        "&:hover ":{
            border:'2px solid #2971d6',
            width:'47px',
            height:'47px',
        }
    },
    boxImage:{
        width:'40px',
        height:'40px',
        marginTop:'2px',
        "&:hover":{
            width:'42px',
            height:'41px',
        }
    }
}));


const Image= (props)=>{
    const {state, dispatch}= useContext(AppContext);

    const params=useParams();

    console.log(params.id);

    const classes = useStyles();

    const [index,setIndex]= useState(0);

    return (
        <div className={state.mobileView?classes.mainBoxMobile:classes.mainBox}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Grid container spacing={3} direction="column"> 
                        <Grid item sm={2}>
                            <div className={classes.box} onMouseOver={()=>setIndex(0)}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.product._id}/0`} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onMouseOver={()=>setIndex(1)}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.product._id}/1`} className={classes.boxImage}/> 
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onMouseOver={()=>setIndex(2)}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.product._id}/2`} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.box} onMouseOver={()=>setIndex(3)}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.product._id}/3`} className={classes.boxImage}/> 
                            </div>    
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${props.product._id}/${index}`} style={{width:state.mobileView?'70vw':'30vw',height:state.mobileView?'40vh':'60vh',marginTop:'2vh'}}/>     
                </Grid>
            </Grid>
        </div>
    )
}

export default Image;