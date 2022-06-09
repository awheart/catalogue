require('dotenv').config()
const config = require('../config/config')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
    secure: true
})

exports.uploadCustomName = async (imageData, tags, imageName) => {
    try {
        return await cloudinary.uploader.upload(imageData, { tags, public_id: imageName }, (err) => {
            if (err) console.log('Une erreur a interrompu l\'upload de l\'image: ', err)
        })
    } catch (err) {
        console.log('err: ', err)
    }
}

