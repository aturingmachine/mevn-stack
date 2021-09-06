const express = require('express')
const { usersController } = require('../controllers/index')

const router = express.Router()

router.get('/', usersController.index)

router.post('/', usersController.store)

router.get('/:id', usersController.show)

router.delete('/:id', usersController.destroy)

router.put('/:id', usersController.update)

module.exports = router
