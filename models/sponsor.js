const mongoose = require('mongoose');
const { Schema } = mongoose;


const imageSchema = new Schema({
    url: String,
    filename: String,
});
imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const sponsorSchema = new Schema({
    companyname: String,
    address: String,
    foundationyear: Number,
    businessdetail: String,
    capital: String,
    employeenumber: String,
    homepage: String,
    
    snslink: {
        x: String,
        instagram: String,
        youtube: String
    },  
        
    companydescription: String,
    calculatestatue: String,
    supportdetail: String,
    desiredreturn: String,

    contractplayer:[String],

    message: String,

    images: [imageSchema],
    author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
});


module.exports = mongoose.model('Sponsor', sponsorSchema);