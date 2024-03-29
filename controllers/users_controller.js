/*const  User=require('.//models/user');
module.exports.profile=function(req,res)
{
  // return res.end('<h1>user profile</h1>');
    return res.render('user_profile',{
        title:'COOOL'
    })
}
//render sign up
module.exports.signUp=function(req,res)
{
  return res.render('user_sign_up',{
  title :'Codeial|Sign Up'
})
}

//render sign in
module.exports.signIn=function(req,res)
{
  return res.render('user_sign_in',{
  title :'Codeial|Sign In'
})
}

module.exports.create=function(req,res){


if(req.body.password != req.body.confirm_password)
{
   return res.redirect('back');
}

User.findOne({email:req.body.email},function(err,user){

if(err){console.log('error findin user');return}

if(!user){
  User.create(req.body,function(err,user){
    if(err){console.log('error findin user');return}

    return res.redirect('users/sign-in');
  });
}
else{
  return res.redirect('back');
}



})


 




}

module.exports.createSession=function(req,res){
  
}

*/

const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res){

  try{

       let user= await  User.findById(req.params.id);

          return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });  

        
      }catch(err)
      {
        if(err)
        {
          req.flash('error',err);
          return res.redirect('back');
        }
      }



  
}

module.exports.update = async function(req, res){
 /* if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
          return res.redirect('back');
      });
  }else{
      return res.status(401).send('Unauthorized');
  }*/

  if(req.user.id == req.params.id){
    
    try{
        
      let user=await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){   //to read data from multipart form
        if(err){console.log("****MULTER ERROR!");}
        user.name=req.body.name;
        user.email=req.body.email;
        if(req.file)
        {

          if (user.avatar&&fs.existsSync(path.join(__dirname, '..', user.avatar))){   //delete the existing file

            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
           
        }  


          //this is saving the path of uploaded file in the avatar field in user
          user.avatar=User.avatarPath+'/'+req.file.filename;
        }
        user.save();
        return res.redirect('back');
      });



    }catch(err){
      req.flash('error',err);
      return res.redirect('back');
    }


    
}else{
    return res.status(401).send('Unauthorized');
}





}



// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

  if(req.isAuthenticated()){
    
    return res.redirect('/users/profile');
  }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }

  User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing up'); return}

      if (!user){
          User.create(req.body, function(err, user){
              if(err){console.log('error in creating user while signing up'); return}

              return res.redirect('/users/sign-in');
          })
      }
      else{
          return res.redirect('back');
      }

  });
}




// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

  req.logout();
  req.flash('success','Logged out successfully');
  res.redirect('/');
}
