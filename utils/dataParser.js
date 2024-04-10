const url = require('url');
exports.parseData = (req,res,router)=>{
    let data = '';
    const parsedUrl = url.parse(req.url, true);
    
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
        if(data){
            req.body = JSON.parse(data|| {})
        }
       
        res.status = (code) => {
            res.statusCode = code;
            return res; 
        };
        res.json = (data) => {
            res.data = res.end(JSON.stringify(data));
            return res; 
        };
        req.query = parsedUrl.query || {};
        router(req,res)
    });
}
exports.color = (code)=>{
    if(code >= 200 && code <= 299){
        return `\x1b[33m ${code}` //yellow
    }else if(code >= 300 && code <= 399){
        return `\x1b[32m ${code}` //green
    }else if(code >= 400 && code <= 499){
        return `\x1b[34m ${code}` //blue
    }else if(code >= 500 && code <=599){
        return `\x1b[31m ${code}` //red
    }else{
        return `\x1b[0m ${code}` //default
    }
}
// module.exports = parseData;