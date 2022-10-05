const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        email: {type: String},
        membership: {type: Boolean}, //By default, False aka Off
        admin_status: {type: Boolean}, //By default, False aka Off

    }
)


module.exports = mongoose.model('user', UserSchema);