const fs = require('fs').promises;
const path = require('path');

async function copyDirectory() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);

      await fs.copyFile(srcFile, destFile);
    }
  } catch (err) {
    console.log(err);
  }
}

copyDirectory();
