const connectDB = require("./config/db");
const path = require("path");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());


const { rejects } = require("assert");

// Connect Database
connectDB();

// Initialize the Middleware  
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }))

//instantiate the  models
require('./models/admin')
require('./models/customer')

//routes
app.use(require('./routes/loginroute'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));