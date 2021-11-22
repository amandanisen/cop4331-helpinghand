// Connect to mongo
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

module.exports = async function findUser(data) {
    const db = client.db();
    const {email, role} = data;

    let id;
    if (role == 'volunteer')
        id = await db.collection(role).findOne({vol_email: email});
    else 
        id = await db.collection(role).findOne({coord_email: email});

    return id._id;
}