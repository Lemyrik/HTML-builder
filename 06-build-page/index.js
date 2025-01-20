const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  const projectDistDir = path.join(__dirname, 'project-dist');
  const templatePath = path.join(__dirname, 'template.html');
  const componentsDir = path.join(__dirname, 'components');
  const stylesDir = path.join(__dirname, 'styles');
  const assetsDir = path.join(__dirname, 'assets');

  await fs.mkdir(projectDistDir, { recursive: true });

  let templateContent = await fs.readFile(templatePath, 'utf-8');

  const componentTags = templateContent.match(/{{[a-z]+}}/g);

  if (componentTags) {
    for (const tag of componentTags) {
      const componentName = tag.replace(/{{|}}/g, '');
      const componentPath = path.join(componentsDir, `${componentName}.html`);
      try {
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        templateContent = templateContent.replace(tag, componentContent);
      } catch (err) {
        console.log(err);
      }
    }
  }

  await fs.writeFile(path.join(projectDistDir, 'index.html'), templateContent);

  const styleFiles = await fs.readdir(stylesDir);
  const cssFiles = styleFiles.filter((file) => path.extname(file) === '.css');

  const cssContentPromises = cssFiles.map((file) => {
    return fs.readFile(path.join(stylesDir, file), 'utf-8');
  });

  const cssContents = await Promise.all(cssContentPromises);
  await fs.writeFile(
    path.join(projectDistDir, 'style.css'),
    cssContents.join('\n'),
  );

  await copyDirectory(assetsDir, path.join(projectDistDir, 'assets'));
}

async function copyDirectory(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const items = await fs.readdir(srcDir);

  for (const item of items) {
    const srcItemPath = path.join(srcDir, item);
    const destItemPath = path.join(destDir, item);
    const stat = await fs.stat(srcItemPath);

    if (stat.isDirectory()) {
      await copyDirectory(srcItemPath, destItemPath);
    } else {
      await fs.copyFile(srcItemPath, destItemPath);
    }
  }
}

buildPage().catch((err) => console.log(err));
