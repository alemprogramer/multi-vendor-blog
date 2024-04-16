const Router = require('../utils/method');
const {auth} = require('../middlewares/authMiddleware');

const { createPostController, getASinglePost, getAllPost, updatePostController, deletePostController,sharePostController } = require('../controller/postController');

const routerFun = (req, res) => {
    const router = new Router(req, res);

    router.post('/create-post', auth, createPostController);
    router.get('/all-post', auth, getAllPost);
    router.get('/post-details/:postId', getASinglePost);
    router.put('/update-post/:postId', auth, updatePostController);
    router.delete('/delete-post/:postId', auth, deletePostController);
    router.post('/post-share/:postId', auth, sharePostController)
    router.end();

}

module.exports = routerFun;