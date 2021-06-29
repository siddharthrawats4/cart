import React,{useState, useContext} from 'react';
import {useHistory,Link} from 'react-router-dom';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button' ;
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// import {addCartItem, auth, fetchCartItem} from "../../actions/actions";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {AppContext} from '../../AppContext';
import axios from '../../axios';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[0],
  },
});

const useStyles = makeStyles((theme) => ({

  textField: {
    width: '226px',
    paddingBottom: '1.5vh'
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(6.5),
    paddingRight: theme.spacing(6.5),
  },

}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);


const PasswordAlert = (props) =>{
    // console.log(props);
    const {state,dispatch}= useContext(AppContext);

    const [validation, setValidation]= useState(false);
  
    const [validationMessage, setValidationMessage]= useState("");
    
    const onSubmit= async(e)=>{
        e.preventDefault();
        //matching
        if(values.confirmPassword!==values.newPassword){
            console.log('Not matched');
            setValidation(true);
            setValidationMessage("Both new password doesn't match");
            return;
        }
        console.log(values.password);
        console.log(values.newPassword);
        console.log(state.auth.user.email);
        try{
            console.log('Matched');
            console.log(axios);
            const response= await axios.put('/user/editPass',{email: state.auth.user.email,password: values.password,newPassword: values.newPassword});
            console.log('after route');
            console.log(response);
            setValidation(false);
            setValidationMessage('');
            // setValues({values: ''});
            closeAlert();
        }
        catch(err){
            setValidation(true);
            setValidationMessage("Incorrect Password");
        }
    }

    const [showPassword, setShowPassword]= useState(false);

    const [values, setValues] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
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

    const myClasses = useStyles();
    
    const closeAlert = () => {
        props.handleClose();
        setValues({values: ''});
        setValidation(false);
    };

    return (
        <div >
            <Dialog onClose={closeAlert} aria-labelledby="customized-dialog-title" open={props.editalert}>
                <DialogTitle id="customized-dialog-title" onClose={closeAlert}>
                    Change Password
                </DialogTitle>
                <DialogContent dividers>
                <form onSubmit={onSubmit}>         
                    {
                    validation && (
                        <h6 style={{color:'red'}}>{validationMessage}</h6>
                    )
                    }
                        <TextField id="standard-secondary" label="Type Current Password" value={values.password} className={myClasses.textField} onChange={handleChange('password')} name="password" type="password"  color="primary"> </TextField><br></br>
                        <br></br>
                        <TextField id="standard-secondary" label="Type New Password" value={values.newPassword} className={myClasses.textField} onChange={handleChange('newPassword')} name="newPassword" type="password"  color="primary"> </TextField><br></br>
                        <br></br>
                        <FormControl className={myClasses.textField}>
                        <InputLabel htmlFor="standard-adornment-password">Retype New Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickHandlePassword}
                                        onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br></br>
                        <Button type="submit" variant="contained" color="primary">                
                            Save
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Typography  style={{cursor:'pointer' , marginRight: '2vh'}} onClick={closeAlert} color="green">
                        Cancel
                    </Typography>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PasswordAlert;