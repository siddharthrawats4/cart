import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import shuffle from 'shuffle-array';

import { makeStyles } from '@material-ui/core/styles';

import {AppContext} from "../AppContext";
import axios from '../axios';

const useStyles = makeStyles({
    rootDesktop: {
      width: '15vw',
      height: '30vh',
      padding:'2px',
      margin:'1vh',
      textAlign:'center'
    },
    rootMobile: {
      width: '60vw',
      height: '32vh',
      padding:'2px',
      margin:'1vh'
    },
    cardDesktop:{
      width:'15vw',
      height:'20vh'
    },
    cardMobile:{
      width:'80vw',
      height:'22vh'
    }
  });


const ProductBox= ({name})=>{

    const {state, dispatch}= useContext(AppContext);

    const classes= useStyles();

    const [data,setData]= useState(null);

    useEffect(async()=>{
        if(state.products)
            setData(Object.values(state.products));
        else if(state.productsLimited)
            setData(state.productsLimited);
    
    },[state.products,state.productsLimited])

    if(!data)
        return (
            <div style={{padding:'10vh'}}>
                Loading...
            </div>
        );

    return (
        <>
            <div style={{ width: '100%' }}>
                <Box display="flex"  bgcolor="background.paper">
                    <Box p={1} flexGrow={1} style={{textAlign: 'left'}}>
                    <h2 style={{fontFamily: `'IBM Plex Serif',serif`}}><strong>{name}</strong></h2>
                    </Box>
                    <Box style={{textAlign:'right',marginRight:'.5vw'}}>
                        <Link to={{pathname: "/showProducts",state: { selectedCategory: null}}} >
                            <Button  variant="contained" color="primary">View All</Button>
                        </Link>
                    </Box>
                </Box>
                </div>
                <hr/>
                <div style={{width:state.mobileView?'133vw':'110vw',marginLeft:state.mobileView?'-36vw':'-7vw'}} >
                <ScrollMenu
                    data={shuffle.pick(Object.values(data), {'picks': 10 }).map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index}> 
                            <Card className={state.mobileView?classes.rootMobile:classes.rootDesktop} >
                                <div style={{textAlign:'center'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            className={state.mobileView?classes.cardMobile:classes.cardDesktop}
                                            image={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${product._id}/0`}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                        <Typography  component="h2">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Extra {product.discount} % off <br></br></strong>
                                            ₹{product.price}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </div>
                            </Card>
                        </Link>
                    ))}    
                />
            </div>
        </>
    );
}

export default ProductBox;