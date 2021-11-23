// Connect to mongo
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

async function getTask(data){
    const db = client.db();
    var obj = await db.collection('tasks').findOne({_id: data});

    return obj;
}

module.exports = async function taskArr(data) {
    // data: task_arr
    let ret = [];
    
    function callback() {
        console.log("all done");
        return ret
    };
    var items = 0;

    data.task_arr.forEach(async(item, index, array) => {
        await ret.push(await getTask(item));
        items++;
        if(items === array.length)
        {
            callback();
        }
    });
}