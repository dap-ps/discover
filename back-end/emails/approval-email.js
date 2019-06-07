const Email = require('./base-email');

class ApprovalEmail extends Email {
    constructor(dapp) {
        const emailBody = `A DApp metadata ${JSON.stringify(dapp.details)} has been uploaded`;
        super(process.env.APPROVE_NOTIFIER_MAIL, process.env.APPROVER_MAIL, `Uploaded DApp Metadata. Hash - ${dapp.hash}`, emailBody);
    }
}

module.exports = ApprovalEmail;