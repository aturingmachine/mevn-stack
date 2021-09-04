const mongoose = require('mongoose')

const definition = {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      sparse: true,
    },
  },
}

const options = {
  timestamps: true,
}

const userSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('User', userSchema)
