const url = require('url');

class Router {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.functions = [];
        this.index = 0;
        this.intervalId;
        this.next = this.next.bind(this);
    }

    handleMethod(method, path, ...funcs) {
        const parsedUrl = url.parse(this.req.url, true);
        const subUrl = parsedUrl.path.split('/').slice(2);
        const pass = subUrl ? '/' + subUrl.join('/') : '/';
        
        if (this.req.method === method && path === pass) {
            clearInterval(this.intervalId);
            this.functions = [...funcs];
            funcs[0](this.req, this.res, this.next);
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
        this.intervalId=setInterval(()=>{
            clearInterval(this.intervalId);
            this.res.end(JSON.stringify({
                status: 404,
                message: 'page not found'
            }));
        },1000)
    }
}

module.exports = Router;
