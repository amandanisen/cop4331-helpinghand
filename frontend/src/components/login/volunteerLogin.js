import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TaskCard from "../taskcard/taskcard.js";
import Appbar from "../appbar/appbar.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setAreas } from "../../redux/actions.js";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaCentercode } from "react-icons/fa";

const buildPath = require("../../redux/buildPath");

function AccessCodePage(props) {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();

  //login
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  //register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [distance, setDistance] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    var obj = { email: email, password: password };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("/vol/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());
      if (res.id < 0) {
        setMessage(res.error);
      } else {
        var user = {
          first_name: res.first_name,
          last_name: res.last_name,
          id: res.id,
        };
        localStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        history.push("/areas");
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  }

  async function handleRegistration(event)
    {

        event.preventDefault();
        var obj = {email: registerEmail, password1: password1, password2: password2, first_name: firstName, 
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
    <>
      <Appbar title={location.state.role} />
      <form>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid
            className={classes.root}
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Tabs fill defaultActiveKey="home" id="uncontrolled-tab-example">
                <TabList className={classes.tab}>
                  <Tab>Login</Tab>
                  <Tab>Register</Tab>
                </TabList>
                <Grid item className={classes.tabPanel}>
                  <img className={classes.image} src="/images/Logo.png"></img>
                </Grid>
                <TabPanel>{getLogin()}</TabPanel>
                <TabPanel>{getRegister()}</TabPanel>
              </Tabs>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );

  function getLogin() {
    return (
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
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
    );
  }

  function getRegister() {
    return (
      <Box component="form" noValidate onSubmit={handleRegistration} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="registerEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password1"
          label="password"
          name="password1"
          type="password"
          autoComplete="password1"
          onChange={(event) => setPassword1(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password2"
          label="Confirm Password"
          name="password2"
          type="password"
          autoComplete="password1"
          onChange={(event) => setPassword2(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="longitude"
          label="longitude"
          name="longitude"
          autoComplete="longitude"
          onChange={(event) => setLongitude(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="latitude"
          label="latitude"
          id="latitude"
          autoComplete="latitude"
          onChange={(event) => setLatitude(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="distance"
          label="distance"
          id="distance"
          autoComplete="distance"
          onChange={(event) => setDistance(event.target.value)}
        />
        <Button
          className={classes.buttonColor}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Complete Registration
        </Button>
      </Box>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  image: {
    marginTop: "5px",
    height: "100px",
    justifySelf: "center",
  },
  button: {
    marginTop: "40px",
    width: "110px",
    height: "40px",
    backgroundColor: "#27AE60",
    color: "#FFFFFF",
  },
  buttonColor: {
    backgroundColor: "#27AE60",
    color: "#FFFFFF",
  },
  tab: {
    fullWidth: true,
    textAlign: "center",
  },
  tabPanel: {
    textAlign: "center",
  },
}));
const mapDispatchToProps = { areaAction: setAreas };

export default connect(null, mapDispatchToProps)(AccessCodePage);
