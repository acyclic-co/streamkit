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
  const spinner = ora('Connecting to the stream').start();

  streamkit
    .getStreams()
    .then(success => {
      spinner.succeed();
      const stream = success.data.streams.find(s => s.name == args.name);
      if (stream) {
        streamkit.getEvents(stream.id)
                 .then(response => {
                   const stream = response.data;
                   stream.on('data', chunk => {
                     console.log(chunk.toString('utf8'));
                   });
                 });
      } else {
        spinner.fail(chalk.red('Stream does not exist'));
      }
    })
    .catch(error => {
      spinner.fail(chalk.red(getError(error)));
    });

}
