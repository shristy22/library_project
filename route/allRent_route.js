const router = require('express').Router();
const book_rent_model = require('../models/book_rent_schema');

router.get('/getAllRent',(req,res) => {
    if(req.body.status!= -1) {
        book_rent_model.find({status:req.body.status})
        .then((response) => res.json(response)).catch(err=>res.json(err));
    }
    else book_rent_model.find()
    .then((response) => res.json(response)).catch(err=>res.json(err));

});

module.exports = router;


