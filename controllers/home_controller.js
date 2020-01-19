module.exports.home=function(req,res){

 //return res.end('<h1>HELLO!</h1>');

 console.log(req.cookies);//to see the cookie
 res.cookie('user_id',25);//to change the cookie value

 return res.render('home',{
   title: 'CODEIAL'
 });
}

module.exports.homes=function(req,res){

  
  return res.end('<h1>vadiya</h1>');
 
 
 
  
  
 }
