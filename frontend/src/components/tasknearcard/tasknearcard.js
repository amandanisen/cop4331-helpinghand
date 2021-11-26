import React, { useState } from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import VolunteerPage from "../volunteertaskspage/volunteertasks.js";
import { useHistory } from "react-router-dom";

const initialList = [
	{
		id: "4",
		name: "Feed the Homeless 2.0",
		location: "Downtown Orlando 2.0",
		miles: "2.6 miles",
		description:
			"This is a description of feed the homeless. Need 8 participants to help go around DT Orlando to feed. 2.0",
		numVol: "2",
		maxVol: "2",
		added: "true",
	},
	{
		id: "5",
		name: "Feed the Homeless 3.0",
		location: "Downtown Orlando 3.0",
		miles: "3.6 miles",
		description:
			"This is a description of feed the homeless. Need 8 participants to help go around DT Orlando to feed. 3.0",
		numVol: "3",
		maxVol: "4",
		added: "true",
	},
];
// const [list, setList] = useState(initialList);

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
		// background: "rgb(226,248,235)",
		// background: "linear-gradient(180deg, rgba(226,248,235,1) 0%, rgba(226,248,235,1) 40%, rgba(244,244,244,1) 100%)"
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 22,
	},
	locationField: {
		fontSize: 14,
	},
	button: {
		maxWidth: "100px",
		maxHeight: "40px",
		minWidth: "100px",
		minHeight: "40px",
		background: "#19AE59",
		color: "#ffffff",
		fontSize: 12,
		"&:hover": {
			backgroundColor: "#197257",
			color: "#ffffff",
		},
	},
	fab: {
		marginLeft: "auto",
	},
});

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

function handleAdd(prop) {
	//API call to add task to list
	initialList.concat({ prop });
	console.log("Prop: ", prop);
	// console.log("New List: ", newList);

	console.log("initialList: ", initialList);

	// <VolunteerPage props = initialList/>
	// setList(newList);
}

export default function AreaCard(props) {
	const location = useLocation();
	let history = useHistory();
	console.log(props);
	// const [selected, setSelected] = useState(false)
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<>
			<Card
				sx={{ maxWidth: 345 }}
				className={classes.root}
				style={{ color: "black", backgroundColor: "#f7f7f7" }}
			>
				<CardHeader
					title={props.task.task_name}
					subheader={
						<div className={classes.locationField}>
							{" "}
							<FaMapMarkerAlt /> {props.location} - {props.miles}{" "}
						</div>
					}
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{props.task.task_description}
					</Typography>
				</CardContent>

				<CardActions disableSpacing>
					<Button
						className={classes.button}
						aria-label="add to tasks"
						variant="contained"
						key={props.name}
						onClick={() => {
							history.push({
								pathname: "/volunteer",
								areaAction: props.name, // your data array of objects
							});
						}}
					>
						Add
					</Button>
					{/* <IconButton className={classes.button} aria-label="share">
          <ShareIcon />
        </IconButton> */}
					<ExpandMore aria-label="show more">
						<Typography color="textSecondary">
							{props.task.slots_available} / {props.task.max_slots}
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
