require('dotenv').config()
const { spawn, execSync } = require('child_process')
const boxen = require('boxen')
const chalk = require('chalk')


/**
 * MEVN Builder
 * Build the project for production producing a
 * dist/ directory that can be deployed.
 */

 console.log(
  boxen(chalk.cyanBright('MEVN Builder\n\n'), {
    padding: 1,
    borderColor: 'green',
  })
)

/**
 * Build Vue application
 */
console.log(chalk.blue('>>> Building Client Application...'))
console.log(chalk.blue('>>> npm run build:client'))
execSync('npm run build:client', {stdio: 'inherit'})