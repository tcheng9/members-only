const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        timestamp: {type: Date, default: Date.now},
        text: {type: String},
        // author: {type: String},
        user: {type: Schema.Types.ObjectId, ref: "user", required: true}
        
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