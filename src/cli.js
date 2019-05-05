const program = require('caporal');

const login = require('./commands/login');
const logout = require('./commands/logout');
const newStream = require('./commands/new');
const events = require('./commands/events');
const list = require('./commands/list');
const remove = require('./commands/remove');
const quota = require('./commands/quota');

program.version('0.1.0');

program.command('login').action(login);
program.command('logout').action(logout);

program.command('new')
        .argument('<name>', 'Stream name')
       .argument('<endpoint>', 'Remote URL endpoint to stream out')
       .argument('[frequency]', 'Polling frequency', program.INT)
       .option('--header <header>', 'HTTP headers to include in each remote request', program.REPEATEABLE)
       .action(newStream);

program.command('list')
       .action(list);

program.command('events')
       .argument('<name>', 'Stream name')
       .action(events);

program.command('remove')
       .argument('<name>', 'Stream name')
       .action(remove);

program.command('quota')
       .action(quota);

program.parse(process.argv);
