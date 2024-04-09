const {Schema,model} = require('mongoose');
const Profile = require('./Profile');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength:100,

    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePics:{
        type: String,
        default:'/uploads/default.png'
    },
    profile: {
        type:Schema.Types.ObjectId,
        ref :Profile,
    }

    
},{
    timestamps: true
});

module.exports = model('User',userSchema);

