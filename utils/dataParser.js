const parseData = (req,res,router)=>{
    let data = '';
    
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
        if(data){
            req.body = JSON.parse(data|| {})
        }
        router(req,res)
    });
    console.log('here');
    req.name="lm"
}

module.exports = parseData;