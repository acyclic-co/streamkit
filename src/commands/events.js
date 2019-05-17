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
  streamkit.getEvents(args.streams)
           .then(response => {
             spinner.succeed();
             
             const stream = response.data;
             stream.on('data', chunk => {
               console.log(chunk.toString('utf8'));
             });
           })
           .catch(error => {
             console.log(error);
             spinner.fail(chalk.red(getError(error)));
           });
}
