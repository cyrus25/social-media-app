const nodeMailer=require('../config/nodemailer');

exports.newComment = (comment)=>{
   // console.log('inside new comment mailer',comment);

   let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');


  
    nodeMailer.transporter.sendMail({
        from: 'cyruspassi@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
       // html: '<h1>Yup, your comment is now published!</h1>'
        html:htmlString 
     }, (err, info) => {
         if (err){
             console.log('Error in sending mail', err);
             return;
         }
 
         //console.log('Message sent', info);
         return;
     });
 }