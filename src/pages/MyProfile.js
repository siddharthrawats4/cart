import React,{useState,useContext, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PasswordAlert from '../Components/User/PasswordAlert';
import {AppContext} from "../AppContext";
import TextField from '@material-ui/core/TextField';
import axios from '../axios';
import {profile} from "../actions/actions";
import { propertyOf } from 'lodash';
import { useCookies } from 'react-cookie';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';

const useStyles = makeStyles({
    ppr_desk: {
        left: 0,
        right: 0,
        marginLeft:'14vw',
        marginRight: '14vw',
        paddingBottom:'4vh',
        paddingTop:'4vh'
    },
    ppr_mobile: {
        left: 0,
        right: 0,
        maxWidth: '100vw',
        marginLeft:'1vw',
        marginRight: '1vw',
        paddingBottom:'4vh',
        paddingTop:'5vh'
    },
    start_desk: {
        textAlign: 'left', 
        marginLeft: '8vw'
    },
    start_mobile: {
        marginLeft: '-4vw'
    },
    txt_desk: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#009933',
        marginLeft: '10.5vw',
        padding: '1vw'
    },
    txt_mobile: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#009933',
        padding: '-1vh'
    },
    btn_desk: {
        paddingLeft: '2.5vw',
        paddingRight: '2.5vw',
        paddingTop: '1.7vh',
        paddingBottom: '1.6vh',
        marginLeft: '3vw',
        fontSize: '14px',
        color: 'white'
    },
    btn_mobile: {
        marginLeft: '2vw',
        marginTop: '1.4vh',
        fontSize: '12px',
        color: 'white'
    },
    adjust_desk: {
        textAlign: 'left' ,
        marginLeft: '21vw' ,
        marginTop: '-5vh'
    },
    nouse_desk:{
        width: '25vw',
        backgroundColor: '#f0f5f1'
    },
    nouse_mobile:{
        backgroundColor: '#f0f5f1',
        marginTop: '-.15vh'
    },
    field_desk: {
        width: '25vw',
    }
});

