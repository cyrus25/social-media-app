//requuire the library

const mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/codeial_development',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//acquire the connection to see if successfull
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running and print the message
db.once('open',function(){
    console.log('connected to the database');
});


module.exports=db;