'use strict';

const express = require('express');
const controller = require('./country.controller');
const router = express.Router();

// ********************* GET Routes ******************//
router.get('/', controller.index);
// ********************* GET Routes ******************//

// ********************* POST Routes ******************//
router.post('/', controller.create);
// ********************* POST Routes ******************//

// ********************* PUT Routes ******************//
router.put('/:id', controller.update);    
// ********************* PUT Routes ******************//

// ********************* DELETE Routes ******************//
router.delete('/:id', controller.remove);
// ********************* DELETE Routes ******************//

module.exports = router;


