const Post = require('../models/post');
const Comment=require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id  //req.user is current signed in user
        });
        
        if (req.xhr){      //html http reques(xhr request)
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy=async function(req,res){


     try{

        let post=await Post.findById(req.params.id);

        //.id means converting object id to string
        if(post.user==req.user.id){            //post.user gives id.user nott populated 
              post.remove();
        

        await Comment.deleteMany({post:req.params.id});
           

        req.flash('success','Post Deleted');
            return res.redirect('back');
        

    }
    else{
        req.flash('error','you cannot delete this post');
        return res.redirect('back');
    }

     }catch(err){
         //console.log('errr',err);
         req.flash('error',err);
     }


    

    


}