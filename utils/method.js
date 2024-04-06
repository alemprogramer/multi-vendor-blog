const url = require('url');

class Router {
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.functions=[]
        this.index =0
        this.next = this.next.bind(this);
    }
    get(path,...funcs){
        let  parsedUrl = url.parse(this.req.url, true);
        let subUrl = parsedUrl.path.split('/').slice(2)
        const pass = subUrl? '/'+subUrl.join('/') : '/'
        console.log("🚀 ~ Router ~ get ~ arrUrl:", pass===path)
        if(this.req.method === 'GET' && path === pass){
            this.functions=[...funcs]
            funcs[0](this.req,this.res,this.next);
        }
    }
    next(){
        if(this.functions.length>this.index){
            this.index++;
            this.functions[this.index](this.req,this.res,this.next);
        }
    }
    end(){
        this.res.end(JSON.stringify({
            status:404,
            message:'page not found'
        }));
    }
        
}

module.exports = Router;