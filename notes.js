const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');


const addNote = (title, body) => {
    const notes = loadNotes();
    if (!notes.find(note => note.title === title)) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.bgBlack.green('Added \"' + title + '\" note!'));
    } else {
        console.log(chalk.red.bgBlack('Note with this title already exists!'));
    }
}


const removeNote = title => {
    let notes = loadNotes();
    const originalLen = notes.length;
    notes = notes.filter(note => note.title !== title);

    if (originalLen !== notes.length) {
        saveNotes(notes);
        console.log(chalk.bgBlack.yellow('Deleted \"' + title + '\" note!'));
    } else {
        console.log(chalk.bgBlack.red('Note \"' + title + '\" not found!'));
    }
}


const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.yellow.bold('- ' + note.title));
    });
}


const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.yellow(note.title + ':\n')  + note.body);
    } else {
        console.log(chalk.red.bgBlack('Note was not found!'));
    }
}


const loadNotes = () => {
    try {
        const dataBuff = fs.readFileSync('notes.json');
        return JSON.parse(dataBuff.toString());
    } catch (error) {
        return [];
    }
}


const saveNotes = data => fs.writeFileSync('notes.json', JSON.stringify(data));


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};