const router = require('express').Router();
const admin_model = require('../models/admin_schema');
const book_model = require('../models/books_schema');
const book_rent_model = require('../models/book_rent_schema');

const { response } = require('express');
const book = require('../models/books_schema');

router.get('/',(req,res) => {
    // console.log(req.session)
    const {userId} = req.session

    res.send(`
    <h1>Welcome to library</h1>
    <a href='/adminRegister'>Admin Register</a>
    <br/>
    <a href='/adminLogin'>Admin Login</a>
    <br/>
    <a href='/home'>Home</a>
    <form method='post' action='/logout'>
         <button>Logout</button>
    </form>
    `)
})

//admin Register
router.get('/adminRegister' ,(req,res) => {
    res.send(`
        <h1>Login<h1>
        <form method ='post' action='/api/admin/adminRegister' >
            <input type = 'name' name ='name' placeHolder ='Name' required />
            <input type = 'email' name ='email' placeHolder ='Email' required />
            <input type = 'address' name ='address' placeHolder ='Address'  />
            <input type = 'password' name ='password' placeHolder ='Password' required />
            <input type= 'submit'>
        </form>    
    `)
})
router.post('/adminRegister', async (req, res) => {
    console.log("register me jao");

    const admin_register = new admin_model({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
     });
    admin_register.save().then((response) => { res.json(response) })
        .catch((err) => { res.json('This email already exist, try different email.') });
    console.log('admin register');
});
router.get('/adminLogin' ,(req,res) => {
    // req.session.userId

    res.send(`
        <h1>Login<h1>
        <form method ='post' action='/api/admin/adminLogin' >
            <input type = 'email' name ='email' placeHolder ='Email' required />
            <input type = 'password' name ='password' placeHolder ='Password' required />
            <input type= 'submit'>
        </form>    
    `)
})
//admin login
router.post('/adminLogin', async (req, res) => {
    console.log("Login me jao")

    const admin_login = {
        email: req.body.email,
        password: req.body.password
    };
    //  console.log(admin_login);
    if (admin_login.email && admin_login.password) {
        console.log('going')
        const exist_email = await admin_model.findOne({ email: admin_login.email });
        console.log(exist_email)
        if (exist_email) {
            if (exist_email.password === admin_login.password)
                res.json('yes you are logged in');
            else
                res.json('enter correct password');
        }
    }
    else
        res.json('Please enter the details to login')

});
router.post('/logout',(req,res) => {

});
//admin all
router.get('/adminAll', async (req, res) => {
    const get_all = await admin_model.find();
    res.json(get_all);
    console.log(get_all);
});
//RED CODER
router.post('/addBook', async (req, res) => {

    const book_exist = await book_model.findOne({ isbn: req.body.isbn });
    //awesome code one try man 
    if (!book_exist) {
        const newArr = [];
        for (var i = 1; i <= req.body.qty; i++) 
        {
            var newId = req.body.isbn + '_' + i;
            newArr.push(newId);
        }
        const newBook = new book_model({
            name: req.body.name,
            isbn: req.body.isbn,
            author: req.body.author,
            quantity:
            {
                Available: req.body.qty,
                Rented: 0,
                Total: req.body.qty
            },
            libBookIds: {
                Available: newArr,
                All: newArr
            }
        });
        

        newBook.save().then(response => res.json(response)).catch(err => {res.json(err);console.log(err)});
    }
    else { 
        //ye bhi chal gaya bro ek baar me tu hi hai hero bro take chill pill enjoy         
        var prev_Avail_array = book_exist.libBookIds.Available;
        var prev_All_array = book_exist.libBookIds.All;
        for(var i =1; i<= req.body.qty;i++)
        {
            var p = i + parseInt(book_exist.quantity.Total)
            const temp = req.body.isbn + '_' + p;
           prev_Avail_array.push(temp);
           prev_All_array.push(temp);
        }
        const qty_obj = {
            Available: book_exist.quantity.Available + parseInt(req.body.qty),
            Rented: book_exist.quantity.Rented,
            Total: book_exist.quantity.Total + parseInt(req.body.qty),
        }
        const libId_obj = {
            Available:prev_Avail_array,
            Rented:book_exist.libBookIds.Rented,
            All:prev_All_array,
        }
        const UpdateBook = await book_model.findOneAndUpdate({isbn:req.body.isbn},{quantity:qty_obj,libBookIds:libId_obj});
        if(UpdateBook){
            book_model.find({isbn:req.body.isbn}).then(response => res.json(response)).catch(err => res.send(err));
        }
        else res.send('something is wrong');
    }
});
router.get('/allBook', async (req, res) => {
    const book = await book_model.find();
    res.json(book);
});
router.post('/deleteBook', async (req, res) => {
    const del_book = await book_model.findOneAndDelete({ isbn: req.body.isbn });
    res.json('This book has been deleted');
});
router.post('/updateBook', async (req, res) => {
    console.log('go')
    const book = {
        name: req.body.name,
        isbn: req.body.isbn_new,
        author: req.body.author
    }
    const update_book = await book_model.findOneAndUpdate({ isbn: req.body.isbn }, book);
    console.log(update_book);
    res.json('your book is updated');
});
    
router.get('/actualReturnDate',async(req,res)=>{
    const actual_return_date = await book_rent_model.find();
    res.json(actual_return_date);
}); 

module.exports = router;
/*
const prev_Avail_array = book_exist.libBookIds.Available;
        const prev_All_array = book_exist.libBookIds.All;
        //for making new ids
        for (var i = 1; i <= req.body.qty; i++) {
            var temp = book_exist.quantity.Total + i;
            var newId = req.body.isbn +'__'+ temp;
            prev_Avail_array.push(newId);
            prev_All_array.push(newId);
        }
        //to save in bokk schema quantity
        const obj = {
            Available: parseInt(req.body.qty) + book_exist.quantity.Available,
            Rented: book_exist.quantity.Rented,
            Total: parseInt(req.body.qty) + book_exist.quantity.Total
        };
        // to save in book schema libBookIds
        const lib_obj = {
            Available: prev_Avail_array,
            Rented: book_exist.libBookIds.Rented,
            All: prev_All_array
        }
        book_model.findOneAndUpdate({ isbn: req.body.isbn }, { quantity: obj, libBookIds: lib_obj })
            .then(response => {
                book_model.findOne({ isbn: req.body.isbn }).then(response2 => res.json(response2))
            }).catch(err => res.json(err));


*/

