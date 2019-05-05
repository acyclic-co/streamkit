const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

const streamkit = require('../streamkit');

const questions = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'You are session data will be removed. Are you sure?'
  }
];

module.exports = () => {
  inquirer.prompt(questions).then(answers => {
    if (answers.confirm) {
      fs.unlinkSync(`${os.homedir()}/.streamkitrc`);
      console.log(chalk.green('Done!'));
    } else {
      console.log(chalk.yellow('Roger that! Command ignored'));
    }
  });
}
