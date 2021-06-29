import React,{useContext,useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from '../AppContext';
import _ from 'lodash';

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

const CheckoutError= (props)=>{

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    return (
        <div style={{marginTop:'3vh',marginBottom:'3vh',marginLeft:'10vw',marginRight:'10vw'}}>
            <Paper className={classes.paper}>
                Token Not Available
            </Paper>
        </div>
    );
}

export default CheckoutError;