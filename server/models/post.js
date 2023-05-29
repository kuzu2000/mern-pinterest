const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
      name: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String},
    },
    {
      timestamps: true,
    }
  );

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    desc: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    comments: {
        type: [commentSchema],
    }
}, { timestamps: true })

postSchema.pre('find', function(next) {
    this.populate('user')
    this.populate('comments')
    next()
})

const Post =mongoose.model('Post', postSchema) 
module.exports = Post