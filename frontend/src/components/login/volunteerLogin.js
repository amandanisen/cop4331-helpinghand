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
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
    color: '#FFFFFF'
  },
}));

function AccessCodePage(props) {
  const classes = useStyles();
  const location = useLocation();
  
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    var obj = {email: email, password: password};
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch(buildPath('/vol/login'), {method: 'POST',
        body: js, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      if (res.id < 0)
      {
        setMessage(res.error);
      }
      else
      {
        var user = {first_name: res.first_name, last_name: res.last_name, id: res.id};
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        history.push('/findtask');
      }
    }
    catch (e)
    {
      alert(e.toString());
      return;
    }
  };
  
    return (
      <>
        <Appbar title={"Homepage"} />
        <form onSubmit={handleSubmit}>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >   
        <Grid className={classes.root} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid item>
                <img className={classes.image} src="/images/Logo.png"></img>
            </Grid>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            {/* </Avatar> */}
            
            {/* <Typography component="h3" variant="h5">
              Volunteer Sign In
            </Typography> */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange = {(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
               className={classes.buttonColor}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/createVolunteer" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

          </Grid>
        </form>
      </>
    )

}
const mapDispatchToProps = { areaAction: setAreas }


export default connect(
  null,
  mapDispatchToProps
)(AccessCodePage)
