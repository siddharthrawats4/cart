import React,{useState,useContext, useRef,useEffect} from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import UserButton from './User/UserButton';
import axios from '../axios';
import {AppContext} from "../AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    search: {
        backgroundColor: '#white',
        fontSize: '15px',
        fontFamily: `'IBM Plex Serif',serif`,
        color: "black",
        height: "40px",
        width: "28vw",
        marginLeft: '-95vw',
        border: '2px',
        outline: 'none',
        '&::placeholder': {
            color:'grey',
            opacity: 0.5
        }
    },
    personIcon_desktop: {
        cursor: 'pointer',
        marginLeft: "20vw",
        fontSize: '10px'
    },
    personIcon_mobile:{
        marginLeft: "5vw",
        fontSize: '20px'
    },
    userButton_mobile:{
        marginLeft: "35vw",
    },
    userButton_desktop:{
        marginLeft: "10vw",
    },
    logo_desktop:{
        border:'2px white solid',
        borderRadius:'40px',
        width:'57px',
        height:'55px'
    },
    logo_mobile:{
        border:'2px white solid',
        borderRadius:'40px',
        marginLeft: '10vw',
        width:'50px',
        height:'50px'  
    },
    cart_desktop: {
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '30px'
    },
    cart_mobile:{
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '4vh'
    },
    lock:{
        cursor: 'pointer',
        fontSize: '15px',
        marginTop:'2vh'
    },
    searchUl:{
        margin:'0',
        padding:'0',
        zIndex:'2',
        position:'absolute',
        textAlign:'left',
        listStyleType:'none',
        backgroundColor:'white',
        display:'block',
        left:'0',
        right:'0',
        border: '1px solid #cecece'
    },
    searchLi:{
        padding:'1vh',
        fontFamily: `'IBM Plex Serif',serif`,
        color:'black',
        "&:hover":{
            backgroundColor:'#f0f5f1'
        }
    }
  })
);

const Navbar= ()=> {

    const classes = useStyles();

    const ref= useRef();

    const {state,dispatch}=  useContext(AppContext);

    const history= useHistory();

    const [text,setText]= useState('');
    const [val,setVal]= useState(0);

    const [searchArray,setSearchArray]= useState([]);

    useEffect(async()=>{
        var x=0;
        await Object.values(state.cart).map((item)=>{
            x= x+parseInt(item.quantity)
        });
        setVal(x);

        document.addEventListener("mousedown", handleClickOutside);
    },[state.cart]);

    const onInputChange= async(e)=>{
        console.log(e.target.value);
        setText(e.target.value)
        const response = await axios.get('/product/search',{params:{name:e.target.value}});
        if(e.target.value=='')
            setSearchArray([]);
        else
            setSearchArray(response.data);
    }

    const searchBlock= ()=>{
        if(searchArray.length==0)
            return;
        
        return (
            <ul className={classes.searchUl} ref={ref} style={{marginLeft:state.mobileView?'4vw':'27.8vw',marginRight:state.mobileView?'2.5vw':'43vw'}}>
                {
                    searchArray.map((product,key)=>{
                        return (
                            <Link to={`/product/${product._id}`} key={key} onClick={()=>setSearchArray([])}>
                                <li className={classes.searchLi}>
                                    {product.name} 
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        );
    }

    const handleClickOutside = (event)=>{
        console.log(event.target,ref);
        if (!ref.current || !ref.current.contains(event.target))
            setSearchArray([]);
    }

    return (
        <div >
            <AppBar style={{height:state.mobileView?'auto':'10vh'}} color="primary" position={state.mobileView?"static":"fixed"}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={{ width: '100%' }}>
                                <Box display="flex" p={1} >
                                    <Box p={1} flexGrow={1}>
                                        <IconButton  style={{marginLeft: state.mobileView?'-27vw':'-35vw'}} edge="start" color="inherit">
                                            <Link to='/'>
                                                <img src="/images/logo.jpg" className={state.mobileView?classes.logo_mobile:classes.logo_desktop}/>
                                            </Link>
                                        </IconButton>
                                    </Box>
                                    <Box p={1} flexShrink={0} style={{marginLeft:'25vw',marginTop:'3vh'}}>
                                        <Grid container>
                                            <Grid item>
                                                {
                                                    !state.mobileView && (
                                                        <>
                                                            <input className={classes.search} autoComplete="off"  placeholder="Search for Products" name="search" id="search" value={text} onChange={onInputChange}/>
                                                            {searchBlock()}
                                                        </>
                                                    )
                                                }
                                            </Grid>
                                            <Grid item style={{marginLeft: '-12vw'}}>
                                                <UserButton />
                                            </Grid>
                                            <Grid item>
                                                <ShoppingCartOutlinedIcon className={state.mobileView?classes.cart_mobile:classes.cart_desktop} onClick={()=>history.push('/cart')} />
                                                {
                                                    !state.auth.isSignedIn && (
                                                        <LockOutlinedIcon className={classes.lock} onClick={()=>history.push('/cart')} />
                                                    )||

                                                    state.auth.isSignedIn && (
                                                        <>{val}</>
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </div>
                        </Grid>
                        <Grid item>
                            
                            {
                                state.mobileView && (
                                    <div style={{marginTop:'-2vh',marginBottom:'2vh'}}> 
                                        <input autoComplete="off" style={{border:'1px solid black',borderRadius:'5px',width:'93vw',height:'6vh'}} placeholder="search" name="search" id="search" value={text} onChange={onInputChange}/>
                                        {searchBlock()}
                                    </div>
                                )
                            }    
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                !state.mobileView && (
                    <div className={classes.offset} />
                )
            }
        </div>
    );
}

export default Navbar;