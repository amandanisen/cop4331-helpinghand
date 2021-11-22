import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import useGoogleMapsApi from '../googleapi/useGoogleMapsApi.js'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import AutoComplete from 'react-google-autocomplete';

import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const buildPath = require('../../redux/buildPath');

const mapStyles = {        
    height: "100vh",
    width: "100%"};
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
    },
    string: {
        marginTop: '20px',
        marginBottom: '20px',
        fontSize: '20px',
    },
    welcome: {
        margin: '15px',
        marginBottom: '10px',
        fontSize: '28px',
        fontWeight: 'bold',
    },
    starter: {
        fontSize: '18px',
        marginBottom: '60px',

    },
    padding: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    button: {
        width: '200px',
        height: '60px',
        fontSize: '22px',
        background: '#27AE60',
        boxShadow: '0px 4px 4px rgba(154, 154, 154, 0.25)',
        radius: '10px',
        color: '#FFFFFF'
    },
    smallbutton: { 
        marginTop:'20px',
        width: '120px',
        height: '40px',
        fontSize: '13px',
        background: '#27AE60',
        boxShadow: '0px 4px 4px rgba(154, 154, 154, 0.25)',
        radius: '10px',
        color: '#FFFFFF'
    },
    image: {
        marginTop: '15px',
        height: '200px',
    },
    link: {
        alignItems: "center",
        color: "#27AE60",
    }

}));

// geocodeByAddress('UCF, Central Florida Blvd, Orlando, FL, USA')
// .then(results => getLatLng(results[0]))
// .then(({ lat, lng }) =>
//     console.log('Successfully got latitude and longitude', { lat, lng })
// );

export default function CreateVolunteer() {
    const apiKey = 'AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4';
    const [place, setLocation] = useState(null); 
    const [lat, setLat] = useState(''); 
    const [long, setLong] = useState(''); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [distance, setDistance] = useState(0);
    const [message, setMessage] = useState('');

    
    // const autocomplete = new google.maps.places.Autocomplete(input, options);

    // var place = GooglePlacesAutocomplete.location.lat();

    // var lat = place.geometry.location.lat(),
    // lng = place.geometry.location.lng();

    // Then do whatever you want with them

    // console.log(place);
    // console.log(lng);
    if(place != null){
        console.log(place.formatted_address);
        var lati = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        console.log(lati, lng);
    }

   

    const classes = useStyles();
    let history = useHistory();

    async function handleRegistration(event)
    {
        event.preventDefault();
        var obj = {email: email, password1: password1, password2: password2, first_name: firstName, 
            last_name: lastName, longitude: longitude, latitude: latitude, accepted_distance: distance};

        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('/vol/register'), {method: 'POST',
                body: js, headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.id == -1)
            {
                alert(JSON.stringify(res.error));
            }
            else
            {
                var user = {first_name: res.first_name, last_name: res.last_name, id: res.id};
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                history.push('/');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return (
        <div>
            
            <Appbar title="Volunteer" type="Volunteer"/>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
            {/* <Grid item>
            <img className={classes.image} src="/images/volunteer.png"></img>
            </Grid> */}
                <Grid item>
                    <Typography className={classes.welcome} variant="h4" component="h4" align="center">Volunteer Registration</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="filled-bare"
                        placeholder={"First Name"}
                        margin="normal"
                        variant="filled"
                        onChange={(e)=> setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="filled-bare"
                        placeholder={"Last Name"}
                        margin="normal"
                        variant="filled"
                        onChange={(e)=> setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                <TextField
                    required
                    id="filled-bare"
                    placeholder={"Email"}
                    margin="normal"
                    variant="filled"
                    onChange={(e)=> setEmail(e.target.value)}
                />
                </Grid>
                <Grid item>
                <TextField
                    required
                    id="filled-bare"
                    placeholder={"Password"}
                    margin="normal"
                    variant="filled"
                    onChange={(e)=> setPassword1(e.target.value)}
                />
                </Grid>
                <Grid item>
                <TextField
                    required
                    id="filled-bare"
                    placeholder={"Confirm Password"}
                    margin="normal"
                    variant="filled"
                    onChange={(e)=> setPassword2(e.target.value)}
                />
                </Grid>
                {/* <Grid item> */}
                    <AutoComplete
                    apiKey={apiKey}
                    onPlaceSelected={(place) => 
                        setLocation(place)}
                    options={{
                        types: ["address"],
                        componentRestrictions: { country: "us" },
                      }}
                    />
                    {/* <GooglePlacesAutocomplete
                        selectProps={{
                            location,
                            onChange: setLocation,
                        }}
                        
                        placeholder='Event Location'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        apiOptions={{ language: 'en', region: 'us' }}
                        // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        apiKey="AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4"
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          console.log(data, details);
                        }}
                        // onPress={(data, details = null) => {
                        //     console.warn(data, details);
                        //     // 'details' is provided when fetchDetails = true
                        //     this.setState(
                        //       {
                        //         location: data.description, // selected address
                        //         coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
                        //       }
                        //     );
                        //   }}
                        //   textInputProps={{
                        //     onChangeText: (text) => { console.log(text) }
                        //   }} */}
                    {/* /> */}
                {/* </Grid> */}
            <Grid item>
              {/* <TextField
                required
                id="filled-bare"
                placeholder={"Latitude"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setLatitude(e.target.value)}
               /> */}
            </Grid>
            <Grid item>
              <TextField
                required
                id="filled-bare"
                placeholder={"Minimum distance of task"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setDistance(e.target.value)}
               />   
            </Grid>
            <Grid item>
            <Button 
                className={classes.smallbutton}
                onClick={handleRegistration}>Submit
            </Button>
            </Grid>
            </Grid>
        </div>
    )

}
