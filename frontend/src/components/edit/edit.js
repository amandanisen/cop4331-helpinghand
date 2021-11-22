import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import TaskCard from '../volunteertaskcard/taskcard.js'
import Appbar from "../appbar/appbar.js";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './edit.css';

const buildPath = require('../../redux/buildPath');

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  image: {
    marginTop: '5px',
    height: '100px',
},
  button: {
    marginTop: '40px',
    width: '110px',
    height: '40px',
    backgroundColor: "#27AE60",
    color: '#FFFFFF'
  },
  buttonColor: {
    backgroundColor: "#27AE60",
    color: '#FFFFFF',
  },
}));

function Edit(props) {
  const classes = useStyles();
  const location = useLocation();
  
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mylocation, setLocation] = useState('');
  const [distance, setDistance] = useState(0);
  const [radius, setRadius] = useState(0);
  const [message, setMessage] = useState('');
  async function handleEdit(event)
    {
        event.preventDefault();
        var obj = { first_name: firstName, last_name: lastName, location: mylocation, accepted_distance: distance, radius: radius};
 
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('/vol/edit'), {method: 'POST',
                body: js, headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());
            if (res.id == -1)
            {
                alert(JSON.stringify(res.error));
            }
            else
            {
                var user = {first_name: res.first_name, last_name: res.last_name, location: res.location, accepted_distance: res.accepted_distance, radius: res.radius};
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                history.goBack();
            }
           
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
  };
  
    return (

      <>
        <Appbar title={"Edit Account"} />
        <form onSubmit={handleEdit}>
          <div className = 'Edit2'>
            <div className = "form-inner">
              <h2>Edit account details</h2>
              <div className = "form-group">
                <label htmlFor='first name'>First Name:</label>
                <input 
                type = 'text' 
                name = 'editFirstName' 
                id = 'editFirstName' 
                onChange = {(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className = "form-group">
                <label htmlFor='last name'>Last Name:</label>
                <input 
                type = 'text' 
                name = 'editLastName' 
                id = 'editLastName' 
                onChange = {(event) => setLastName(event.target.value)}
                />
              </div>
              <div className = "form-group">
                <label htmlFor='location'>Location:</label>
                <input 
                type = 'text' 
                name = 'editLocation' 
                id = 'editLocation' 
                onChange = {(event) => setLocation(event.target.value)}
                />
              </div>
              <div className = "form-group">
                <label htmlFor='radius'>Radius:</label>
                <input 
                type = 'text' 
                name = 'radius' 
                id = 'radius' 
                onChange = {(event) => setRadius(event.target.value)}
                />
              </div>
              <input type = "submit" value = "Edit Details" />
            </div>
          </div>
        </form>
      </>
    )

}
const mapDispatchToProps = { areaAction: setAreas }


export default connect(
  null,
  mapDispatchToProps
)(Edit)
