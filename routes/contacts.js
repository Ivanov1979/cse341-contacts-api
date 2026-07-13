// ======================================================
// Import Express
//
// Express provides the Router object, which allows us
// to organize all contact-related endpoints in one file.
// ======================================================
const express = require("express");

// ======================================================
// Create a new router.
//
// Instead of putting every route inside server.js,
// we organize them into separate files.
//
// This follows the MVC architecture.
// ======================================================
const router = express.Router();

// ======================================================
// Import the Contacts Controller.
//
// The controller contains the logic for each endpoint.
//
// Router  --->  Controller  --->  Database
// ======================================================
const contactsController = require("../controllers/contacts");

// ======================================================
// GET /contacts
//
// Returns all contacts from MongoDB.
// ======================================================
router.get("/", contactsController.getAllContacts);

// ======================================================
// GET /contacts/:id
//
// Returns one contact using its MongoDB ObjectId.
//
// Example:
//
// GET /contacts/686ca4d2e123456789abcd12
// ======================================================
router.get("/:id", contactsController.getSingleContact);

// ======================================================
// POST /contacts
//
// Creates a new contact.
//
// The request body should contain:
//
// {
//   "firstName": "...",
//   "lastName": "...",
//   "email": "...",
//   "favoriteColor": "...",
//   "birthday": "..."
// }
// ======================================================
router.post("/", contactsController.createContact);

// ======================================================
// PUT /contacts/:id
//
// Updates an existing contact.
//
// Example:
//
// PUT /contacts/686ca4d2e123456789abcd12
// ======================================================
router.put("/:id", contactsController.updateContact);

// ======================================================
// DELETE /contacts/:id
//
// Deletes one contact.
//
// Example:
//
// DELETE /contacts/686ca4d2e123456789abcd12
// ======================================================
router.delete("/:id", contactsController.deleteContact);

// ======================================================
// Export the router so server.js can use it.
//
// server.js:
//
// app.use("/contacts", contactsRoutes);
// ======================================================
module.exports = router;