const MyProfile = ()=> {
    const {state,dispatch}= useContext(AppContext);
    const classes = useStyles();

    const [permit1,setpermit1]= useState(false);
    const [permit3,setpermit3]= useState(false);
    const [permit4,setpermit4]= useState(false);
    const [editalert, setEditAlert] = useState(false);
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        contact: '',
        colony: '',
        locality: '',
        city: '',
        pincode: '',
    });
    const [cookies, setCookie] = useCookies(['name']);
    
    useEffect(()=>{
        if(state.auth.isSignedIn){
            setValues({
                name: state.auth.user.name,
                email: state.auth.user.email,
                contact: state.auth.user.contact,
                colony: state.auth.user.address?state.auth.user.address.colony: '',
                locality: state.auth.user.address?state.auth.user.address.locality: '',
                city: state.auth.user.address?state.auth.user.address.city: '',
                pincode: state.auth.user.address?state.auth.user.address.pincode: '',
            });
        }
    } , [state.auth.isSignedIn]);

    const onSubmit = (prop,a,b,c) => async(e) => {
        e.preventDefault();
        setpermit1(false);
        setpermit3(false);
        setpermit4(false);

        const data={} ;
        data[prop] = e.target[0].value;
        //If address form hits
        if(e.target[2].value){
            data[a] = e.target[2].value;
            data[b] = e.target[4].value;
            data[c] = e.target[6].value;
        }
        try{
            const response = await axios.patch(`/user/profile/${state.auth.user._id}`, e.target[2].value ? {address : data} : data);
            dispatch(await profile(response.data));
            setCookie('user', { ...cookies['user'] , ...response.data })
        }
        catch(err){
            console.log('Error');
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleAlertClickOpen = () => {
        setEditAlert(true);
    };
 
    const handleAlertClose = () => {
        setEditAlert(false);
    };

    if(!state.auth.isSignedIn) 
        return (
            <div>
                <Paper elevation={1} style={{width:state.mobileView?'95vw':'' , paddingTop: '1vh'}} >
                <h2 style={{fontFamily: `'IBM Plex Serif',serif` }}>My Profile</h2>
                <br></br>
                <h3>Please login to view your Profile </h3>
                <PersonSharpIcon style={{ fontSize: 150 }}></PersonSharpIcon>
                <br></br>
                <br></br>
                </Paper>
            </div>
        );

    return (
        <Paper className={state.mobileView ? classes.ppr_mobile : classes.ppr_desk} >
            <h2>Personal Information</h2>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Enter Name</h3>
            {
                !permit1 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit1(true)}}>Add / Edit</h4 >
                        <div style={{marginLeft: '5vw'}} className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={handleAlertClickOpen}><b>Change password</b></div> 
                        <br></br>
                        <TextField
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            disabled
                            margin= {state.mobileView ? "dense" : ""}   
                            id="outlined-disabled"
                            defaultValue=""
                            value={values.name ? values.name : 'Enter Full Name' } 
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit1 && (
                    <form onSubmit={onSubmit('name')} className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}> 
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk } onClick={()=> {setpermit1(false); values.name = state.auth.user.name}}>Cancel</h4 >
                        <br></br>
                        <TextField
                            value={values.name ? values.name : '' } 
                            label={values.name ? '' : 'Enter Full Name'}
                            onChange={handleChange('name')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}
                            margin= {state.mobileView ? "dense" : ""}   
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <Button type="submit" className={state.mobileView ? classes.btn_mobile : classes.btn_desk}  variant="contained" color="primary" >
                            Save
                        </Button>
                    </form>
                )
            } 
            <PasswordAlert handleClose={handleAlertClose} handleClickOpen={handleAlertClickOpen} editalert={editalert} />   
            
            <br></br>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Mobile Number</h3>
            {
                !permit4 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit4(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            disabled
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            margin= {state.mobileView ? "dense" : ""}      
                            id="outlined-disabled"
                            value={values.contact ? values.contact : 'Enter Mobile Name' } 
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) || 

                permit4 && (
                    <form onSubmit={onSubmit('contact')} className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit4(false); values.contact = state.auth.user.contact }}>Cancel</h4 >
                        <br></br>
                        <TextField
                            value={values.contact ? values.contact : '' } 
                            label={values.contact ? '' : 'Enter Contact Number'}
                            onChange={handleChange('contact')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}    
                            margin= {state.mobileView ? "dense" : ""}      
                            label="Enter Mobile Number"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <Button type="submit" className={state.mobileView ? classes.btn_mobile : classes.btn_desk} variant="contained" color="primary" >
                            Save
                        </Button>                  
                    </form>
                )
            }
            <br></br>
            <h3 className={state.mobileView ? classes.start_mobile : classes.start_desk}>Delivery Address</h3>
            {
                !permit3 && (
                    <div className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} onClick={()=> {setpermit3(true)}}>Edit</h4 >
                        <br></br>
                        <TextField
                            disabled
                            value={values.colony ? values.colony + " , " + values.locality  : 'Enter your Address' } 
                            className={state.mobileView ? classes.nouse_mobile : classes.nouse_desk}
                            margin= {state.mobileView ? "dense" : ""}      
                            id="outlined-disabled"
                            defaultValue=""
                            variant="outlined"
                        />
                    </div>
                ) ||

                permit3 && (
                    <form onSubmit={onSubmit('colony','locality','city','pincode')} className={state.mobileView ? classes.adjust_mobile : classes.adjust_desk}>
                        <h4 className={state.mobileView ? classes.txt_mobile : classes.txt_desk} 
                            onClick={()=> { 
                                setpermit3(false);
                                values.colony = state.auth.user.address?state.auth.user.address.colony: '' ;
                                values.locality = state.auth.user.address?state.auth.user.address.locality: '' ;
                                values.city = state.auth.user.address?state.auth.user.address.city: '' ;
                                values.pincode = state.auth.user.address?state.auth.user.address.pincode: '' ;

                            }} >Cancel</h4 >
                        <br></br>
                        <TextField
                            value={values.colony ? values.colony: '' } 
                            label={values.colony ? '' : 'Colony'}
                            onChange={handleChange('colony')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}       
                            margin= {state.mobileView ? "dense" : ""}      
                            label="House No. / Colony"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            value={values.locality ? values.locality : '' } 
                            label={values.locality ? '' : 'Locality'}
                            onChange={handleChange('locality')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}       
                            margin= {state.mobileView ? "dense" : ""}      
                            label="Locality/Landmark"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            value={values.city ? values.city : '' } 
                            label={values.city ? '' : 'City'}
                            onChange={handleChange('city')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}       
                            margin= {state.mobileView ? "dense" : ""}      
                            label="City Name"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            value={values.pincode ? values.pincode : '' } 
                            label={values.pincode ? '' : 'Pincode'}
                            onChange={handleChange('pincode')}
                            className={state.mobileView ? classes.field_mobile : classes.field_desk}
                            margin= {state.mobileView ? "dense" : ""}   
                            label="Enter Pincode"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            required
                        />
                        <Button type="submit" className={state.mobileView ? classes.btn_mobile : classes.btn_desk}  variant="contained" color="primary" >
                            Save
                        </Button>
                    </form>
                )
            }
            <br ></br>
            <h3 style={{textAlign: 'left' , margin: '5vh'}}>FAQs</h3>
            <div style={{textAlign: 'left' , margin: '5vh'}}>
                <h4> What happens when I update my email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</div>

                <h4>When will my account be updated with the new email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</div>

                <h4>What happens to my existing account when I update my email address (or mobile number)?</h4>
                <div style={{ marginLeft: '3vh'}}>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</div>

                <h4>Does my Seller account get affected when I update my email address?</h4>
                <div style={{ marginLeft: '3vh'}}>It has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</div>
            </div>

        </Paper>
    );
}

export default MyProfile;