const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        title: {type: String},

    }
)


module.exports = mongoose.model('user', UserSchema);