const express=require('express');  //to update nodejs- npm install -g npm
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
const flash=require('connect-flash');
const customWare=require('./config/middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));




//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser()); //npm install cookie-parser


app.use(express.static('./assets'));  //including css js and images files

//make the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));  //codeial+uploads availabe in /uploads route


app.use(expressLayouts);


//extract style and scripts from subpages into layput
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//setting view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the seesion cookie in db
app.use(session({
  name: 'codeial',
  //todo change secret before deployment
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie:{
      maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore({

     mongooseConnection: db,
     autoRemove: 'disabled'

  },
  function(err){
      console.log(err||"connected to mongo store");
  }
  )

})
);

app.use(passport.initialize());
app.use(passport.session());



app.use(passport.setAuthenticatedUser);


app.use(flash());  //uses session cookies
app.use(customWare.setFlash);

//setting routes                       
app.use('/',require('./routes'));            //for commiting git add . then git commit -m '   '

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is there: ${err}`);
    }

    console.log(`server running on port: ${port}`);




});


