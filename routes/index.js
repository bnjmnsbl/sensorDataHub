var express = require('express');
let controller = require('../controllers/controller');

var router = express.Router();

router.get('/', controller.sensor_count);

router.get('/api', controller.basic_api);

router.get('/api/:sensorId', controller.single_api);

router.get('/providers/:providerId', controller.sensor_filter_provider);

router.get('/:providerId/sensor/:sensorId', controller.sensor_detail);

module.exports = router;
