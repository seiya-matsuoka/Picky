const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOIDONARY_CLOUD_NAME,
    api_key: process.env.CLOIDONARY_KEY,
    api_secret: process.env.CLOIDONARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Picky', //cloudinary上のどこにファイルをアップロードするか
        allowed_formats: ['jpeg', 'jpg', 'png', 'mp4', 'pdf']
    },
});

module.exports = {
    cloudinary,
    storage
}