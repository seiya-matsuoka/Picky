const mongoose = require('mongoose');
const { Schema } = mongoose;


const imageSchema = new Schema({
    url: String,
    filename: String,
});
imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const playerSchema = new Schema({
    firstname: String,
    lastname: String,
    birthyear: Number,
    birthmonth: Number,
    birthday: Number,
    nationality: String,
    birthplace: String,
    workarea: String,
    height: Number,
    weight: Number,    
    bloodtype: String,

    affiliationteam: String,
    position: String,
    dominantfoot: String,

    snslink: {
        x: String,
        instagram: String,
        youtube: String
    },  

    career: [String],
    record: [String],
    
    returndetail: String,
    desiredsupport: String,

    contractsponsor:[String],

    target: {
                playerwork: String,
                socialwork: String,
                otherwork: String
    },     
    message: String,

    images: [imageSchema],
    author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
    }
});

module.exports = mongoose.model('Player', playerSchema);