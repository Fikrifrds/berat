const mongoose = require('mongoose');
const { Schema } = mongoose;

const weightSchema = new Schema({
    date: Date,
    maxWeight: Number,
    minWeight: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weight', weightSchema);
