import React,{useState,useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Carousel from '../Components/Carousel';
import Offers from '../Components/Offers';
import ProductBox from '../Components/ProductBox';
import {homeData} from '../helpers/homeData';
import axios from '../axios';
import {AppContext} from '../AppContext';

const useStyles = makeStyles({
   
});

const data= homeData();

const Home= ()=> {

  const classes = useStyles();

  const {state,dispatch}= useContext(AppContext);

  const [offers,setOffers]= useState([]);

  useEffect(async()=>{
    const response= await axios.get('/offer');
    console.log(response.data);
    setOffers(response.data);

  },[]);

  var index= -1;

  return (
    <div>
        <Carousel />
        <br/><br />

        {
          data.map((ob,key)=>{
            index= index+1;
            return (
              <div key={key} >
                <Paper elevation={3} style={{paddingTop:'1vh'}}>
                  <ProductBox name={ob.name} />
                </Paper>

                <br/><br/>
        
                {
                  index%2==0 && offers.length>index/2 && (
                    <>
                      <Offers offer={offers[index/2]} />
                      <br/>
                    </>
                  )
                }
                
                <br/>

              </div>
            )
          })
        }

    </div>
  );
}

export default Home;