import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AppContext} from '../AppContext';

import axios from '../axios';
const useStyles = ({mobileView})=>{
    return (
        makeStyles({
            menuHeader:{
                textAlign: 'left',
                marginBottom:'1vh',
                width: '110vw',
                height: '11vh',
                background: 'white',
                borderBottom: '1px solid #cecece',
                marginLeft:'-10vw',
                "& ul > a":{
                    color:'black'
                },
                "& .menu-item-wrapper.active" :{
                    border: 'none'
                },
                "& .menu-item-wrapper:hover" :{
                    border: 'none'
                }
            },
            image:{
                width:'15vw',
                height:'5vh'
            }
        })
    )
}


const MenuBar = ()=>  {

    const {state,dispatch}= useContext(AppContext);

    const classes = useStyles(state)();

    const [data,setData]= useState(null);

    useEffect(async()=>{
        const response= await axios.get('/category/only');
        setData(response.data);
    },[])

    if(!data)
        return (
            <div style={{margin:'3vh'}}>
                <CircularProgress />
            </div>
        );

    return (
        <div className={classes.menuHeader}>
            <div style={{width:state.mobileView?'133vw':'106vw',marginLeft:state.mobileView?'-36vw':'-4.8vw'}} ></div>
            <ScrollMenu
                data={data.map((category,index)=>{
                    return (
                        <ul key={index} style={{border:'none'}}> 
                            <Link to={{pathname: "/showProducts",state: { selectedCategory: category._id}}}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/category/photos/${category._id}/0`} className={classes.image} />
                                <br/>
                                {category.name}
                            </Link>
                        </ul>
                    )
                })}
                selected={'hi'}
                onSelect={(x)=>console.log(x)}
            />
        </div>
    );
}

export default MenuBar;