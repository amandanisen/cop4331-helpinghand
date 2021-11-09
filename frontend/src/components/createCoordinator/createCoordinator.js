import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import { useHistory } from "react-router-dom";
import './createCoordinator.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        margin: '20px',
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
        fontSize: '18px',
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

export default function CreateCoordinator() {
    const classes = useStyles();
    let history = useHistory();
    return (
        <div>
            <Appbar title="Coordinator" type="coordinator" />
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
            {/* <Grid item>
            <img className={classes.image} src="/images/coordinator.jpg"></img>
            </Grid> */}
            <Grid item>
            <Typography className={classes.welcome} variant="h4" component="h4" align="center">Coordinator Registration</Typography>
            </Grid>
            <Grid item>
              <TextField
                required
                id="filled-bare"
                placeholder={"Full Name"}
                margin="normal"
                variant="filled"
                //onChange={(e)=> setFullName(e.target.value)}
               />
            </Grid>
            <Grid item>
              <TextField
                required
                id="filled-bare"
                placeholder={"Email"}
                margin="normal"
                variant="filled"
                //onChange={(e)=> setFullName(e.target.value)}
               />
            </Grid>
            <Grid item>
              <TextField
                required
                id="filled-bare"
                placeholder={"Password"}
                margin="normal"
                variant="filled"
                //onChange={(e)=> setFullName(e.target.value)}
               />
            </Grid>
            <Grid item>
            <Button 
                className={classes.smallbutton}
                onClick={()=> history.push("/coordinatorpage", {role: ""})}>Submit
            </Button>
            </Grid>
            </Grid>
        </div>
    )

}
