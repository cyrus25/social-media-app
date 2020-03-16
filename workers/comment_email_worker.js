
// inside the worker
const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//tell the worker whenever new task is entered into queue you need to run it
//put job inside queue
queue.process('emails',function(job,done){

   console.log('emails worker is processing the job',job.data);  //holds the data send in the comment

   commentsMailer.newComment(job.data);

   done();


});