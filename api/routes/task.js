const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkRegistrationFields = require("../validation/registration");

// Connect to mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:andrewhasgrayhair@cluster0.w0djj.mongodb.net/project2';

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
    // input: name, description, date, max_slots, location
    // return: id, error
    var error = '';

    const{name, description, date, max_slot, location} = req.body;

    

    const newTask = {task_name: name, task_description: description, 
        task_date: date, max_slots: max_slot, task_location: location, slots_available: max_slot};
    
    const db = client.db();
    const result = await db.collection('tasks').insertOne(newTask);

    var ret = {id: result.insertedId, error: error};
    res.status(200).json(ret);

});

module.exports = router;