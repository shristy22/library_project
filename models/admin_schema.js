const mongo = require('mongoose');
const admin_schema = mongo.Schema({
    name:{
        type: String,
        required: true,
       
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    }
});
const login = mongo.model('login',admin_schema);
module.exports = login;