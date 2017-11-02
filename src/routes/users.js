//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { usersController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all users
router.get('/', catchErrors(usersController.index))

//make a new boy
router.post('/', catchErrors(usersController.store))

//see one boy
router.get('/:id', catchErrors(usersController.show))

//get rid of a boy
router.delete('/:id', catchErrors(usersController.delete))

//update a boy
router.put('/:id', catchErrors(usersController.update))

module.exports = router