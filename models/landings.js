const mongoose = require('mongoose');

const LandingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    id: {
        type: String,
        required: true,
        trim: true
    },
    nametype: {
        type: String,
        required: true,
        trim: true
    },
    recclass: {
        type: String,
        required: true,
        trim: true
    },
    mass: {
        type: Number,
        required: true,
        trim: true
    },
    fall: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Date,
        required: true,
        trim: true
    },
    reclat: {
        type: Number,
        required: true,
        trim: true
    },
    reclong: {
        type: Number,
        required: true,
        trim: true
    },
    geolocation: {
        type: Object,
        required: false,
        trim: true
    }  

})


const landingModel = mongoose.model("landings", LandingSchema)


module.exports = landingModel