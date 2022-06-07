module.exports = {
    jwt: {
        token: process.env.JWT_TOKEN || 'secret'
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_NAME || 'catalogue-recipe',
        api_key: process.env.CLOUDINARY_API_KEY || '922172824883567',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'zT-AJG3Tzjc66NTIIjNCy6Y5WuQ'
    }
}