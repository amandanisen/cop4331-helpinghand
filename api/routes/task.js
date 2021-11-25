const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkFields = require("../validation/task");
const findUser = require('../utilities/findUser');


// Connect to mongo
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

router.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Create Task
router.post('/create', async(req, res) =>
{
    // input: name, description, date, max_slots, latitude, longitude, email
    // return: id, error
    var error = {};

    const {errors, isValid} = checkFields.checkTaskFields(req.body);
    if (!isValid)
    {
      error = errors;
      return res.status(400).json({id: -1, error});
    }
    
    const{name, description, date, max_slots, email} = req.body;
    const location = {type: "Point", coordinates: [req.body.longitude, req.body.latitude]};

    const newTask = {task_name: name, task_description: description, 
        task_date: date, max_slots: max_slots, task_location: location, slots_available: max_slots,
        vol_arr: []};
    
    const db = client.db();
    
    const result = await db.collection('tasks').insertOne(newTask);

    var ret = {id: result.insertedId, error: error};
    var coord = await db.collection('coordinator').updateOne({coord_email: email}, 
      {
        $push: 
        {
          task_arr: ret.id
        }
      }
      ).then( (result) => {
        if (result.modifiedCount == 0)
        {
          db.collection('tasks').findOneAndDelete({_id: ret.id});
          return res.status(400).json("could not find user, task not created");
        }
      });
    
    res.status(200).json(ret);

});

router.get('/find:email', async(req, res) =>
{
  // input: email
  // out: list of tasks
  const db = client.db();
  const {email} = req.params;
  await db.collection('volunteer').findOne({vol_email: email}).then( (user) => {
    if (user == null)
    {
      return res.status(400).json("Couldn't find user");
    }
    let searchRange = user.vol_accepted_distance * 1609.34;
    db.collection('tasks').find({task_location:
      {$near:
        {
          $geometry: {type: "Point", coordinates: user.vol_location.coordinates.map(Number)},
          $minDistance: 0,
          $maxDistance: searchRange
        }
      }
    }).toArray().then((results) =>{
      return res.status(200).json(results);
    });
    
  });

})

router.post('/remove', async(req, res) => {
  // Input: email, taskID
  const db = client.db();
  const {email, taskID} = req.body;

  db.collection('coordinator').findOneAndUpdate(
    {
      $and: [
        {coord_email: email},
        {task_arr: taskID}
      ]
    },
    {
      $pull: {task_arr: taskID}
    }
  ).then( async(coord) => {
    if (coord.lastErrorObject.updatedExisting == false)
    {
      return res.status(400).json("Cannot find that coordinator with this task");
    }
    db.collection('tasks').findOneAndDelete({_id: taskID}).then( async(result) => {
      console.log("result: " + result.value);
      if (result == null)
      {
        return res.status(400).json("Cannot find task");
      }
      return res.status(200).json({success: true});
    })
  })
})

module.exports = router;