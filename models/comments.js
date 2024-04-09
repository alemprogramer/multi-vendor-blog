const {Schema,model} = require('mongoose');

const commentsSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    body:{
        type:String,
        required:true,
        createAt:{
            type:Date,
            default:new Date()
        }
    },
    replies:[
        {
            body:{
                type:String,
                required:true,

            },
            user:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true,
                createAt:{
                    type:Date,
                    default:new Date()
                }
            }
        }
    ]
},{
    timestamps:true
})
module.exports = model('Comments',commentsSchema)