const chalk = require('chalk');
const os = require('os');
const fs = require('fs');

module.exports = () => {
  try {
    const data = fs.readFileSync(`${os.homedir()}/.streamkitrc`);
    console.log(`API Authorization Bearer: ${chalk.yellow(JSON.parse(data.toString()).token)}`);
  } catch(error) {
    if (error.code && error.code == 'ENOENT')
      console.log(chalk.red('You need to login to StreamKit first. Get an account on https://streamkit.io'));
    else
      console.log(chalk.red('Unknown error.'));
  }
}
