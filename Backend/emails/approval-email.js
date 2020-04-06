const Email = require('./base-email');
const config = require('../config')

class ApprovalEmail extends Email {
    constructor(dapp) {
        const emailBody = `A DApp metadata ${JSON.stringify(dapp.details)} has been uploaded. You can connect with the Dapp owner at email: ${dapp.email}`;
        super(
            config.APPROVE_NOTIFIER_MAIL,
            config.APPROVER_MAIL,
            `Uploaded DApp Metadata. Hash - ${dapp.hash}`,
            emailBody
        );
    }
}

module.exports = ApprovalEmail;
