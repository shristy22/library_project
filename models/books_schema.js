const mongo = require('mongoose');
const qty_schema = mongo.Schema({
    Available:{
        type:Number,
        default:0
    },
    Rented:{
        type:Number,
        default:0
    },
    Total:{
        type:Number,
        default:0
    }
});
const libId_schema = mongo.Schema({
    Available:{
        type:Array,
        default:[]
    },
    Rented:{
        type:Array,
        default:[]
    },
    All:{
        type:Array,
        default:[]
    }
});
const book_schema = mongo.Schema({
    name:{
        type: String,
        required: true
    },
    isbn:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },
    quantity:qty_schema,
    book_rent_id:{
        type:Array,
    },
    libBookIds:libId_schema
});

const book = mongo.model('book',book_schema);
module.exports = book;
