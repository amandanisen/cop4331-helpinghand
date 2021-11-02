import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import TaskCard from '../taskcard/taskcard.js'
import Appbar from "../appbar/appbar.js";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
  const [accessCode, setAccessCode] = useState("");
  const [fullName, setFullName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props);
    console.log("Access Code:", accessCode);
    console.log("Full Name:", fullName);
    
    history.push("/areas");

  }
  
    return (
      <>
        <Appbar title={location.state.role} />
        <form onSubmit={handleSubmit}>
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={6}>
                <img src="/images/HelpingHands.png" style={{width: '100%', height:'100%', objectFit: 'cover'}} alt="brand"/>
            </Grid>
            <Grid container item xs={12} sm={6} 
            alignItems="center" 
            direction="column"
            justify="space-between" 
            style={{padding:10}}>
                <div />
                <div style={{display:"flex", flexDirection:"column", maxWidth:300, minWidth:300}}>
                    <Grid container justify="center">
                        <img src="/images/Logo.png" alt="logo" style={{width: '50%', height:'100%'}}></img>
                    </Grid>
                    <TextField label="Username" margin="normal"/>
                    <TextField label="Password" margin="normal"/>
                </div>
                <div/>
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
