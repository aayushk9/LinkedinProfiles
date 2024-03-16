require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");  
const users = require('./models/userprofiles')
const app = express();
const URI = process.env.MONGODB_URI

app.use(express.json());

mongoose.connect(URI);
const database = mongoose.connection;     

database.on('err', (err) => {
    console.log(err);
});

database.once('connected', () => {
   console.log('Database connected to server');  
})

app.get('/mynetwork', (req, res) => {
    res.send("Explore profiles");
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000"); 
});

