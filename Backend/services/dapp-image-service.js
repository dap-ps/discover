const DAppImage = require('./../models/dapps-images-model');

class DAppImageService {

    static async upload(req, image) {
        try {
            const uploadedImage = await DAppImage.create({ content: image });
            return buildImageUrl(req, uploadedImage.hash);
        } catch (error) {
            // Code 11000 is because of uniqueness, so just return the already exist document
            if (error.code == 11000) {
                const existingImage = await DAppImage.findByContent(image);
                return buildImageUrl(req, existingImage.hash);
            }

            throw new Error(error.message);
        }

    }

    static async retrieveImage(imageHash) {
        return DAppImage.findOne({ 'hash': imageHash });
    }
}

const buildImageUrl = function (req, imageHash) {
    return `/metadata/image/${imageHash}`;
}

module.exports = DAppImageService;
