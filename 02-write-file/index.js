const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const stream = new fs.WriteStream(path.resolve(__dirname, 'text.txt'));

console.log('Input text...');
stdin.on('data', (data) => {
  if (data.toString().trim() !== 'exit') {
    console.log('Input text...');
    stream.write(data);
  } else {
    stream.end();
    process.exit();
  }
});

stream.on('finish', () => stdout.write('Goodbye!'));
process.on('exit', () => stdout.write('Goodbye!'));
process.on('SIGINT', () => process.exit());
