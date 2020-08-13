const router = require('express').Router();
const customer_model = require('../models/customer_schema');
const book_model = require('../models/books_schema');
const book_rent_model = require('../models/book_rent_schema');


router.get('/customerRentedBook',async(req,res)=>{

    const exist_customer = await customer_model.findOne({_id:req.body.customer_id});
    if(exist_customer){
        const rented_customer = await book_rent_model.find({customerId:req.body.customer_id,status:'1'});
        res.json(rented_customer);
    }
    else
    res.json("This customer doesn't exist");
    // const allBook = await book_model.find();
    // const response_arr =[];
    // allBook.forEach((book)=>{
    //     let obj = {};
    //     obj.name = book.name,
    //     obj.author = book.author,
    //     obj.isbn = book.isbn,
    //     obj.quantity_available = book.quantity.Available,
    //     response_arr.push(obj)
    // })
    // res.json(response_arr);
   
});

module.exports = router;