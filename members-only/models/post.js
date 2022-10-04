const mongoose = require('mongoose');
const Schema = mongoose.schema;

const PostSchema = new Schema(
    {
        login: {type: String},
        password: {type: String},
        
    }
)

//Virtual property if needed
/*
//Example
ClothesTypeSchema.virtual("url").get(function() {
    return "/catalog/clothes_type/" + this._id;
});
*/

module.exports = mongoose.model('Post', PostSchema)