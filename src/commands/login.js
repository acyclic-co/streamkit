const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');

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

module.exports = () => {
  console.log(chalk.blue("If you don't have an account, go to https://streamkit.io to sign in"));
  
  inquirer.prompt(questions).then(answers => {
    const spinner = ora('Connecting to streamkit.io').start();
    
    streamkit
      .login(answers)
      .then(success => {
        fs.writeFile(`${os.homedir()}/.streamkitrc`, JSON.stringify({ token: success.data.access_token }), (error) => {
          if (error) {
            spinner.fail(chalk.red('Error while saving session'));
          } else {
            spinner.succeed(chalk.green('Done!'));
          }
        });
      })
      .catch(error => {
        spinner.fail(chalk.red(`Something went wrong. Error: ${error}`));
      });
  });
}
