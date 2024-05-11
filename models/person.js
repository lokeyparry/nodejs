const { uniq } = require("lodash")
const mongoose = require("mongoose")
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', "waiter", "owner"],
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },



});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;