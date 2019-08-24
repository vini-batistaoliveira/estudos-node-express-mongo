const mongoose = require('../../database');

const AnotationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Anotation = mongoose.model('Anotation', AnotationSchema);

module.exports = Anotation;