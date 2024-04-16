const Comments = require('../models/comments')
const Post = require('../models/Post')

exports.commentsPostController = async (req, res, next)=>{
    let {postID} = req.params;
    let {body} = req.body;

    if(!req.user){
        return res.status(403).json({
            error:'Your are not authenticated user'
        })
    }

    let comments = new Comments({
            post:postID,
            user:req.user._id,
            body,
            replies:[]
    })
    try {
        let createComment = await comments.save()
        await Post.findOneAndUpdate(
            {_id:postID},
            {$push: {comments:createComment._id}}
        )

        let commentsJSON = await Comments.findById({_id:createComment._id}).populate({
            path:'user',
            select: 'name profilePics'
        })
        console.log('commentsJSON',commentsJSON);
        return res.status(200).json(commentsJSON)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:'Server Error occurred'
        })
    }


}




exports.replyCommentsPostController = async (req, res, next)=>{
    
    let {commentID} = req.params
    let {body} = req.body
    console.log(body);

    if(!req.user){
        return res.status(403).json({
            error:'Your are not authenticated user'
        })
    }

    let reply = {
        body,
        user: req.user._id,
    }
    try {
        await Comments.findByIdAndUpdate(
            {_id: commentID },
            {$push:{replies:reply}}
        )
        
        let commentsJSON = await Comments.findById(commentID).populate({
            path:'user',
            select: 'profilePics name'
        })
        return res.status(200).json({commentsJSON})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:'Server Error occurred'
        })
    }



}