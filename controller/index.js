const router = require('express').Router();

const api = require('./api');
const routes = require('./routes');

router.use('/', routes);
router.use('/api', api);

module.exports = router;
