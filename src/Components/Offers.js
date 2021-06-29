import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    boxImage:{
       width: '32vw',
       height: '31vh'
    },
    boxImageMobile:{
        width: '31vw',
        height: '13vh'
    }
}));


const Offers= ({offer})=>{

    const {state, dispatch}= useContext(AppContext);

    const classes= useStyles();

    return (
        <Grid container  spacing={0} style={{backgroundColor: '#f0f3f7'}}>
            <Grid item xs={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <Link to={{pathname: `/showProducts/${offer.photo[0].subCategory._id}`,state: { selectedCategory: offer.photo[0].subCategory.parent}}}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/offer/photos/${offer._id}/0`} className={state.mobileView?classes.boxImageMobile:classes.boxImage}/> 
                    </Link>
                </Paper>    
            </Grid>
            <Grid item sm={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <Link to={{pathname: `/showProducts/${offer.photo[1].subCategory._id}`,state: { selectedCategory: offer.photo[1].subCategory.parent}}}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/offer/photos/${offer._id}/1`} className={state.mobileView?classes.boxImageMobile:classes.boxImage}/> 
                    </Link>
                </Paper>
            </Grid>
            <Grid item sm={4}>
                <Paper elevation={3} style={{padding: '0.5vh'}}>
                    <Link to={{pathname: `/showProducts/${offer.photo[2].subCategory._id}`,state: { selectedCategory: offer.photo[2].subCategory.parent}}}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/offer/photos/${offer._id}/2`}  className={state.mobileView?classes.boxImageMobile:classes.boxImage}/>  
                    </Link>
                </Paper>    
            </Grid>
        </Grid>
    );
}

export default Offers;