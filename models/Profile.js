const {Schema,model} = require('mongoose');

const profileSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type:String,
        trim:true,
        required: [true," Name is required"]
    },
    bio: {
        type:String,
        trim:true,
        required: [true," Bio is required"]
    },
    title:{
        type:String,
        trim:true,
        required: [true," Title is required"]
    },
    profilePics:String,
    links:{
        website:String,
        facebook:String,
        youtube:String,
        github:String
    },
    bookmark: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
},{
    timestamps:true,
})

module.exports = model('Profile',profileSchema);



