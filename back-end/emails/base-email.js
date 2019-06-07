let nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./smtp-config');

const logger = require('./../logger/logger').getLoggerFor('Base-Email');

class BaseEmail {

    constructor(from, to, subject, body) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = body;
    }

    async send() {
        let smtpTransporter = nodemailer.createTransport(SMTP_CONFIG);

        smtpTransporter.verify().then(
            () => {
                smtpTransporter.sendMail(this)
                    .then(() => {
                        logger.info(`Email with subject ${this.subject} was delivered successfully`);
                    })
                    .catch(mailError => {
                        logger.error(`Email was not delivered due to ${mailError}`);
                    });
            }
        ).catch(verificationError => {
            logger.error(`Email service verification failed due to ${verificationError}`);
        });
    }
}

module.exports = BaseEmail;
