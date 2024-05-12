const Profile = require('../models/Profile')

exports.bookmarksGetController = async (req, res, next)=>{
    let {postId} = req.params
    
    if(!req.user){
        return res.status(403).json({
            error:'Your are not authenticated user'
        })
    }
    let bookmark;
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if(!profile){
            return res.status(403).json({
                error:'Your are not authenticated user'
            })
        }
        if(profile.bookmark.includes(postId)){
            await Profile.findOneAndUpdate(
                {user: req.user._id},
                {$pull:{bookmark:postId}}
            )
            bookmark =false
        }else{
            await Profile.findOneAndUpdate(
                {user: req.user._id},
                {$push:{bookmark:postId}}
            )
            bookmark = true
        }
        res.status(200).json({bookmark})

    } catch (error) {
        next(error)
    }
}