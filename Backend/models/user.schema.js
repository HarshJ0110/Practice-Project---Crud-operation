const mongoose = require("mongoose")

const { Schema } = mongoose;

const userSchame = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hobby: {
        type: [],
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("users", userSchame);