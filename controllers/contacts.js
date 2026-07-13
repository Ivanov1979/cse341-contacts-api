// ======================================================
// Import ObjectId from MongoDB.
// ======================================================
const { ObjectId } = require("mongodb");

// ======================================================
// Import the database connection.
// ======================================================
const { getDb } = require("../db/connect");


// ======================================================
// GET /contacts
//
// Return every contact in the contacts collection.
// ======================================================
async function getAllContacts(req, res) {

    try {

        const db = getDb();

        const contacts = await db
            .collection("contacts")
            .find()
            .toArray();

        res.status(200).json(contacts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


// ======================================================
// GET /contacts/:id
//
// Return one contact using its MongoDB ObjectId.
// ======================================================
async function getSingleContact(req, res) {

    try {

        if (!ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                message: "Invalid contact ID."
            });

        }

        const db = getDb();

        const contactId = new ObjectId(req.params.id);

        const contact = await db
            .collection("contacts")
            .findOne({
                _id: contactId
            });

        if (!contact) {

            return res.status(404).json({
                message: "Contact not found."
            });

        }

        res.status(200).json(contact);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


// ======================================================
// POST /contacts
//
// Create a new contact.
// ======================================================
async function createContact(req, res) {

    try {

        const db = getDb();

        const newContact = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday

        };

        const result = await db
            .collection("contacts")
            .insertOne(newContact);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


// ======================================================
// PUT /contacts/:id
//
// Update an existing contact.
// ======================================================
async function updateContact(req, res) {

    try {

        if (!ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                message: "Invalid contact ID."
            });

        }

        const db = getDb();

        const contactId = new ObjectId(req.params.id);

        const updatedContact = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday

        };

        const result = await db
            .collection("contacts")
            .replaceOne(
                {
                    _id: contactId
                },
                updatedContact
            );

        if (result.matchedCount === 0) {

            return res.status(404).json({
                message: "Contact not found."
            });

        }

        return res.status(204).send();

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


// ======================================================
// DELETE /contacts/:id
//
// Delete one contact.
// ======================================================
async function deleteContact(req, res) {

    try {

        if (!ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                message: "Invalid contact ID."
            });

        }

        const db = getDb();

        const contactId = new ObjectId(req.params.id);

        const result = await db
            .collection("contacts")
            .deleteOne({
                _id: contactId
            });

        if (result.deletedCount === 0) {

            return res.status(404).json({
                message: "Contact not found."
            });

        }

        return res.status(200).json({
            message: "Contact deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


// ======================================================
// Export every controller.
// ======================================================
module.exports = {

    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact

};