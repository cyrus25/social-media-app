module.exports.home=function(req,res){

 //return res.end('<h1>HELLO!</h1>');



 return res.render('home',{
   title: 'CODEIAL'
 });
}