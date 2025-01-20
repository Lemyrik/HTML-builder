const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);
      const fileName = path.parse(file.name).name;
      const fileExtension = path.parse(file.name).ext.slice(1);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }

        const fileSizeInKB = (stats.size / 1024).toFixed(3);

        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKB}kb`);
      });
    }
  });
});
