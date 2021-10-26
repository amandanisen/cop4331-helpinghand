import React, { useState } from 'react';
import {ThemeProvider, makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    minHeight: 200,
    marginTop: 20,

    borderRadius: 10,
    borderWidth: 5,
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
    fontSize: 22,
  },
  locationField:{
    fontSize: 14
  },
  button:{
    background: "#19AE59",
    fontSize: 12
  },
  fab: {
    marginLeft: 'auto',
  }
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AreaCard(props) {
  const location = useLocation();
  console.log("location: ", location);
  // const [selected, setSelected] = useState(false)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
     <Card sx={{ maxWidth: 345 }} className={classes.root} >
      <CardHeader
        title={props.name}
        subheader={<div className={classes.locationField}> <FaMapMarkerAlt/> {props.location} - {props.miles} </div>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button className={classes.button} aria-label="add to tasks" variant="contained">
        Add
        </Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
         
          aria-label="show more"
        >
           <Typography color="textSecondary">
            {props.numVol} / {props.maxVol}
            </Typography>
        </ExpandMore>
      </CardActions>
    </Card>
    {/* <Card className={classes.root} onClick={() => {}} >
      <CardContent>
        <Grid item xs={10}>
            <Typography className={classes.locationField} color="textSecondary">
            <FaMapMarkerAlt/> {props.location}
            </Typography>
        </Grid>
        
        <Typography className={classes.title} align="left" gutterBottom>
          {props.name}
        </Typography>

        <Grid item xs={10}>
            <Typography color="textSecondary">
            {props.numVol} / {props.maxVol}
            </Typography>
          </Grid>
      </CardContent>
    </Card> */}
    </>
  );
}

    // title
    // location
