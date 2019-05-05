const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');
const Table = require('cli-table');

const { getError } = require('../utils');
const { HOST } = require('../settings');

const streamkit = require('../streamkit');

module.exports = (args) => {
  const spinner = ora('Listing your streams').start();

  streamkit
    .getStreams()
    .then(success => {
      spinner.succeed();

      const table = new Table({
        head: [ 'Stream', 'Endpoint', 'Remote endpoint', 'Type', 'Created at' ]
      });
      success.data.streams.forEach(stream => {
        const createdAt = new Date(stream.createdAt);
        table.push([ stream.name,
                     `${HOST}/stream/${stream.id}/events`,
                     stream.endpoint,
                     stream.stream_type,
                     createdAt.toLocaleString() ]);
      });
      console.log(table.toString());
    })
    .catch(error => {
      spinner.fail(chalk.red(getError(error)));
    });
}
