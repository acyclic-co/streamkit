const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

const { getError } = require('../utils');

const streamkit = require('../streamkit');

module.exports = (args, options) => {
  const spinner = ora('Creating new stream').start();
  
  streamkit
    .newStream(args.name, args.endpoint, 'polling', args.frequency ? args.frequency : 5, options.header)
    .then(success => {
      spinner.succeed(chalk.green(`New stream created with id: ${success.data.id}`));
    })
    .catch(error => {
      spinner.fail(
        chalk.red((error.response && error.response.status == 406) ?
                  'Frequency value not valid.' : getError(error))
      );
    });
}
