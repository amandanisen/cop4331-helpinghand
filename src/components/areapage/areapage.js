import React, { useState, useEffect } from "react"
import AreaCard from '../areacard/areacard.js';
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions.js';
import { useHistory } from "react-router-dom";

function AreaPage(props) {
  const [areas, setAreas] = useState([]);
  let history = useHistory();
  const areasTest = [
    {
      id: "1",
      name: "First Name",
      location: "Downtown Orlando",
      numVol: "5",
      maxVol: "8"
    },
    {
      id: "2",
      name: "Second Name",
      location: "Amway Center",
      numVol: "1",
      maxVol: "10"
    },
    {
      id: "3",
      name: "Third Name",
      location: "UCF",
      numVol: "2",
      maxVol: "6"
    }
  ];
  useEffect(() => {
    if (props.areas) {
      setAreas(props.areas);
    }
  }, props.areas)

  return (
    <div>
      <Appbar title="Volunteer Tasks Near You" />
      <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
      >
        {areasTest.map((area, index) =>
          <Grid item key={"area"+area.id}  onClick={() => history.push("/volunteer", {area_index: index}) }>
            <AreaCard name={area.name} location={area.location} numVol={area.numVol} maxVol={area.maxVol}/>
          </Grid>
        )}
      </Grid >
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    areas: state.areas
  }
}

const mapDispatchToProps = { areaAction: setAreas }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaPage)

