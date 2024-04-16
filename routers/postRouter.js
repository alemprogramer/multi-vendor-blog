const Router = require('../utils/method');
const {auth} = require('../middlewares/authMiddleware');

const { createPostController, getASinglePost, getAllPost, updatePostController, deletePostController,sharePostController } = require('../controller/postController');
const {
    commentsPostController,
    replyCommentsPostController
} = require('../controller/commentsController')
const {
    likesGetController,
    getDisLikesController
} = require('../controller/likeDislikeController')
const {
    bookmarksGetController
} = require('../controller/bookmarksController')






const routerFun = (req, res) => {
    const router = new Router(req, res);

    router.post('/create-post', auth, createPostController);
    router.get('/all-post', auth, getAllPost);
    router.get('/post-details/:postId', getASinglePost);
    router.put('/update-post/:postId', auth, updatePostController);
    router.delete('/delete-post/:postId', auth, deletePostController);
    router.post('/post-share/:postId', auth, sharePostController);

    router.post('/comments/:postID',auth,commentsPostController)
    router.post('/comments/reply/:commentID',auth,replyCommentsPostController)

    router.get('/likes/:postId',auth,likesGetController)
    router.get('/dislikes/:postId',auth,getDisLikesController)

    router.get('/bookmarks/:postId',auth,bookmarksGetController)
    router.end();

}

module.exports = routerFun;