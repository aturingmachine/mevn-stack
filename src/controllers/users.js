//import the User constant explicitly
const { User } = require('../database/models')
const { trunks } = require('trunks-log')

//show all users
exports.index = async (req, res) => {
  
  //query the DB of all users
  await User.find().exec()
  .then(users => {
    trunks.success('Retrieved all {} users', users.length)
    res.json({ users: users})
  })
  .catch(err => {
    trunks.error(err, 'Could not retrieve users: {}', err.message)
    res.json({ error: err, message: "Could not retrieve users"}).status(500)
  })
}

//Store a new user
exports.store = async (req, res) => {
  
  let user = new User(req.body)

  //save it in the DB
  await user.save()
    .then(user => {
      trunks.success('Created User: {}', user.email)
      //send a 201 and the new resource
      res.status(201).json({ data: user })
    })
    .catch(err => {
      trunks.error(err, 'Error creating user: {}', user.email)
      let errStatus = err.name === 'ValidationError' ? 400 : 500
      res.status(errStatus).json({err: err})
    })
}

//this function is for looking at one user by their mongo id
exports.show = async (req, res) => {

  //find this sneaky boye
  await User.findById(req.params.id).exec()
  .then(user => {
    trunks.success('Found user: {}', user.name)
    res.json({ user: user})
  })
  .catch(err => {
    trunks.error(err, 'Error finding user: {}', req.params.id)
    res.json({ error: err, message: 'Could not retrieve user'}).status(500)
  })
}

//ever wanted to make the users disappear 
exports.delete = async (req, res) => {

  //find the sneaky boye and make him go away
  await User.findByIdAndRemove(req.params.id).exec()
  .then(() => {
    trunks.success('Deleted User: {}', req.params.id)
    //let em know there aint no content no mo
    res.status(204).json()
  })
  .catch(err => {
    trunks.error(err, 'Error finding user: {}', req.params.id)
    res.status(500).json({err: err})
  })

}

//edit a user based on ID
exports.update = async (req, res) => {
  await User
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec()
    .then(user => {
      trunks.success('Updated user: {}', req.params.id)
      res.status(200).json({user: user})
    })
    .catch(err => {
      trunks.error(err, "Could not update user: {}", req.params.id)
      res.status(500).json({err: err})
    })
}
