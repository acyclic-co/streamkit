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

      success.data.streams.forEach(stream => {
        const createdAt = new Date(stream.createdAt);
        const table = new Table();
        const endpoints = new Table();
        stream.endpoints.forEach(endpoint => endpoints.push([ endpoint ]));
        
        table.push({ 'Stream' :  stream.name },
                   { 'Host' : `${HOST}/stream/${stream.id}/events` },
                   { 'Endpoints': endpoints.toString() });
        
        console.log(table.toString());
      });
    })
    .catch(error => {
      spinner.fail(chalk.red(getError(error)));
    });
}
