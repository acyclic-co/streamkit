const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

const { getError } = require('../utils');

const streamkit = require('../streamkit');

module.exports = (args, options) => {
  const spinner = ora('Creating new stream').start();

  const addEndpoint = id =>
    streamkit
      .addEndpoint(id, args.endpoint, options.header)
      .then(success => {
        spinner.succeed(chalk.green(`New endpoint added to stream '${args.name}'`));
      })
      .catch(error => {
        console.log(error.message);
        spinner.fail(
          chalk.red('Could not add new endpoint')
        );
      });

  streamkit.getStreams()
           .then(success => {
             const stream = success.data.streams.find(s => s.name == args.name);
             if (stream) {
               addEndpoint(stream.id);
             } else {
               spinner.fail(chalk.red('Stream does not exist'));
             }
           })
           .catch(error => {
             spinner.fail(chalk.red(getError(error)));
           });

}
