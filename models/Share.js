const {Schema,model} = require('mongoose');

const shareSchema = new Schema({
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
   shareCount:Number
    
});


module.exports = model('Share',shareSchema); 