const router = require('express').Router();
const customer_model = require('../models/customer_schema');
const book_model = require('../models/books_schema');
//customer Register
router.post('/customerRegister', async(req,res)=>{
    const object = {
        name : req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        password: req.body.password
    }
    console.log(object);
    if(object.name&&object.email&&object.phone&&object.password){   
        const customer = new customer_model(object);

        const exist_email = await customer_model.findOne({email: object.email});
        const exist_phone = await customer_model.findOne({phone: object.phone});

        if(exist_email)    
         res.json('this email already exist');
        else if(exist_phone) 
         res.json('this phone number already exist');
        else 
        customer.save().then((response)=>res.json(response)).catch((err)=>{res.json(err)});       
        }
    else res.json('please write all the credentials');
   });

//customer login
router.post('/customerLogin',async (req,res)=>{
    console.log("customer Login me jao")

    const customer_login = {
        email: req.body.email,
        password: req.body.password
         };
        //  console.log(admin_login);
     if(customer_login.email && customer_login.password)
     {
        
       const exist_email =  await customer_model.findOne({email:customer_login.email});  
       console.log(exist_email);
       
        if(exist_email)
        {
            if(exist_email.password === customer_login.password)
                res.json('yes you are logged in');
            else
            res.json('enter correct password');   
        }
     }   
     else
     res.json('Please enter the details to login') 

});  

//customer all
router.get('/customerAll',async(req,res)=>{
    console.log('customer all data');

    const cust_all = await customer_model.find();
    res.json(cust_all);
    console.log(cust_all);
});

//all book


module.exports = router;



