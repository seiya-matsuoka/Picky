const mongoose = require('mongoose');
const { Schema } = mongoose;


const contactSchema = new Schema({    
    senderid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    sendunread: {
        type: String,
        default: false
    },
    receiverunread: {
        type: String,
        default: true
    }
});


module.exports = mongoose.model('Contact', contactSchema);