import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import useGoogleMapsApi from '../googleapi/useGoogleMapsApi.js'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

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

export default function CreateVolunteer() {
    const apiKey = 'AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [distance, setDistance] = useState(0);
    const [message, setMessage] = useState('');

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
                <Grid item>
                    <GooglePlacesAutocomplete
                        margin="normal"
                        variant="filled"
                        style = {{width: 100}}
                        apiKey="AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4"
                    />
                {/* <LoadScript
                    googleMapsApiKey='AIzaSyCVF0U1KIXIVF3WkEhJ84Ps3EnlKt4NtO4'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}
                    />
                </LoadScript> */}
              {/* <TextField
                required
                id="filled-bare"
                placeholder={"Longitude"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setLongitude(e.target.value)}
               /> */}
            </Grid>
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
