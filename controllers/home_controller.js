const Post = require('../models/post');
module.exports.home=function(req,res){

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


//populate the user of each post,without populating post.user in home.ejs was only showing the user id
  Post.find({}).populate('user').exec(function(err,posts){   //put find({name:'some name in database'}) and see result

  if(err)
  {
      console.log('error fetching from db');
      return;
  }

  res.render('home',{
     title:'CODEIAL',
     posts: posts
 
 });

})



 
}

module.exports.homes=function(req,res){

  
  return res.end('<h1>vadiya</h1>');
 
 
 
  
  
 }
 
