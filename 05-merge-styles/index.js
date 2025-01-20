const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const outputDir = path.join(__dirname, 'project-dist');
  const outputFilePath = path.join(outputDir, 'bundle.css');

  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(stylesDir);

  const cssContents = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(stylesDir, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile() && path.extname(file) === '.css') {
        return fs.readFile(filePath, 'utf-8');
      }
      return null;
    }),
  );

  const filteredCssContents = cssContents.filter((content) => content !== null);

  await fs.writeFile(outputFilePath, filteredCssContents.join('\n'));
}

mergeStyles().catch((err) => console.log(err));
