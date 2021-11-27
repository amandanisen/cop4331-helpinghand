// title
// location
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Controller } from "@react-spring/core";
const buildPath = require("../../redux/buildPath");

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
		background:
			"linear-gradient(180deg, rgba(226,248,235,1) 0%, rgba(226,248,235,1) 40%, rgba(244,244,244,1) 100%)",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	fab: {
		marginLeft: "auto",
	},
	title: {
		fontSize: 22,
	},
	locationField: {
		fontSize: 14,
	},
	button: {
		background: "#19AE59",
		fontSize: 12,
	},
});

export default function SimpleCard(props) {
	// const [selected, setSelected] = useState(false)
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	var user_data = JSON.parse(localStorage.getItem("user_data"));
	var user_email = user_data.email;
	function cardSelect() {
		props.handleSelected(props.id);
	}

	async function handleFinished() {
		console.log(buildPath("/vol/removeTask"));
		console.log(user_data);
		var obj = { email: user_email, taskID: props.task._id };

		var js = JSON.stringify(obj);
		console.log(js);

		try {
			const response = await fetch(buildPath("/vol/removeTask"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: js,
			});
			console.log(response);
			var res = JSON.parse(await response.text());
			console.log(res);
			if (res.error != null) {
				console.log(res.error);
			} else {
				console.log("success");
				window.location.reload(true);

				//this is a check because the page might render twice and cause the call to fail
				//if the call fails and res is set then the structure is different from if it returned tasks
				//and we cans use the same syntax to parse it with map
				if (res != "no such user found") {
					// props = res;
					// history.push({
					// 	pathname: "/volunteer", // your data array of objects
					// });
				} else {
					console.log("User not found error");
				}
				return res;
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	}

	const ButtonLeft = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));
	console.log(props.task);
	console.log(props);

	//go from coordinates to address

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
							<FaMapMarkerAlt /> {props.task.task_address}{" "}
							<div className={classes.locationField} style={{ marginLeft: 18 }}>
								{props.task.distance?.toFixed(2)} miles away
							</div>
						</div>
					}
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						<FaCalendarAlt /> {"   "} {props.task.task_date.substr(0, 10)}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.task.task_description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Button
						className={classes.button}
						aria-label="finish tasks"
						variant="contained"
						key={props.task.task_name}
						onClick={handleFinished}
					>
						Finished
					</Button>
					<ButtonLeft aria-label="show more">
						<Typography color="textSecondary">
							{props.task.slots_available} / {props.task.max_slots}
						</Typography>
					</ButtonLeft>
				</CardActions>
			</Card>
		</>
	);
}

// title
// location
