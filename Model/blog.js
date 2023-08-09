const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true, "Empty title is not allowed"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    content: {
        type: String,
        required: [true, "Empty blog is not allowed"]
    },
    dateOfCreation : {
        type : Date,
        default: Date.now
    },
    category: {
        type: String,
        required: [true, "Please Provide a category"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


module.exports = mongoose.model('Blog', blogSchema);
