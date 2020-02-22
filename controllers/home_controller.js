const Post = require('../models/post');
const User=require('../models/user');
//module.exports.home=function(req,res){

 //return res.end('<h1>HELLO!</h1>');

 //console.log(req.cookies);//to see the cookie
 //res.cookie('user_id',25);//to change the cookie value

 /*Post.find({},function(err,posts){   //put find({name:'some name in database'}) and see result

     if(err)
     {
         console.log('error fetching from db');
         return;
     }

     res.render('home',{
        title:'CODEIAL',
        posts: posts
    
    });

  });*/


//populate the user of each post,without populating ,posts.user in home.ejs was only showing the user id

module.exports.home=async function(req,res){      //async await

  try{

  let posts=await Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  });
   //put find({name:'some name in database'}) and see result

  

  let users=await User.find({});

    res.render('home',{
      title:'CODEIAL',
      posts: posts,
      all_users:users
    });
  }
  catch(err){
    console.log("error=",err);
    return;
  }
  
  

  





 
}

module.exports.homes=function(req,res){

  
  return res.end('<h1>vadiya</h1>');
 
 
 
  
  
 }
 
