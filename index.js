const express=require('express');  //to update nodejs- npm install -g npm
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');


app.use(expressLayouts);

//setting routes                       
app.use('/',require('./routes'));            //for commiting git add . then git commit -m '   '

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
