const http = require('http');
const router = require('./routers/router');

const server = http.createServer((req, res) => {
    console.log(`${req.method} :${req.url}`);
    router(req,res);
})

const PORT =process.env.PORT || 3001
server.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
});
