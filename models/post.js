const mongoose = require('mongoose')

const postschema = mongoose.Schema(
    {
        Imageid:        {type: String, required: true},
        Imagecaption:   {type: String , required: true},
        likes:          {type: Number, required: true},
        ImageUrl:       {type: String, required: true}
    }
)

module.exports = mongoose.model('Post', postschema)