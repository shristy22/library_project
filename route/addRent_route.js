const router = require('express').Router();
const book_rent_model = require('../models/book_rent_schema');
const customer_model = require('../models/customer_schema');
const book_model = require('../models/books_schema');

//add book to rent 

const getRentDate = () =>{
    const dt =  new Date("2020-11-26");
    var rent_date = dt.getDate().toString() + '-' + ((dt.getMonth()+1).toString()) + '-' + dt.getFullYear().toString();
    return rent_date;
}
const getreturnDate = () =>{
    const dt =  new Date("2020-11-26");
    var rent_date = dt.getDate().toString().padStart(2,'0') + '-' + (((dt.getMonth()+4)%12)===0 ? 11:((dt.getMonth()+4)%12)).toString().padStart(2,'0') + '-' + (dt.getFullYear()+1).toString();
    return rent_date;
}
const getactualReturnDate = () =>{
    const dt =  new Date(); 
    var rent_date = dt.getDate().toString().padStart(2,'0') + '-' + dt.getMonth().toString().padStart(2,'0') + '-' + dt.getFullYear().toString();
    return rent_date;
}

router.post('/addBookToRent',async(req,res)=>{
    const exist_customer = await customer_model.findOne({_id:req.body.customer_id});
    //if customer exist
    if(exist_customer)
    {
     const exist_book = await book_model.findOne({isbn:req.body.isbn});
    
     if(exist_book){
        const avail_book = exist_book.quantity.Available;
        console.log(avail_book);
        if(avail_book > 0){
           const prev_avail_id = exist_book.libBookIds.Available;

           const to_rent_id = prev_avail_id[0];
           console.log(to_rent_id);   

           const a= prev_avail_id.shift();
           console.log(a);

           const prev_rented_id = exist_book.libBookIds.Rented;
           const b = prev_rented_id.push(to_rent_id);
           console.log(b);
       
           const datObj={
            rentedDate: getRentDate(),  
            returnDate: getreturnDate(),
            // actualReturnDate: getactualReturnDate() 
                      }

           const add_rent = new book_rent_model({
            customerId: req.body.customer_id,
            isbn: req.body.isbn,
            libBookIds: to_rent_id,
            date: datObj,
            status:'1'
           });
           console.log(add_rent);
           const lib_id_obj = {
            Available:prev_avail_id,
            Rented:prev_rented_id,
            All:exist_book.libBookIds.All
           };
           console.log(lib_id_obj);
           const qty_obj = {
               Available:parseInt(exist_book.quantity.Available) - 1,
               Rented:parseInt(exist_book.quantity.Rented) + 1,
               Total:exist_book.quantity.Total,
           }
           console.log(qty_obj);
           var prev_book_rent_id = exist_book.book_rent_id;             
           console.log(prev_book_rent_id);

           add_rent.save().then(response => {                
            prev_book_rent_id.push(response._id)
            console.log(prev_book_rent_id)
            book_model.findOneAndUpdate({ isbn: req.body.isbn },
                 { quantity: qty_obj, libBookIds: lib_id_obj,book_rent_id: prev_book_rent_id })
            .then(response2 => {res.json(response)})
            .catch(err => res.json(err))})
            .catch(err => {console.log(err);res.json(err)});}

            // const test = await book_rent_model.findOne({isbn:req.body.isbn})
            // console.log(test);
        
        else
        res.json('This book is not available now, all rented');
     }
     else
     res.json('no book of this isbn exists');
    }
    else res.json('No customer id, you need to login first and then try again.'); 
    });

   
   
module.exports = router;
