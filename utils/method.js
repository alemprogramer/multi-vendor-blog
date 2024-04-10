const url = require('url');

class Router {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.functions = [];
        this.index = 0;
        this.next = this.next.bind(this);
        this.invokeCount = 0;
        this.sync = 0
    }

    handleMethod(method, path, ...funcs) {
        const parsedUrl = url.parse(this.req.url, true);
        const subUrl = parsedUrl.pathname.split('/').slice(2);
        const pass = subUrl ? '/' + subUrl.join('/') : '/';
        
        this.invokeCount++;
        
        if (this.req.method === method && path === pass) {
            clearInterval(this.intervalId);
            this.functions = [...funcs];
            funcs[0](this.req, this.res, this.next);
        }else{
            this.sync++
        }        
        
    }

    get(path, ...funcs) {
        this.handleMethod('GET', path, ...funcs);
    }

    post(path, ...funcs) {
        this.handleMethod('POST', path, ...funcs);
    }

    put(path, ...funcs) {
        this.handleMethod('PUT', path, ...funcs);
    }

    delete(path, ...funcs) {
        this.handleMethod('DELETE', path, ...funcs);
    }

    next(error) {
        if (error) {
            // Error handling
            console.error('Error occurred:', error);
            this.res.statusCode = 500; // Internal Server Error
            this.res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return; // Stop further execution
        }
        if (this.functions.length > this.index) {
            this.index++;
            this.functions[this.index](this.req, this.res, this.next);
        }else {
            // No more middleware to execute
            this.end();
        }
    }

    end() {
        if(this.invokeCount == this.sync){
            return this.res.status(404).json({
                status: 404,
                message: 'page not found'
            });
        }
        
    }
}

module.exports = Router;
