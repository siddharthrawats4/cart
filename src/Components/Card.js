import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {AppContext} from '../AppContext';

const useStyles = makeStyles({
  rootDesktop: {
    width: '20vw',
    height: '35vh',
    padding:'2px',
    margin:'1vh',
    textAlign:'center'
  },
  rootMobile: {
    width: '80vw',
    height: '40vh',
    padding:'2px',
    margin:'1vh'
  },
  cardDesktop:{
    width:'20vw',
    height:'20vh'
  },
  cardMobile:{
    width:'80vw',
    height:'22vh'
  }
});

const Cards= ({product})=> {

  const {state,dispatch} = useContext(AppContext);

  const classes = useStyles();

  if(!state)
    <>Loading...</>

  console.log(state.mobileView);

  return (
    <Card className={state.mobileView?classes.rootMobile:classes.rootDesktop} >
      <CardActionArea>
        <CardMedia
          className={state.mobileView?classes.cardMobile:classes.cardDesktop}
          image={`${process.env.REACT_APP_BACKEND_URL}/product/photos/${product._id}/0`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Cards;
