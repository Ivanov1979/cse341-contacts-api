const express = require("express");
const cors = require("cors");
const contactsRoutes = require("./routes/contacts");
const { connectDB } = require("./db/connect");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });