const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    { title: { type: String, required: true } },
    { post: { body: String, required: true } },
    { date_published: { type: Date, default: Date.now} },
    {
        comments: [
            { author: { type: String, required: true } },
            { comment: { body: String, required: true } },
            { date_added: { type: Date, default: Date.now} },
        ]
    }
)

PostSchema
    .virtual('url')
    .get(() => {
        return '/posts/' + this._id;
    })
//moment-ify dates
module.exports = mongoose.model('Post', PostSchema);
