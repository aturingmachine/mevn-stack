const { User } = require('../database/models')
const trunks = require('trunks-log')

const log = new trunks('USERS')

const index = async (_req, res) => {
  try {
    const users = await User.find().exec()

    res.json({ users })
  } catch (error) {
    log.error(error, 'Could not retrieve users: {}', error.message)
    res.json({ error: error, message: 'Could not retrieve users' }).status(500)
  }
}

const store = async (req, res) => {
  const user = new User(req.body)

  try {
    const createdUser = await user.save()

    res.status(201).json({ user: createdUser })
  } catch (error) {
    log.error(error, 'Error creating user: {}', user.email)
    let errStatus = error.name === 'ValidationError' ? 400 : 500
    res.status(errStatus).json({ error })
  }
}

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec()

    res.status(200).json({ user })
  } catch (error) {
    log.error(error, 'Could not find user: {}', req.params.id)
    res.status(500).json({ error })
  }
}

const destroy = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id)

    res.status(204).send()
  } catch (error) {
    log.error(error, 'Error finding user: {}', req.params.id)
  }
}

const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec()

    res.status(200).json({ user })
  } catch (error) {
    log.error(error, 'Could not update user: {}', req.params.id)
    res.status(500).json({ error })
  }
}

module.exports = { index, store, show, destroy, update }
