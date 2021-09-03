#!/usr/bin/env node
const { spawn } = require('child_process')
const boxen = require('boxen')
const chalk = require('chalk')

/**
 * MEVN Dev Runner
 * Starts Up the Express Server and Vue Client
 * in one process.
 */

console.log(
  boxen('MEVN Stack Dev Runner', {
    padding: 1,
    borderColor: 'green',
  })
)

const runner = {
  tags: {
    server: chalk.cyan('[SERVER]'),
    client: chalk.magenta('[CLIENT]'),
    self: chalk.yellow('[RUNNER]'),
  },
  serverLog: (data) => runner.tagstdout(runner.tags.server, data),
  clientLog: (data) => runner.tagstdout(runner.tags.client, data),
  tagstdout: (tag, data) => {
    data
      .toString()
      .split('\n')
      .filter((d) => {
        return d.length && !d.includes('webpack.Progress')
      })
      .forEach((d) => process.stdout.write(`${tag} ${d}\n`))
  },
  start: () => {
    runner.tagstdout(runner.tags.self, 'Starting Dev Runner')
    server.start()
    client.start()

    process.on('SIGINT', () => {
      runner.tagstdout(runner.tags.self, 'SIGINT caught')
      server.stop()
      client.stop()
      runner.tagstdout(runner.tags.self, 'Dev Runner stopped.')
    })
  },
}

const server = {
  process: undefined,
  command: 'npm',
  opts: ['run', 'dev:serve'],
  start: () => {
    server.process = spawn(server.command, server.opts)
    server.process.stdout.on('data', runner.serverLog)
    server.process.stderr.on('data', runner.serverLog)
  },
  stop: () => {
    if (server.process) {
      runner.serverLog('Dropping Server')
      server.process.kill()
    }
  },
}

const client = {
  process: undefined,
  command: 'npm',
  opts: ['run', 'dev:client'],
  start: () => {
    runner.clientLog('Compiling Vue Application')
    client.process = spawn(client.command, client.opts)
    client.process.stdout.on('data', runner.clientLog)
    client.process.stderr.on('data', runner.clientLog)
  },
  stop: () => {
    if (client.process) {
      runner.clientLog('Dropping Client')
      client.process.kill()
    }
  },
}

runner.start()