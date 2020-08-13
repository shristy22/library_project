const mongo = require('mongoose');
const customer_schema = mongo.Schema({
    name:{
        type: String,
        required: true,
       
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    }

});
const customer = mongo.model('customer',customer_schema);
module.exports = customer;