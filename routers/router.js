const url = require('url');
const userRouter = require('../routers/userRouter');
const authRouter = require('../routers/authRouter');
const postRouter = require('../routers/postRouter');
const routers = [
    {
        path:'/post',
        handler: postRouter
    },
    {
        path: '/auth',
        handler: authRouter
    },
    {
        path:'/user',
        handler:userRouter
    },
    {
        path:'/posts',
        handler:(req,res)=>{
            res.end('from post')
        }
    }
]

module.exports = (req,res)=>{
    let  parsedUrl = url.parse(req.url, true);
    const rootUrl = parsedUrl.path.split('/')[1]
    
    let flag = true
    routers.forEach((router)=>{
        if(router.path === '/'+rootUrl){
            flag = false;
            router.handler(req,res);
        }
    })  
    
    if(flag) res.end(JSON.stringify({
        status:404,
        message:'page not found'
    }))
}