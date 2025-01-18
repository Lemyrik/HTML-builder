const path = require('path');
const fs = require('fs');

const fullPath = path.join(__dirname, 'text.txt');

const stream = new fs.ReadStream(fullPath, { encoding: 'utf-8' });
stream.on('readable', function () {
  const data = stream.read();
  if (data) {
    console.log(data);
  }
});
