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
    // image: [{
    //     type: String,
    // }],
    thumbnail: String,
    readtime: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    shares: [{
        type: String,
    }],



}, {
    timestamps: true
})

module.exports = model('Post', postSchema);