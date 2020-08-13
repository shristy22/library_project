const mongo = require('mongoose');
const mongo_url = 'mongodb://localhost/twelth';

mongo.connect(mongo_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify:true,
    useFindAndModify: false 

});
const db = mongo.connection;
db ? console.log('Database Connected Successfully to:  '+ mongo_url) : console.log('error');
module.exports = db;


