

const middlewares = async (req,res,...m)=>{
    for(let i=0;i<m.length;i++){
        m[i]();
    }
}

module.exports = middlewares