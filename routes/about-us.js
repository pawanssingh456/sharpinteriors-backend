const express = require('express');

const createOneController = require('../controllers/about-us/create-one');
const readManyController = require('../controllers/about-us/read-many');
const deleteOneController = require('../controllers/about-us/delete-one');
const updateOneController = require('../controllers/about-us/update-one');

const router = express.Router();

/* v1 Routes */
router.post('/v1', createOneController['v1']);

router.get('/v1', readManyController['v1']);

router.put('/v1/:id', updateOneController['v1']);

router.delete('/v1/:id', deleteOneController['v1']);

/* Export */
module.exports = router;
