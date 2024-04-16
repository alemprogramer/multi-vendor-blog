let Post = require('../models/Post')

exports.likesGetController = async (req, res, next)=>{
    let {postId} = req.params
    
    let userId = req.user._id
    if(!req.user){
        return res.status(403).json({
            error:'Your are not authenticated user'
        })
    }
    let liked ;

    try {
        let post = await Post.findById(postId)
        if(post.dislikes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull:{dislikes:userId}}
            )
        }

        if(post.likes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull:{likes:userId}}
            )
            liked =false;
        }else{
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$push:{likes:userId}}
            )
            liked =true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            liked,
            totalLikes : updatedPost.likes.length,
            totalDisLikes : updatedPost.dislikes.length,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:'Server Error occurred'
        })
    }
}


exports.getDisLikesController = async (req,res, next)=>{
    let {postId} = req.params
    
    let userId = req.user._id
    if(!req.user){
        return res.status(403).json({
            error:'Your are not authenticated user'
        })
    }
    let disliked ;

    try {
        let post = await Post.findById(postId)
        if(post.likes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull:{likes:userId}}
            )
        }

        if(post.dislikes.includes(userId)){
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$pull:{dislikes:userId}}
            )
            disliked =false;
        }else{
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$push:{dislikes:userId}}
            )
            disliked =true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            disliked,
            totalLikes : updatedPost.likes.length,
            totalDisLikes : updatedPost.dislikes.length,
        })
        
    } catch (error) {
       next(error);
    }
}