const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    time:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

});

module.exports = mongoose.model('todo', TodoSchema);