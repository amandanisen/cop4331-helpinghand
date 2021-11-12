// Establish needed requirements
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkLogin = require('../validation/login');
const sendEmail = require('../../utilities/sendEmail');
const key = require("../../utilities/keys");
const checkReg = require('../validation/registration.js');

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

// Create Coordinator
router.post('/register', async(req, res) =>
{
    // input: firstname, lastname, location, email, password1, password 2
    // output: id, firstname, lastname, error
    let error = {};
    const db = client.db();

    const {email, password1, password2, first_name, last_name, location} = req.body;
    const data = 
    {
        email: email,
        password1: password1,
        password2: password2,
        role: 'Coordinator'
    };

    var responsePackage = {id: -1, first_name: '', last_name: '', error: {}};

    // check validity of input
    const {errors, isValid} = checkReg.checkRegistrationFields(data);

    if (!isValid)
    {
        responsePackage.error = errors;
        return res.status(400).json(responsePackage);
    }
    
    // check to see if email has already been used
    const emailCheck = await db.collection('coordinator').find({coord_email: email}).toArray();
    if (emailCheck.length > 0)
    {
        responsePackage.error.email = 'this email is already in use';
        
        return res.status(200).json(responsePackage);
    }

    // generate random token for email verification
    var token;
    crypto.randomBytes(48, function(err, buffer) {
        token = buffer.toString('hex');
    });
    
    // password encryption
    bcrypt.genSalt(12, async (err, salt) => {
        if (err) throw err;

        bcrypt.hash(data.password1, salt, async (err, hash) => {
            if (err) throw err;

            // new coord object
            const newCoord = {coord_email: email, 
                    coord_first_name: first_name, coord_last_name: last_name, token: token,
                    coord_location: location, coord_pw: hash, email_verified: "f",
                    token_used: "f"};
            const results = await db.collection('coordinator').insertOne(newCoord);

            if (results.length == 0)
            {
                responsePackage.error.database = 'could not insert coordinator';
                return res.status(400).json(responsePackage);
            }
            responsePackage = {id: results.insertedId, first_name: first_name, last_name: last_name, error: {}};
            

            // Send verification email
            let to = [newCoord.coord_email];

            let sub = "Confirm Registration";

            let link = "https://localhost:3000/coord/verify/" + newCoord.token;

            let content = 
                "<body><p>Please verify email.</p> <a href=" + 
                link + 
                ">Verify email</a></body>";
            sendEmail.Email(to, sub, content);

            // After successful email sending, return json data for user
            return res.status(200).json(responsePackage);
        })
    })
})

// Coordinator Login
router.post('/login', async(req, res) =>
{
    // input: email, password
    // return: id, firstName, lastName, error
    var error = '';
    const db = client.db();
    const {email, password} = req.body;

    // Check if input is valid
    const validity = checkLogin(req.body);
    if (!validity.isValid)
    {
        return res.status(400).json(validity.errors);
    }

    // ensure that the email exists & has been verified
    var results = await db.collection('volunteer').findOne({vol_email: email, email_verified: "t"});

    if (!ifEmpty(results))
    {
        // Check if hashed password matches input
        await bcrypt.compare(password, results.vol_pw).then(isMatch => {
            if (isMatch) {
                const payload = {id: results._id, email: results.vol_email, first_name: results.vol_first_name,
                     last_name: results.vol_last_name};
                jwt.sign(
                    payload,
                    key.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        return res.status(200).json(payload);
                    }
                );
                return;
            } else {
                return res.status(400).json("Wrong password");
            }
        });
    }
    else
    {
        error = 'Invalid username/password';
        return res.status(400).json({id: -1, firstName: '', lastName: '', error: error});
    }
})

// Verify Coordinator email
router.post('/verify/:token', async(req, res) => {
    const {token} = req.params;
    const db = client.db();
    const errors = {};

    const results = await db.collection('coordinator').find({token: token, token_used: 'f'})

    if (results.length == 0)
    {
        const emailVerify = await db.collection('coordinator').find({token: token, email_verified: "t"});
        if (emailVerify.length > 0)
            return res.json("Email has already been verified!");
        return res.json("Verification token invalid");
    }

    const update = await db.collection('coordinator').updateOne({token: token},{$set : {email_verified: "t", token_used: "t"}});

    return res.json("Email verified! Please login to your account");

})

module.exports = router;