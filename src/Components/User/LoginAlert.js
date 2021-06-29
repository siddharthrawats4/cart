import React,{useState, useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button' ;
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import clsx from "clsx";
import {addCartItem, auth, fetchCartItem, fetchOrders} from "../../actions/actions";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

import {AppContext} from '../../AppContext';
import axios from '../../axios';

const LoginAlert= (props)=>{

  const {state,dispatch}= useContext(AppContext);

  const [loadComplete,setLoadComplete]= useState(true);

  const [showPassword, setShowPassword]= useState(false);

  const onSubmit= async(e)=>{
    e.preventDefault();
    console.log(values);

    try{
        setLoadComplete(false);
        const response= await axios.post('/user/login',{email:values.email,password:values.password});
        props.setValidation({
          exist: true,
          type:'success',
          message:'Congrats.. You are Logged In'
        });
        dispatch(await auth(response.data,true));
        props.closeAlert();
        dispatch(await fetchCartItem(response.data.cart));
        dispatch(await fetchOrders(response.data.email));
        setLoadComplete(true);
    }
    catch(err){
        props.setValidation({
          exist: true,
          type:'error',
          message:"Email or Password doesn't match"
        });
        setLoadComplete(true);
    }
}
  const [values, setValues] = useState({
    email:'',
    password: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickHandlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    
  return (
    <form onSubmit={onSubmit}>         
        <TextField id="standard-secondary" label="Enter Email" value={values.email} style={{width: '226px'}} onChange={handleChange('email')} name="email" type="email" color="primary"> </TextField><br></br>
        <br/>
        <FormControl className={clsx(props.myClasses.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickHandlePassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
        </FormControl>
        <br></br>
        <br></br>
        {
          loadComplete && (
            <Button type="submit" variant="contained" color="primary" >                
                Sign In
            </Button>
          )||

          !loadComplete && (
            <div>
              Logging in...
            </div>
          )
      }
    </form>
  );
}

export default LoginAlert;