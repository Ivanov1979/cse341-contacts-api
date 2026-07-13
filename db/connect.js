// ======================================================
// Import the MongoClient class from the MongoDB package.
//
// MongoClient is responsible for creating the connection
// between our Node.js application and MongoDB Atlas.
// ======================================================
const { MongoClient } = require("mongodb");

// ======================================================
// Load environment variables from the .env file.
//
// This allows us to safely access the MongoDB connection
// string without hardcoding it into our application.
// ======================================================
require("dotenv").config();

// ======================================================
// Create a new MongoDB client.
//
// process.env.MONGODB_URI reads the connection string
// stored inside the .env file.
//
// Example:
//
// mongodb+srv://username:password@cluster...
// ======================================================
const client = new MongoClient(process.env.MONGODB_URI);

// ======================================================
// Variable that will store our database connection.
//
// It starts undefined and is assigned after we
// successfully connect to MongoDB.
// ======================================================
let db;

// ======================================================
// Connect to MongoDB.
//
// This asynchronous function:
//
// 1. Connects to MongoDB Atlas.
// 2. Selects the "cse341" database.
// 3. Saves the database connection so the rest of the
//    application can use it.
//
// It returns a Promise, which is why server.js uses:
//
// connectDB()
//      .then(...)
//      .catch(...)
// ======================================================
async function connectDB() {

    // Connect to MongoDB Atlas
    await client.connect();

    // Select the database
    db = client.db("cse341");

    console.log("✅ Connected to MongoDB");
}

// ======================================================
// Return the database connection.
//
// Controllers call this function whenever they need
// to access a collection.
//
// Example:
//
// const db = getDb();
// const contacts = db.collection("contacts");
//
// ======================================================
function getDb() {
    return db;
}

// ======================================================
// Export the functions so they can be used by other
// files such as:
//
// server.js
// controllers/contacts.js
// ======================================================
module.exports = {
    connectDB,
    getDb
};