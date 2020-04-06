const DAppsMetadataController = require('../controllers/dapps-metadata-controller');

const rateLimit = require('../middlewares/route-specifics/rate-limit');
const cutSensitives = require('../middlewares/route-specifics/cut-sensitives');
const adminAuthorization = require('../middlewares/route-specifics/admin-authorization');

class DappRoute {

    static build(expressApp) {
        let dappRoute = expressApp.Router();

        dappRoute.post('/', rateLimit, DAppsMetadataController.uploadDAppMetadata);

        dappRoute.post('/update/:dappId', DAppsMetadataController.setMetadataStatus);

        dappRoute.post('/reject/:hash', adminAuthorization, DAppsMetadataController.rejectDApp);

        dappRoute.post('/approve/email/:hash', DAppsMetadataController.sendApprovalEmail);

        dappRoute.post('/approve/:hash', adminAuthorization, DAppsMetadataController.approveDApp);

        dappRoute.get('/all', cutSensitives, DAppsMetadataController.getAllDappsMetadata);

        dappRoute.get('/:hash', cutSensitives, DAppsMetadataController.getDAppMetadata);

        dappRoute.get('/image/:hash', cutSensitives, DAppsMetadataController.getDAppImage);

        return dappRoute;
    }
}

module.exports = DappRoute;
