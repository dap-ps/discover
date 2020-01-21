/* This file is a central place for managing backend settings */

/* shorthand */
const env = process.env

/* some defaults cannot be known in advance */
const config = {
  /* Hosting */
  PORT                         : env.PORT                         || 4000,
  RATE_LIMIT_TIME              : env.RATE_LIMIT_TIME              || 15,
  RATE_LIMIT_MAX_REQ           : env.RATE_LIMIT_MAX_REQ           || 1,
  /* Misc */
  ENVIRONMENT                  : env.ENVIRONMENT                  || "DEV",
  /* Database */
  DB_CONNECTION                : env.DB_CONNECTION                || null,
  /* Access */
  ADMIN_USER                   : env.ADMIN_USER                   || "admin",
  ADMIN_PASSWORD               : env.ADMIN_PASSWORD               || "discoverbancor",
  /* IPFS */
  IPFS_HOST                    : env.IPFS_HOST                    || "ipfs.status.im",
  IPFS_PORT                    : env.IPFS_PORT                    || "443",
  IPFS_PROTOCOL                : env.IPFS_PROTOCOL                || "https",
  /* Blockchain */
  DISCOVER_CONTRACT            : env.DISCOVER_CONTRACT            || "0x02d990A1C66e4Cf00bCdD98a0196149F7DdA2065",
  BLOCKCHAIN_CONNECTION_POINT  : env.BLOCKCHAIN_CONNECTION_POINT  || "wss://ropsten.infura.io/ws/v3/8675214b97b44e96b70d05326c61fd6a",
  /* EMail */
  EMAIL_USER                   : env.EMAIL_USER                   || null,
  EMAIL_PASSWORD               : env.EMAIL_PASSWORD               || null,
  EMAIL_HOST                   : env.EMAIL_HOST                   || null,
  EMAIL_PORT                   : env.EMAIL_PORT                   || null,
  EMAIL_TLS                    : env.EMAIL_TLS                    || null,
  APPROVER_MAIL                : env.APPROVER_MAIL                || "dapps-approvals@status.im",
  APPROVE_NOTIFIER_MAIL        : env.APPROVE_NOTIFIER_MAIL        || "dapps-approvals@status.im",
  /* Logging */
  CLOUDWATCH_ACCESS_KEY_ID     : env.CLOUDWATCH_ACCESS_KEY_ID     || null,
  CLOUDWATCH_SECRET_ACCESS_KEY : env.CLOUDWATCH_SECRET_ACCESS_KEY || null,
  CLOUDWATCH_REGION            : env.CLOUDWATCH_REGION            || null,
}

module.exports = config;
