const mongo = require('mongoose');

const date_rent = mongo.Schema({
   rentedDate:{
        type: String,
    },
    returnDate:{
        type: String,
        
    },
    actualReturnDate:{
        type: String,
        
    },
});
const book_rent_schema = mongo.Schema({//_id
    customerId:{
        type: String,
        required: true,      
    },
    isbn:{
        type: String,
        required: true,
    },
    libBookIds:{
        type:String,
        required:true
    },
    date: date_rent,
    status:{
        type:String,
        required:true,
        // default: '0'
    }
});

const book_rent = mongo.model('book_rent',book_rent_schema);
module.exports = book_rent;
