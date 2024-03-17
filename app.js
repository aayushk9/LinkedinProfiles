require("dotenv").config()
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");  
const User = require('./models/userprofiles')
const app = express();
const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

mongoose.connect(URI);
const database = mongoose.connection;     

database.on('err', (err) => {   
    console.log(err);
});         

database.once('connected', () => {
   console.log('Database connected to server');  
})

app.get('/mynetwork', async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const skip = (page - 1) * perPage;

      const users = await User.find()
          .skip(skip)
          .limit(perPage)
          .exec();

      // Render the index.ejs view and pass necessary variables
      res.render('index', { users: users, page: page, perPage: perPage });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


app.listen(PORT, () => {
    console.log("Server is listening on port 3000"); 
});

 