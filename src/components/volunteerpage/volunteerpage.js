import React, { useState, useRef, useEffect } from "react"
import TaskCard from '../taskcard/taskcard.js'
import Grid from '@material-ui/core/Grid';
import Appbar from "../appbar/appbar.js";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setAreas } from '../../redux/actions';

export default function VolunteerPage(props) {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState({});
  let idTrack = useRef(null);

  useEffect(() => {
    if (props.areas && props.areas.length > 0) {
      let index = location.state | 0;
      setTasks(props.areas[index].tasks);
    }
  }, [props.areas])

  useEffect(() => {
    if (tasks && tasks.length > 0 && Object.values(selected).length === 0) {
      let taskObj = {};
      tasks.forEach((task) => taskObj[task.id] = false);
      setSelected(taskObj);
    }
  }, [tasks, selected])


  //TODO: CALL API TO GET TASKS WITHIN THAT USER
  const taskAdded = [
    {
      id: "4",
      name: "Feed the Homeless 2.0",
      location: "Downtown Orlando 2.0",
      miles:"2.6 miles",
      description: "This is a description of feed the homeless. Need 8 participants to help go around DT Orlando to feed. 2.0",
      numVol: "2",
      maxVol: "2",
      done: "false"
    },
    {
      id: "5",
      name: "Feed the Homeless 3.0",
      location: "Downtown Orlando 3.0",
      miles:"3.6 miles",
      description: "This is a description of feed the homeless. Need 8 participants to help go around DT Orlando to feed. 3.0",
      numVol: "3",
      maxVol: "4",
      done: "false"
    }
  ]

  const handleSelect = (id) => {
    let newSelected = { ...selected };
    if (idTrack.current === null) {
      idTrack.current = id;
    } 
    if (selected[id]) {
      // We are leaving the task
      //Socket.send(JSON.stringify({topic: "task", action: "leave", message: {id: id, action: "Leaving"}}));
      newSelected[id] = false;
      setSelected(newSelected);
    } else {
      // We are joining the task
      if (idTrack.current !== id) {
        //Socket.send(JSON.stringify({topic: "task", action: "leave", message: {id: idTrack.current, action: "Leaving"}}));
      }
      //Socket.send(JSON.stringify({topic: "task", action: "join", message: {id: id, action: "Joining"}}));
      for (const prop in newSelected) {
        newSelected[prop] = false;
      }
      newSelected[id] = true;
      setSelected(newSelected);
    }
    idTrack.current = id;
  }



  return (
    <div>
      <Appbar title="Volunteer's Tasks" />
      <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
      >
        {taskAdded.map((task, index) =>
          <Grid item key={"Task"+task.id}>
            <TaskCard selected={selected[task.id]} handleSelected={handleSelect} id={task.id} task={task}/>
          </Grid>
        )}
      </Grid >
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
    
//     areas: state
//   }
// }

// const mapDispatchToProps = { name: setAreas }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(VolunteerPage)
