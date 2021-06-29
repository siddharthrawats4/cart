import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import {AppContext} from '../AppContext';
 
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalUI = (props)=>{

   const {state,dispatch}= React.useContext(AppContext);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const body = (

    <div style={{width: state.mobileView?'76vw':'50vw',marginTop:'30vh',marginLeft:state.mobileView?'9vw':'23vw'}} className={classes.paper}>
        <h2 id="simple-modal-title">{props.title}</h2>
        <hr />
        <p id="simple-modal-description">
            {props.description}
        </p>
        <div style={{textAlign:'right'}}>
            <Button type="Submit" variant="contained" color="primary" onClick={props.action}>
                Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={props.handleClose} >
                No
            </Button>
        </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default ModalUI;