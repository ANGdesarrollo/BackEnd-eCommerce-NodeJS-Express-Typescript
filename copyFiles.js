const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'database', 'fileSystem');
const destDir = path.join(__dirname, 'build', 'database', 'fileSystem');

fs.mkdirSync(destDir, { recursive: true });

fs.readdir(srcDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  });
});
