const chalk = require('chalk')

const tags = {
  info: chalk.blue('[info]'),
  error: chalk.red('[error]'),
}

const log = {
  info: (...args) => {
    args.forEach((arg) => {
      process.stdout.write(`${tags.info} ${arg}\n`)
    })
  },
  error: (...args) => {
    args.forEach((arg) => {
      process.stdout.write(`${tags.error} ${arg}\n`)
    })
  },
}

module.exports = { log }
