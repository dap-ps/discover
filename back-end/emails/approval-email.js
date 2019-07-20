const Email = require('./base-email');

class ApprovalEmail extends Email {
    constructor(dapp) {
        const emailBody = `A DApp metadata ${JSON.stringify(dapp.details)} has been uploaded. You can connect with the Dapp owner at email: ${dapp.email}`;
        super(process.env.APPROVE_NOTIFIER_MAIL, process.env.APPROVER_MAIL, `Uploaded DApp Metadata. Hash - ${dapp.hash}`, emailBody);
    }
}

module.exports = ApprovalEmail;