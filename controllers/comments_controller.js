const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
module.exports.create = async function(req, res){

    try{

        let post=await Post.findById(req.body.post);

        if (post){
            let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post, //or post._id
                user: req.user._id
            });
                // handle error

                post.comments.push(comment);
                post.save();
               comment=await comment.populate('user','name email').execPopulate();
              //  commentsMailer.newComment(comment);

              //create new job in queue
              let job=queue.create('emails',comment).save(function(err){
                  if(err){
                      console.log('error in sending to the queue');
                      return;
                  }
                     console.log('job enqueued',job.id);  //every task put into queue is job;
              });
                req.flash('success','Comment Added!');
                res.redirect('/');
        
        }

    }catch(err){
        //console.log("error",err);
        req.flash('error',err);
        return;
    }


   


}

module.exports.destroy=async function(req,res){


try{


    
    let comment = await Comment.findById(req.params.id);

             
    if(comment.user==req.user.id){

          let postId=comment.post;
          comment.remove();

          let post=await Post.findByIdAndUpdate(postId, { $pull: 
            {comments:req.params.id }});
            req.flash('success','Comment Deleted');

                 return res.redirect('back');

                

    }else{
        req.flash('error','you cannot delete this comment');
        return res.redirect('back');
    }

}catch(err)
{
   // console.log('error',err);
   req.flash('error',err);
    return;
}





     





}