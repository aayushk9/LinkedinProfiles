const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    
    about: {
       type: String
    }
} , { collection: 'profileSchema' }); 

const user =  mongoose.model('user', profileSchema);

module.exports = user;