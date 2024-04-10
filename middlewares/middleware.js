

const middlewares = async (req,res,...m)=>{
    for(let i=0;i<m.length;i++){
        m[i](req,res);
    }
}

module.exports = middlewares