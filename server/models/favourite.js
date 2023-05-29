const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    postId: {
        type: String
    }
})

favouriteSchema.pre('find', function(next) {
    this.populate('userId')
    this.populate('postId')
    next()
})

module.exports = mongoose.model('Favourite', favouriteSchema)