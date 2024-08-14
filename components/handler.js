// components/handler.js
const sharp = require('sharp');

// Function to compress and encode the image as base64
const compressAndEncodeImage = async (imageBuffer) => {
    try {
        const compressedImage = await sharp(imageBuffer)
            .resize({ width: 800 }) // Resize the image to a width of 800px
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        return `data:image/jpeg;base64,${compressedImage.toString('base64')}`;
    } catch (err) {
        throw new Error('Image compression failed');
    }
};

module.exports = {
    compressAndEncodeImage,
};
