import React,{useContext,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import CopyrightIcon from '@material-ui/icons/Copyright';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#eeeee4',
    transition: 'height 4s'
  },
  copyright:{

  }
}));

const Footer = ()=> {

    const {state,dispatch}= useContext(AppContext);

    const [openFooter,setOpenFooter]= useState(false);

    const classes = useStyles();

    const show= ()=>{
      if(!openFooter)
        return  <ArrowDropDownRoundedIcon fontSize="large" onClick={()=>setOpenFooter(true)}/>

    return (
        <>
            <ArrowDropUpRoundedIcon fontSize="large" onClick={()=>setOpenFooter(false)}/>
            <Grid container spacing={3}>  
                <Grid item xs={3}>
                    <FacebookIcon fontSize="large"/>     
                </Grid>
                <Grid item xs={3} sm={3}>
                    <TwitterIcon fontSize="large"/>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <InstagramIcon fontSize="large"/>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <GitHubIcon fontSize="large"/>
                </Grid>
            </Grid>

            <div className={classes.copyright}>
                <CopyrightIcon fontSize="small" />
                <h5 style={{fontStylemargin:'none'}}>
                    All rights reserved,2021
                </h5>
            </div>
        </>
    )
  }

  return (
    <div className={classes.root}>
        <Paper style={{height: openFooter?'150px':'10px',transition:'height 1s'}} className={classes.paper}>
            {show()}
        </Paper>
    </div>
  );
}

export default Footer;