import React,{useContext, useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import {useParams,useHistory} from 'react-router-dom';

import {AppContext} from '../AppContext';
import { setFilter,filteredSubCategories, filteredCategoryPresent } from '../actions/actions';

const useStyles = makeStyles({
});

const Filter= (props)=> {
    
    console.log(props);

    const params= useParams();

    const classes= useStyles();

    const {state,dispatch}= useContext(AppContext);

    const [checkBoxCategories, setCheckBoxCategories] = useState(null);

    const [checker, setChecker] = useState(false);

    const [checkBoxSubCategories, setCheckBoxSubCategories] = useState(null);

    const [selectedValue, setSelectedValue] = useState({
        name: null
    });

    console.log(params);

    useEffect(()=>{
        if(state.categories){
            var z={};
            var flag=true; 
            Object.values(state.categories).map((item)=>{
                if(!props.selectedCategory && flag==true)
                    z= {...z, [item._id] : true}
                else if(props.selectedCategory==item._id)
                    z= {...z,[item._id] : true}
                else 
                    z= {...z,[item._id] : false}
                flag=false;
            });
            setCheckBoxCategories(z);
        }
    },[state.categories,props.selectedCategory]);

    useEffect(()=>{
        if(checkBoxCategories && state.categories){
            var z={};
            var flag= false;
            var subCategoryIds=[];
            Object.values(state.categories).map((item)=>{
                if(checkBoxCategories[item._id]){
                    flag=true;
                    item.children.map((subItem)=>{
                        if(params.subCategoryId==subItem._id)
                            z= {...z,[subItem._id] : true}
                        else
                            z= {...z,[subItem._id] : false}
                        console.log(subItem._id)
                        subCategoryIds.push(subItem._id);
                    })
                }
            });
            console.log(checkBoxCategories);
            dispatch(filteredCategoryPresent(flag));
            setCheckBoxSubCategories(z);
            setChecker(true);
        }

    },[checkBoxCategories]);
    

    useEffect(async()=>{
        if(checkBoxCategories && state.categories){
            var storeAllSubCategoryIds=[];
            var subCategoryIds=[];
            for await (var [key,value] of Object.entries(checkBoxSubCategories)) {
                if(value==true)
                    subCategoryIds.push(key);
    
                storeAllSubCategoryIds.push(key);
            }

            if(subCategoryIds.length==0)
                dispatch(filteredSubCategories(storeAllSubCategoryIds));
            else
                dispatch(filteredSubCategories(subCategoryIds));
        }

    },[checkBoxSubCategories]);

    useEffect(()=>{
        console.log(selectedValue);
        dispatch(setFilter(selectedValue));
        
    },[selectedValue]);

    console.log(checkBoxCategories);
    console.log(checkBoxSubCategories);

    const handleChange = (event) => {
      setSelectedValue({...selectedValue, [event.target.name]:event.target.value});
      console.log({ [event.target.name]:event.target.value});
    };
    
    const handleChangeCategories = (event) => {
        setCheckBoxCategories({ ...checkBoxCategories, [event.target.name]: event.target.checked });
        setChecker(false);
    };

    const handleChangeSubCategories = (event) => {
        setCheckBoxSubCategories({ ...checkBoxSubCategories, [event.target.name]: event.target.checked });
    };

    if(!checkBoxCategories || !state.categories || !checkBoxSubCategories || !checker)
        return (
            <div style={{margin:'15vh'}}>
               
            </div>
        );

    var data= Object.values(state.categories);


    return (
        <Paper style={{padding:'2vh',textAlign:'left',width:state.mobileView?'100vw':'auto',minHeight: "100%",height: "auto",height: "100%"}}>
            <h5>Filter</h5><hr/>
            <Grid container direction direction="column">
                <Grid item>
                    <p>Categories</p>
                    <Grid container spacing={1} style={{height:state.mobileView?'20vh':'20vh',overflowY:'auto',marginBottom:'2vh'}}>
                        {
                            data && data.map((ob, key)=>(
                                <Grid item  key={key}>
                                    <Checkbox
                                        checked={checkBoxCategories[ob._id]}
                                        onChange={handleChangeCategories}
                                        name={ob._id}
                                        color="primary"
                                    />{ob.name}<br/>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                    <hr/>
                </Grid>

                <Grid item>
                    <p>Sub Categories</p>
                    <Grid container spacing={1} style={{height:state.mobileView?'20vh':'20vh',overflowY:'auto',marginBottom:'2vh'}}>
                        {
                            data && data.map((z)=>{
                                if(checkBoxCategories[z._id]){
                                    return z.children.map((ob,key)=>(
                                        <Grid item key={key}>
                                            <Checkbox
                                                checked={checkBoxSubCategories[ob._id]}
                                                onChange={handleChangeSubCategories}
                                                name={ob._id}
                                                color="primary"
                                            />{ob.name}<br/>
                                        </Grid>
                                    ))
                                }
                            })
                            
                        }
                    </Grid>
                    <hr/>
                </Grid>
                
                <Grid item>

                    {
                        selectedValue.name && (
                            <div style={{cursor:'pointer'}} onClick={()=> setSelectedValue({name:null})}>
                                Remove Filter
                            </div>
                        )
                    }

                    <br/>

                    <p>Name</p>
                    
                    <Radio
                        checked={selectedValue.name === 'ascendingName'}
                        onChange={handleChange}
                        value="ascendingName"
                        name="name"
                        color="primary"
                    />
                    <label>A-Z</label>

                    <Radio
                        checked={selectedValue.name === 'descendingName'}
                        onChange={handleChange}
                        value="descendingName"
                        name="name"
                        color="primary"
                    />
                    <label>Z-A</label>
                    <br/>
                </Grid>

                <Grid item>
                    <br/>
                    <p>Price</p>
                    
                    <Radio
                        checked={selectedValue.name === 'ascendingPrice'}
                        onChange={handleChange}
                        value="ascendingPrice"
                        name="name"
                        color="primary"
                    />
                    <label>Low to High</label>

                    <Radio
                        checked={selectedValue.name === 'descendingPrice'}
                        onChange={handleChange}
                        value="descendingPrice"
                        name="name"
                        color="primary"
                    />
                    <label>High to Low</label>

                    <br/>

                </Grid>
            </Grid>   

        </Paper>
    );
}

export default Filter;