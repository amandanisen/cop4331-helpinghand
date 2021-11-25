import React, { useState, useEffect } from "react";
import AreaCard from "../tasknearcard/tasknearcard.js";
import Grid from "@material-ui/core/Grid";
import Appbar from "../appbar/appbar.js";
import { connect } from "react-redux";
import { setAreas } from "../../redux/actions.js";
import { useHistory } from "react-router-dom";

function FindTask(props) {
	var user_data = localStorage.getItem("user_data");
	console.log(user_data);
	const [areas, setAreas] = useState([]);
	let history = useHistory();
	const areasTest = [
		{
			id: "1",
			name: "Feed the Homeless",
			location: "Downtown Orlando",
			miles: "2.5 miles",
			description:
				"This is a description of feed the homeless. Need 8 participants to help go around DT Orlando to feed.",
			numVol: "5",
			maxVol: "8",
		},
		{
			id: "2",
			name: "Concert Cleanup",
			description:
				"This is a description of concert cleanup. Need 10 participants to help clean after a concert.",
			location: "Amway Center",
			miles: "3 miles",
			numVol: "1",
			maxVol: "10",
		},
		{
			id: "3",
			name: "Set up Tents",
			description:
				"This is a description of setting up tents. Need 6 participants.",
			location: "UCF",
			miles: "15 miles",
			numVol: "2",
			maxVol: "6",
		},
		{
			id: "4",
			name: "Set up Tents 2.0",
			description:
				"This 2 is a description of setting up tents. Need 6 participants.",
			location: "UCF",
			miles: "15 miles",
			numVol: "2",
			maxVol: "6",
		},
		{
			id: "5",
			name: "Concert Cleanup",
			description:
				"This is a description of concert cleanup. Need 10 participants to help clean after a concert.",
			location: "Amway Center",
			miles: "3 miles",
			numVol: "1",
			maxVol: "10",
		},
		{
			id: "6",
			name: "Set up Tents",
			description:
				"This is a description of setting up tents. Need 6 participants.",
			location: "UCF",
			miles: "15 miles",
			numVol: "2",
			maxVol: "6",
		},
	];
	useEffect(() => {
		if (props.areas) {
			setAreas(props.areas);
		}
	}, props.areas);

	return (
		<div>
			<Appbar title="Volunteer Tasks Near You" />
			<Grid
				container
				direction="row"
				spacing={2}
				// columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				// justify="space-between"
				// spacing={{ xs: 2, md:  }}
				columns={{ xs: 4, sm: 8, md: 12 }}
				justifyContent="space-evenly"
				alignItems="flex-start"
			>
				{areasTest.map((area, index) => (
					<Grid item key={"area" + area.id}>
						<AreaCard
							name={area.name}
							location={area.location}
							numVol={area.numVol}
							maxVol={area.maxVol}
							description={area.description}
							miles={area.miles}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		areas: state.areas,
	};
};

const mapDispatchToProps = { areaAction: setAreas };

export default connect(mapStateToProps, mapDispatchToProps)(FindTask);
