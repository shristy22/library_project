
const router = require('express').Router();
const book_rent = require("./models/book_rent_schema");


router.get('/try',async (req,res)=>{
  
  const a= await book_rent.find()
  console.log(a);

});

module.exports = router;
