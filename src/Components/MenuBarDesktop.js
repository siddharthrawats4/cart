import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {AppContext} from '../AppContext';
import {categoriesData} from '../helpers/categoriesData';

const useStyles = ({mobileView})=>{
    return (
        makeStyles({
            menuHeader:{
                textAlign: 'left',
                marginBottom:'2vh',
                width: '100vw',
                height: '12vh',
                background: 'white',
                borderBottom: '1px solid #cecece',
                "& ul": {
                    listStyle:'none',
                    margin: '0',
                    padding: '0'
                },
                "& > ul": {
                    display:'flex',
                    margin: '0 6vh',
                    position:'relative'
                },
                "& > ul > li > span":{
                    display: 'block',
                    width:'10vw',
                    lineHeight: '3vh',
                    cursor:'pointer', 
                    padding:'0 2vh',
                    fontSize: mobileView?'6px':'1vw',
                },
                "& > ul > li > span:hover":{
                    color: '#2874f0'
                },
                "& > ul > li > ul":{
                    position: 'absolute',
                    background: 'white',
                    left: '0',
                    right: '0',
                    display:'none',
                    border: '1px solid #cecece' ,
                    zIndex: '1'  
                },
                "& > ul > li:hover ul":{
                    display:'block'
                },  
                "& > ul > li > ul > li":{
                    margin: '0 20px',
                    minWidth:'150px',
                    float:'left'
                },
                "& > ul > li > ul > li > a":{
                    fontWeight: 'bold',
                    display:'block',
                },
                "& > ul > li > ul > li a":{
                    display:'block',
                    margin: '10px',
                    fontSize:'12px',
                    textDecoration:'none',
                    color:'#707070 '     
                }
            },
            image:{
                width:'6vw',
                height: '6.5vh',
                marginTop:'1.5vh'
            }
        })
    )
}

const MenuBar = ()=>  {

    const {state,dispatch}= useContext(AppContext);

    const classes = useStyles(state)();

    const Category= ({category,flag})=>{

        const  [upArrow,setUpArrow]=  useState(false);

        return (
            <li>
                {
                    !flag?(
                        <Link to={category.price?`/product/${category._id}`:{pathname: `/showProducts/${category._id}`,state: { selectedCategory: category.parent}}}>
                            {category.name }
                        </Link>
                    ):(
                        <span onMouseOver={()=>setUpArrow(true)} onMouseOut={()=>setUpArrow(false)}>
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/category/photos/${category._id}/0`} className={classes.image} />
                            <br/>
                            {category.name }
                            {
                                !state.mobileView && !upArrow && (
                                    <React.Fragment style={{marginTop:'10px'}}>
                                        <ExpandMoreIcon style={{marginTop:'10px!important'}} fontSize="small" />
                                    </React.Fragment>
                                )||
                                !state.mobileView && upArrow && (
                                    <React.Fragment style={{marginTop:'1px'}}>
                                        <ExpandLessIcon fontSize="small" />
                                    </React.Fragment>
                                )
                            }
                        </span>
                    )
                }

                {
                    category.children?(
                        <ul>
                            {renderCategories(category.children,false)}
                        </ul>
                    ): null
                }
            </li>
        )
    }

    const renderCategories= (categories,flag)=>{

        return categories.map((category,index)=>{
            return <Category key={index} category={category} flag={flag} />
        });
    }

    if(!state.categories)
        return (
            <div style={{margin:'3vh'}}>
                
            </div>
        );

    const data= Object.values(state.categories);

    return (
        <div className={classes.menuHeader}>
            {
                data[0].children ?(
                    <ul>
                        {renderCategories(data,true)}
                    </ul>
                ):null
            }
        </div>
    )
}

export default MenuBar;