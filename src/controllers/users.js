//import the User constant explicitly
const { User } = require('../database/models')

//show all users
exports.index = async (req, res) => {
  
  //query the DB of all users
  const users = await User.find().exec()

  //send the response
  res.json({ data: users })

  return
}

//Store a new user
exports.store = async (req, res) => {
  
  //create a new user object with the request body
  const user = new User(req.body)

  //save it in the DB
  await user.save()

  //send a 201 and the new resource
  res.status(201).json({ data: user })
}

//this function is for looking at one user by their mongo id
exports.show = async (req, res) => {

  //find this sneaky boye
  const user = await User.findById(req.params.id).exec()

  //send him back home
  res.json({ data: user })
}

//ever wanted to make the users disappear 
exports.delete = async (req, res) => {

  //find the sneaky boye and make him go away
  await User.findByIdAndRemove(req.params.id).exec()

  //let em know there aint no content no mo
  res.status(204).json()
}

//edit a user based on ID
exports.update = async (req, res) => {
  const user = await User
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec()
res.json({ data: user })
}
