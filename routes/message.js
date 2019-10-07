const express = require('express');

const createOneController = require('../controllers/message/create-one');
const readOneController = require('../controllers/message/read-one');
const readManyController = require('../controllers/message/read-many');
const updateOneController = require('../controllers/message/update-one');

const router = express.Router();

/* v1 Routes */
router.post('/v1', createOneController['v1']);

router.get('/v1/:id', readOneController['v1']);

router.get('/v1', readManyController['v1']);

router.put('/v1/:id', updateOneController['v1']);

/* Export */
module.exports = router;
