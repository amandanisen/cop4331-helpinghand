import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FaMapMarkerAlt } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    minHeight: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 5,
    backgroudColor: "rgb(122, 102, 102)",
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
  fab: {
    marginLeft: 'auto',
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
});

export default function SimpleCard(props) {

  // const [selected, setSelected] = useState(false)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  function cardSelect() {
    props.handleSelected(props.id);
  }

  const ButtonLeft = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  return (
    <>
     <Card sx={{ maxWidth: 345 }} className={classes.root} style={{ color: 'black', backgroundColor: '#f7f7f7' }} >
      <CardHeader
        title={props.task.name}
        subheader={<div className={classes.locationField}> <FaMapMarkerAlt/> {props.task.location} - {props.task.miles} </div>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.task.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button className={classes.button} aria-label="finish tasks" variant="contained" key={props.task.name} onClick={() => 
        { }
        }>
        Finished
        </Button>
        <ButtonLeft
         
          aria-label="show more"
        >
           <Typography color="textSecondary">
            {props.task.numVol} / {props.task.maxVol}
            </Typography>
        </ButtonLeft>
      </CardActions>
    </Card>
      
    </>
  );
}

    // title
    // location
