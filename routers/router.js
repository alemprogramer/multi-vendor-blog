const userRouter = require('../routers/userRouter');

const routers = [
    {
        path:'/user',
        handler:userRouter
    }
]

module.exports = (app)=>{
    routers.forEach((router)=>{
        if(router.path === '/'){
            app.get(router.path,router.handler)
        }else{
            app.use(router.path,router.handler);

        }
    })
}