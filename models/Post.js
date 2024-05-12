const {
    Schema,
    model
} = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 150
    },
    body: {
        type: String,
        required: true,
    },
    tags:{
        type:[String],
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: String,
    readTime: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    numberOfLikes: {
        type:Number,
        default: 0,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    numberOfDislikes: Number,
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    numbersOfShare: {
        type:Number,
        default: 0,
    },
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'Share',
    }],

}, {
    timestamps: true
})

module.exports = model('Post', postSchema);