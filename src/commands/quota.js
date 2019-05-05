const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

const { HOST } = require('../settings');
const streamkit = require('../streamkit');

module.exports = () => {
  const spinner = ora('Connecting to streamkit.io').start();
    
  streamkit
    .getQuota()
    .then(success => {
      spinner.succeed();
      console.log(`For this month you have consumed ${success.data.quota.requests} requests from a total of ${success.data.quota.max_requests}`);
    })
    .catch(error => {
      spinner.fail(chalk.red(getError(error)));
    });
}
