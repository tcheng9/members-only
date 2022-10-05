const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        timestamp: {type: String},
        text: {type: String},
        author: {type: String}, //This will be user's username
        
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