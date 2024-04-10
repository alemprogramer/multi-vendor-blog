const url = require('url');

class Router {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.functions = [];
        this.index = 0;
        this.next = this.next.bind(this);
    }

    handleMethod(method, path, ...funcs) {
        const parsedUrl = url.parse(this.req.url, true);
        const subUrl = parsedUrl.path.split('/').slice(2);
        const pass = subUrl ? '/' + subUrl.join('/') : '/';
        
        if (this.req.method === method && path === pass) {
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

    next() {
        if (this.functions.length > this.index) {
            this.index++;
            this.functions[this.index](this.req, this.res, this.next);
        }
    }

    end() {
        console.log('end');
        setTimeout(()=>{
            this.res.end(JSON.stringify({
                status: 404,
                message: 'page not found'
            }));
        },0)
    }
}

module.exports = Router;
