import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductsList from './pages/ProductsList';
import Orders from './pages/Orders';

import Navbar from './Components/Navbar';
import MenuBarDesktop from './Components/MenuBarDesktop';
import MenuBarMobile from './Components/MenuBarMobile';
import Footer from './Components/Footer';
import CheckoutError from './Components/CheckoutError';
import Alert2 from './Components/Alert2';

import MyProfile from './pages/MyProfile';

import {mobileView, fetchingCategories, fetchProducts, fetchCarousels, auth, fetchCartItem, fetchOrders, fetchProductsLimited} from './actions/actions';
import {AppContext} from './AppContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import axios from './axios';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2e7d32'
    },
    secondary: {
      main: '#00838e'
    }
  }
});

const App= ()=> {

  const {state,dispatch}= useContext(AppContext);

  const [open, setOpen] = useState(false);

  const [cookies, setCookie] = useCookies(['name']);

  const [screenWidth,setScreenWidth]= useState(window.innerWidth);

  useEffect(async()=>{
    console.log(screenWidth);
    if(window.innerWidth>560)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
    console.log(cookies);

    dispatch(await fetchCarousels());

    if(cookies['x-auth-token']){
      dispatch(auth(cookies['user'],true))
      dispatch(await fetchCartItem(cookies['user'].cart));
    }

    dispatch(await fetchProductsLimited());

    if(screenWidth>560){
      dispatch(await fetchingCategories());
      dispatch(await fetchProducts());
    }
    else{
      dispatch(await fetchProducts());
      dispatch(await fetchingCategories());
    }

    if(cookies['x-auth-token'])
      dispatch(await fetchOrders(cookies['user'].email));

  },[screenWidth]);

  console.log(state);

  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));

  const handleClickOpen = () => {
    console.log('open');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickVerify = async(e)=>{
    await axios.post('/mail/verify',{email: state.auth.user.email});
    handleClickOpen();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundColor: '#f0f5f1'}}>
        <Router>
          <Navbar />

          {
              !state.mobileView && (
                  <div style={{marginBottom:'1.5vh'}} />
              )
          }

          {
              state.auth.isSignedIn && state.auth.user && !state.auth.user.isUserVerified && (
                <Alert variant="filled" severity="warning">
                    Your Email is not Verified
                    <Button onClick={onClickVerify} style={{marginLeft: state.mobileView?'5vw':'10vw'}} variant="contained" color="white">
                        Verify
                    </Button>
                </Alert>
              )
          }
          {
            screenWidth<=560?<MenuBarMobile />:<MenuBarDesktop />
          }
          <Switch>
              <Route path="/"  exact component= {Home} />
              <Route path="/showProducts"  exact render={(props) => props.location.state?<ProductsList  selectedCategory={props.location.state.selectedCategory} />:<ProductsList />} />
              <Route path="/showProducts/:subCategoryId"  exact render={(props) => props.location.state?<ProductsList  selectedCategory={props.location.state.selectedCategory} />:<ProductsList />} />
              <Route path="/product/:id"  exact component= {ProductDetails} />
              <Route path="/product/:id"  exact component= {ProductDetails} />
              <Route path="/cart"  exact component= {Cart} />
              <Route path="/profile"  exact component= {MyProfile} />
              <Route path="/cart/checkout"  exact render={(props) =>!props.location.state || !state.auth.isSignedIn? <CheckoutError  />:<Checkout isCart={props.location.state.isCart} items={props.location.state.items} amount={props.location.state.amount} />} />
              <Route path="/orders"  exact component={Orders} />
          </Switch>
          <Footer />
        </Router>  
      </div>
      <Alert2
          open={open}
          handleClose= {handleClose}
          title= {`Email Verification`}
          description={`An email has been sent to you for verification.`}
          action = {
            {
              agree: handleClose
            }
          }
      />
    </ThemeProvider>
  );
}

export default App;