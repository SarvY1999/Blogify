const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
    },
    dateOfCreation : {
        type : Date,
        default: Date.now
    },
    category: {
        type: String,
        dafault: "No Category"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


module.exports = mongoose.model('Blog', blogSchema);
