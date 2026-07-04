const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
    await client.connect();
    db = client.db("cse341");
    console.log("Connected to MongoDB");
}

function getDb() {
    return db;
}

module.exports = { connectDB, getDb };