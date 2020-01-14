const express=require('express');  //to update nodejs- npm install -g npm
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));  //including css js and images files



app.use(expressLayouts);


//extract style and scripts from subpages into layput
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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
