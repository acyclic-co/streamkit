const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

const { getError } = require('../utils');

const streamkit = require('../streamkit');

const questions = [
  {
    type: 'input',
    name: 'username',
    message: 'Username or email'
  },
  {
    type: 'password',
    name: 'password',
    mask: '*',
    message: 'Password'
  }
];

module.exports = (args) => {
  const spinner = ora('Removing stream').start();

  const removeStream = (streamId) => {
    streamkit
      .remove(streamId)
      .then(success => {
        spinner.succeed(chalk.green('Done!'));
      })
      .catch(error => {
        spinner.fail(chalk.red(getError(error)));
      });
  };

  streamkit.getStreams()
           .then(success => {
             const stream = success.data.streams.find(s => s.name == args.name);
             if (stream) {
               removeStream(stream.id);
             } else {
               spinner.fail(chalk.red('Stream does not exist'));
             }
           })
           .catch(error => {
             spinner.fail(chalk.red(getError(error)));
           });
}
