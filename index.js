const express = require('express');
const app = express();
const db = require('./db/db');
const bodyparser = require('body-parser');
const adminapiroute = require('./route/admin_route');
const customerapiroute = require('./route/customer_route');
const addRent = require('./route/addRent_route');
const allRent = require('./route/allRent_route');
const returnBook = require('./route/returnBook_route');
const customerAllBook = require('./route/customerAllBook_route');
const customerRentedBook = require('./route/customerRentedBook_route');
const test = require('./try');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/api/admin',adminapiroute);
app.use('/api/customer',customerapiroute);
app.use('/api/customer',customerAllBook);
app.use('/api/customer',customerRentedBook);
app.use('/api/rent',addRent);
app.use('/api/rent',allRent);
app.use('/api/return',returnBook);
app.use('/api',test);

app.listen(3000, console.log('server started at port 8000'));


