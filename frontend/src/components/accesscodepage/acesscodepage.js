import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import TaskCard from '../taskcard/taskcard.js'
=======
import TaskCard from '../volunteertaskcard/taskcard.js'
>>>>>>> working-dev
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  button: {
    marginTop: '40px',
    width: '110px',
    height: '40px',
    backgroundColor: "#27AE60",
    color: '#FFFFFF'
  },
}));

function AccessCodePage(props) {
  const classes = useStyles();
  const location = useLocation();
  let history = useHistory();
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async event => 
  {
    event.preventDefault();

    var obj = {email: email, password: password};
    var js = JSON.stringify(obj);

    console.log(obj);

    try 
    {
      if (location.state.role == 'Coordinator')
      {
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: js,
        };
        let response = await fetch('http://localhost:3000/api/coordLogin', options)
          .then(data => {
            if (!data.ok) {
              throw Error(data.status);
            }
            return data.json();
          }).catch(e => {
            console.log(e);
          });
        console.log(response);
    
        
        
        if (response.id == -1)
        {
          setMessage('Email/password combination is incorrect');
        }
        else
        {
          var user = {firstName: response.firstName, lastName: response.lastName, id: response.id};
          localStorage.setItem('user_data', JSON.stringify(user));
          setMessage('');
          history.push('/coordinatorPage');
        }
      }
      else
      {
        const response = fetch('http://localhost:3000/api/volLogin', 
          {method: 'POST', body: js, 
          headers: {'Content-Type':'application/json'}});

        var res = JSON.parse(response.text());

        if (res.id <= 0)
        {
          setMessage('Email/password combination is incorrect');
        }
        else
        {
          var user = {firstName: res.firstName, lastName: res.lastName, id: res.id};
          localStorage.setItem('user_data', JSON.stringify(user));

          setMessage('');
          window.location.href = '/areas';
        }
      }
      
    }
    catch (e)
    {
      alert(e.toString());
      return;
    }

    axios.get('/event/' + location.state.role + "/" + email)
      .then((response) => {
        console.log("Reponse:", response);
        props.areaAction(response.data.areas);
        history.push("/areas");
      })
      .catch((error) => {
        console.log("Get Event Error:", error);
      })
  }

  
  
    return (
      <>
        <Appbar title={location.state.role} />
=======
  const [accessCode, setAccessCode] = useState("");
  const [fullName, setFullName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props);
    console.log("Access Code:", accessCode);
    console.log("Full Name:", fullName);
    
    history.push("/findtask");
    // axios.get('/event/' + location.state.role + "/" + accessCode)
    //   .then((response) => {
    //     console.log("Reponse:", response);
        // props.areaAction(response.data.areas);
    //     history.push("/areas");
    //   })
    //   .catch((error) => {
    //     console.log("Get Event Error:", error);
    //   })
  }
  
    return (
      <>
         <Appbar title="Homepage test" />
>>>>>>> working-dev
          <form onSubmit={handleSubmit}>
          <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.root}
                spacing={4}
          >
            <Grid item>
              <Typography variant="h4" component="h3" align="center">
                <strong>{location.state.role + " Login"}</strong>
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                required
<<<<<<< HEAD
                id="email"
                placeholder={"Email"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setEmail(e.target.value)}
=======
                id="filled-bare"
                placeholder={"Email"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setFullName(e.target.value)}
>>>>>>> working-dev
               />
            </Grid>
            <Grid item>
              <TextField
                required
<<<<<<< HEAD
                id="password"
                placeholder={"Password"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setPassword(e.target.value)}
               />
            </Grid>
            <Grid>
            <Button className={classes.button}
              onClick={()=> history.push("/accesscode", {role: "Coordinator"})}
              type="submit">
              Submit

=======
                id="filled-bare"
                placeholder={"Password"}
                margin="normal"
                variant="filled"
                onChange={(e)=> setAccessCode(e.target.value)}
               />
            </Grid>
            <Grid>
            <Button className={classes.button} type="submit">
              Submit
>>>>>>> working-dev
            </Button>
          
            </Grid>
          </Grid >
          </form>
      </>
    )

}
const mapDispatchToProps = { areaAction: setAreas }


export default connect(
  null,
  mapDispatchToProps
)(AccessCodePage)
