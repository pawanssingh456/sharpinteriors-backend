const express = require('express');

const createOneController = require('../controllers/user/create-one');
const readOneController = require('../controllers/user/read-one');
const readManyController = require('../controllers/user/read-many');
const deleteOneController = require('../controllers/user/delete-one');
const updateOneController = require('../controllers/user/update-one');
const loginController = require('../controllers/user/login');

const router = express.Router();

/* v1 Routes */
router.post('/v1', createOneController['v1']);

router.get('/v1/:id', readOneController['v1']);

router.get('/v1', readManyController['v1']);

router.get('/login/v1', loginController['v1']);

router.put('/v1/:id', updateOneController['v1']);

router.delete('/v1/:id', deleteOneController['v1']);

/* Export */
module.exports = router;
