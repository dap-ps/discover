const logger = require('../logger/logger').getLoggerFor('DAPPS-Images-Model');
const IPFSService = require('./../services/ipfs-service');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DAppsImageSchema = new Schema({
    id: Schema.Types.ObjectId,
    content: String,
    hash: {
        type: String,
        unique: true,
    }
});

DAppsImageSchema.pre('save', async function () {
    const content = this.content.split('base64,')[1];
    if (!content) {
        throw new Error('Invalid base64 image');
    }
    const data = Buffer.from(content, 'base64');
    const hash = await IPFSService.addContent(data);
    this.set({ content, hash });
});

DAppsImageSchema.statics.findByContent = async function (input) {
    const content = input.split('base64,')[1];
    const data = Buffer.from(content, 'base64');
    const hash = await IPFSService.generateContentHash(data);

    return this.findOne({ hash });
};

module.exports = mongoose.model('DAppsImage', DAppsImageSchema);
