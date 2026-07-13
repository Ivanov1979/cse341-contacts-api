const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const contactsRoutes = require("./routes/contacts");
const { connectDB } = require("./db/connect");
const swaggerDocument = require("./swagger.json");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
    res.send("Welcome to the CSE341 Contacts API!");
});

app.use("/contacts", contactsRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
    });
