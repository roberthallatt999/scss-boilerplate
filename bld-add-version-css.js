const fs = require('fs');
const path = require('path');

const htmlFilePath = '/Users/robert/data/digital-designs/leonescreamery/lcmin/user/templates/default_site/layouts.group/_layout_main.html';
const cssDirPath = '/Users/robert/data/digital-designs/leonescreamery/css';
const cssFileName = 'custom.css';
const version = Date.now(); // Simple versioning using timestamp

fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
  if (err) {
    console.error('Error reading the HTML file:', err);
    return;
  }

  const versionedCssFileName = cssFileName.replace('.css', `-${version}.css`);
  const versionedCssFilePath = path.join(cssDirPath, versionedCssFileName);
  const originalCssFilePath = path.join(cssDirPath, cssFileName);

  // Rename the CSS file
  fs.rename(originalCssFilePath, versionedCssFilePath, (err) => {
    if (err) {
      console.error('Error renaming the CSS file:', err);
      return;
    }

    // Update the HTML content
    const updatedHtmlContent = htmlContent.replace(cssFileName, versionedCssFileName);

    // Write the updated HTML back to the file
    fs.writeFile(htmlFilePath, updatedHtmlContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the updated HTML file:', err);
        return;
      }
      console.log('CSS file versioned and HTML updated.');
    });
  });
});