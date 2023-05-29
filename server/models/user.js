const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      photo: {
        type: String,
      },
      password: {
        type: String,
        required: true,
      },
      favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true}
)

UserSchema.methods.passwordCorrect = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model('User', UserSchema);