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
import Alert from '@material-ui/lab/Alert';

import LoginAlert from './LoginAlert';
import SignUpAlert from './SignUpAlert';

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
    padding: theme.spacing(7),
  },

}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const UserForm= (props) =>{

    const myClasses = useStyles();
    
    const [openLogin,setOpenLogin]= useState(true);

    const [validation,setValidation]= useState({
      exist: false,
      type: null,
      message: ''
    });


    const closeAlert = () => {
        props.handleClose();
        setTimeout(()=> setOpenLogin(true) , 100);
        setValidation({
          exist: false,
          type:null,
          message:''
        });
    };
    
    return (
        <div >
            <Dialog onClose={closeAlert} aria-labelledby="customized-dialog-title" open={props.alertopen}>
                <DialogTitle id="customized-dialog-title" onClose={closeAlert}>
                    {openLogin?'Login':'Sign Up'}
                </DialogTitle>
        
                <DialogContent dividers>

                    {
                      validation.exist && (
                        <Alert severity={validation.type}>{validation.message}</Alert>
                      )
                    }

                    <br/>

                    {
                        openLogin && (
                            <LoginAlert type="Sign In" myClasses={myClasses} closeAlert={closeAlert} setValidation={setValidation}/>
                        ) || 

                        !openLogin && (
                            <SignUpAlert type="Sign Up"  myClasses={myClasses} closeAlert={closeAlert} setOpenLogin={setOpenLogin} setValidation={setValidation} />
                        )
                    }
                </DialogContent>

                <DialogActions>
                    {
                        openLogin && (
                            <>
                                <Typography autoFocus onClick={closeAlert} color="primary">
                                    New to website ?
                                </Typography>
                                <p style={{cursor:'pointer'}} onClick={()=>setOpenLogin(false)}> Sign Up</p>
                            </>
                        ) ||

                        !openLogin && (
                            <>
                              <Typography autoFocus onClick={closeAlert} color="primary">
                                    Already have an account ?
                                </Typography>
                              <p style={{cursor:'pointer'}} onClick={()=>setOpenLogin(true)}> Log In</p>
                            </>
                        )
                    }
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserForm;