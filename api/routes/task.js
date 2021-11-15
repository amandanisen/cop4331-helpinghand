const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkFields = require("../validation/task");


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
    // input: name, description, date, max_slots, latitude, longitude
    // return: id, error
    var error = {};

    const {errors, isValid} = checkFields.checkTaskFields(req.body);
    if (!isValid)
    {
      error = errors;
      return res.status(400).json({id: -1, error});
    }
    const{name, description, date, max_slots} = req.body;

    const location = {type: "Point", coordinates: [req.body.longitude, req.body.latitude]};

    const newTask = {task_name: name, task_description: description, 
        task_date: date, max_slots: max_slots, task_location: location, slots_available: max_slots};
    
    const db = client.db();
    const result = await db.collection('tasks').insertOne(newTask);

    var ret = {id: result.insertedId, error: error};
    res.status(200).json(ret);

});

router.post('/find', async(req, res) =>
{
  // input: latitude, longitude (of the volunteer searching), range
  // out: list of tasks
  const db = client.db();
  const {longitude, latitude, distance} = req.body;

  let searchRange = distance * 1609.34;
  const results = await db.collection('tasks').find({task_location:
    {$near:
      {
        $geometry: {type: "Point", coordinates: [longitude, latitude]},
        $minDistance: 0,
        $maxDistance: searchRange
      }
    }
  }).toArray();
  res.status(200).json(results);
})

module.exports = router;