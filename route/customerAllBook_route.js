const router = require('express').Router();
const customer_model = require('../models/customer_schema');
const book_model = require('../models/books_schema');


router.get('/customerAllBook',async(req,res)=>{
    const allBook = await book_model.find();
    // console.log(allBook);
    const response_arr =[];
    allBook.forEach((book)=>{
        let obj = {};
        obj.name = book.name,
        obj.author = book.author,
        obj.isbn = book.isbn,
        obj.quantity_available = book.quantity.Available,
        response_arr.push(obj)
    })
    res.json(response_arr);
    console.log(response_arr)
   
});

module.exports = router;
