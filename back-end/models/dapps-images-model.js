let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const IPFSService = require('./../services/ipfs-service');

let DAppsImageSchema = new Schema({
    id: Schema.Types.ObjectId,
    content: String,
    hash: {
        type: String,
        unique: true,
    }
});

DAppsImageSchema.pre('save', async function () {
    const formatedContent = JSON.stringify(this.content).split('base64,')[1];

    if (!formatedContent) {
        throw new Error('Invalid base64 image');
    }

    const hash = await IPFSService.generateContentHash(formatedContent);
    this.set({ content: formatedContent, hash: hash });
});

DAppsImageSchema.statics.findByContent = async function (content) {
    const formatedContent = JSON.stringify(content).split('base64,')[1];
    const hash = await IPFSService.generateContentHash(formatedContent);

    return this.findOne({ hash: hash });
};

module.exports = mongoose.model('DAppsImage', DAppsImageSchema);
