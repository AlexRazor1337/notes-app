const notes = require('./notes.js')
const chalk = require('chalk');
const yargs = require('yargs');

// ADD
yargs.command('add', 'Add a note',
    yargs => yargs.option('title', {
        demandOption: true,
        describe: 'Note title',
        type: 'string'
    }).option('body', {
        demandOption: true,
        describe: 'Note body',
        type: 'string'
    }),
    args => {
        notes.addNote(args.title, args.body);
    }
)


//REMOVE
yargs.command('remove', 'remove a note',
    yargs => yargs.option('title', {
        demandOption: true,
        describe: 'Note title',
        type: 'string'
    }),
    args => {
        notes.removeNote(args.title);
    }
)

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        notes.listNotes();
    }
})


yargs.command('read', 'read a note',
    yargs => yargs.option('title', {
        demandOption: true,
        describe: 'Note title',
        type: 'string'
    }),
    args => {
        notes.readNote(args.title);
    }
)

yargs.parse();