const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    listing_title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    postal_code:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Event', eventSchema);


