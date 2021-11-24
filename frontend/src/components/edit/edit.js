import React, { useState } from 'react';
import Appbar from "../appbar/appbar.js";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './edit.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import AutoComplete from "react-google-autocomplete";

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
  //const location = useLocation();
  
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [distance, setDistance] = useState(0);
  const [radius, setRadius] = useState(0);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null); 
  const apiKey = 'AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4';
  console.log(location);
  async function handleEdit(event)
    {
        event.preventDefault();
        var obj = { first_name: firstName, last_name: lastName, location: location, accepted_distance: distance};
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
                // var user = {first_name: res.first_name, last_name: res.last_name, location: res.location, accepted_distance: res.accepted_distance, radius: res.radius};
                // var user = {first_name: res.first_name, last_name: res.last_name, email: res.email};
                // localStorage.setItem('user_data', JSON.stringify(user));

                // setMessage('');
                console.log("Success");
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
                <label htmlFor='radius'>Accepted Distance:</label>
                <input 
                type = 'text' 
                name = 'radius' 
                id = 'radius' 
                onChange = {(event) => setDistance(event.target.value)}
                />
              </div>
              <div className = "form-group">
                <label htmlFor='location'>Location:</label>
                {/* <input 
                type = 'text' 
                name = 'editLocation' 
                id = 'editLocation' 
                onChange = {(event) => setLocation(event.target.value)}
                /> */}
                <AutoComplete
                  placeholder="Current Location*"
                  apiKey="AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4"
                  required
                  style={{
                    width: "100%",
                    fontSize: 16,
                    // height: 60,
                    // margin: "0.5rem",
                    // backgroundColor: "#eee",
                    display: "inline-block",
                    borderBottom: "1px solid rgb(112, 111, 111)",
                  }}
                  //  predefinedPlacesDescription: {
                  //    color: '#1faadb',
                  //  }, }}
                  variant="outlined"
                  onPlaceSelected={(place) => setLocation(place)}
                  options={{
                    types: ["address"],
                    componentRestrictions: { country: "us" },
                  }}
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
