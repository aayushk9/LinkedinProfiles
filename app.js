require("dotenv").config() 
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");  
const bodyParser = require('body-parser');
const User = require('./models/userprofiles');
const app = express();
const PORT = process.env.PORT || 3000       
const URI = process.env.MONGODB_URI;  

     
app.set('view engine', 'ejs');    
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));    
app.use(bodyParser.json());   

mongoose.connect(URI);  
const database = mongoose.connection;       

database.on('err', (err) => {   
    console.log(err);
});         

database.once('connected', () => {
   console.log('Database connected to server');  
})

app.route('/mynetwork')
  .get(async (req, res) => {   
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 7; 
        const skip = (page - 1) * perPage;

        const users = await User.find()
            .skip(skip)
            .limit(perPage)
            .exec();

        res.render('index', { users: users, page: page, perPage: perPage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });     
    }      
  })
  .post(async (req, res) => {
    try {
      const { username, about } = req.body;
      const newUser = new User({ username, about });
      await newUser.save();
      res.redirect('/mynetwork'); // Redirect back to /mynetwork after adding user
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });       
    }
  });


app.listen(3000, () => {
    console.log(`Server is listening on port 3000`)  
});
   