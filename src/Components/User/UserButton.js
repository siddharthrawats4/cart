import React,{useState,useContext} from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button as button, Dropdown, Menu } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';

import UserForm from './UserForm';

import {AppContext} from "../../AppContext";
import { auth, fetchCartItem, fetchOrders } from '../../actions/actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    login_desktop: {
        width:'100px',
        backgroundColor:'white',
        color: 'green',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    login_mobile:{
        fontSize: '10px',
        backgroundColor:'white',
        color: 'green',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    cart_desktop: {
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '30px'
    },
    cart_mobile:{
        cursor: 'pointer',
        marginLeft: "5vw",
        fontSize: '20px'
    }
  }),
);

const UserButton= ()=> {

    const {state,dispatch}=  useContext(AppContext);

    const history= useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(['name']);

    const [alertopen, setalertOpen] = useState(false);

    const handleAlertClickOpen = () => {
        console.log('Func invoked state open');
        setalertOpen(true);
    };
  
    const handleAlertClose = () => {
        console.log('Func invoked state close chng');
        setalertOpen(false);
    };

    const onClickLogoutHandler = async()=>{
        dispatch(await auth(null,false));
        dispatch(await fetchCartItem(null));
        dispatch(await fetchOrders(null));
        removeCookie('x-auth-token');
        removeCookie('user');
        console.log('hello');
    }

    const classes = useStyles();

    return (
        <div >
            {
                state.auth.isSignedIn && (
                    <div className={state.mobileView?classes.login_mobile:classes.login_desktop} >
                        <Menu size='small' style={{backgroundColor:'white',color:'blue',width:state.mobileView?'94px':'120px',borderRadius:'5px'}}>
                            <Dropdown item text='My Account' style={{fontSize:state.mobileView?'10px':'13px',color:'green',fontFamily:'sans-serif',fontWeight: 'bold'}}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>history.push('/profile')}>My Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>history.push('/orders')}>Orders</Dropdown.Item>
                                    <Dropdown.Item onClick={onClickLogoutHandler}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </div>
                )
            }
            {
                !state.auth.isSignedIn && (
                    <Button className={state.mobileView?classes.login_mobile:classes.login_desktop} variant="contained" color="primary" onClick={handleAlertClickOpen}>
                        <b style={{fontFamily:'sans-serif'}}>Login</b> 
                    </Button>
                )
            }  
            <UserForm handleClose={handleAlertClose} handleClickOpen={handleAlertClickOpen} alertopen={alertopen} />   
        </div>
    );
}

export default UserButton;