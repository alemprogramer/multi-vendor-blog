const timeCount = require('../utils/reading-time');
const Post = require('../models/Post');
exports.createPostController = async (req, res, next) => {

    try {
        await Post.create({...req.body,author:req.id,readTime:timeCount(req.body.body) });
        res.status(201).json({message: "Your post has been created successfully."});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getAllPost = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const skip = (page - 1) * pageSize;
        const posts = await Post.find({author:req.id}).limit(pageSize).skip(skip);
        const total = await Post.find({author:req.id}).countDocuments()
        res.json({
            posts,
            page,
            size: pageSize,
            totalPosts:total

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getASinglePost = async (req, res, next) =>{
    try {
        const post = await Post.findById(req.params.postId)
                    .populate({
                        path:'author',
                        select:"email",
                        populate:{
                            path:'profile',
                            select:'name'
                        }
                    });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.updatePostController = async (req,res,next)=>{
    try {
        const updatedPost = await Post.findOneAndUpdate({_id:req.params.postId,author:req.id}, {...req.body,readTime:timeCount(req.body.body)}, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: `Your post has been updated successfully`});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deletePostController = async (req,res,next)=>{
    try {
        const deletedPost = await Post.deleteOne({_id:req.params.postId,author:req.id});
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.sharePostController = async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.postId);

        post.numbersOfShare = post.numbersOfShare+1
        post.shares = [...post.shares,req.id]
        await post.save();
        res.json({ message: 'Post share successfully' });
    } catch (error) {
        next(error);
    }
}
