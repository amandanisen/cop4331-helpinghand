import React, { useState } from 'react';
import {ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
    marginBottom: 10,
    background: "rgba(244,244,244)",
  },
  selected: {
    minWidth: 275,
    marginTop: 30,
    marginBottom: 10,
    background: "rgb(226,248,235)",
    background: "linear-gradient(180deg, rgba(226,248,235,1) 0%, rgba(226,248,235,1) 40%, rgba(244,244,244,1) 100%)"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  locationField:{
    fontSize: 12
  },
  
  fab: {
    marginLeft: 'auto',
  }
});

export default function AreaCard(props) {
  const location = useLocation();
  console.log("location: ", location);
  // const [selected, setSelected] = useState(false)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
    <Card className={classes.root} onClick={() => {}} >
      <CardContent>
      <Grid item xs={10}>
            <Typography className={classes.locationField} color="textSecondary">
            {props.location}
            </Typography>
          </Grid>
        <Typography align="center">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={3}>
         
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary">
            {props.numVol} / {props.maxVol}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </>
  );
}

    // title
    // location
