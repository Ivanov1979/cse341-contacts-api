const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

async function getAllContacts(req, res) {
    const db = getDb();

    const contacts = await db
        .collection("contacts")
        .find()
        .toArray();

    res.status(200).json(contacts);
}

async function getSingleContact(req, res) {
    const db = getDb();

    const contactId = new ObjectId(req.params.id);

    const contact = await db
        .collection("contacts")
        .findOne({ _id: contactId });

    res.status(200).json(contact);
}

module.exports = {
    getAllContacts,
    getSingleContact
};