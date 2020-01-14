const express=require('express');
const app=express();
const port=8000;

//setting routes
app.use('/',require('./routes'));

//setting view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is there: ${err}`);
    }

    console.log(`server running on port: ${port}`);
});
