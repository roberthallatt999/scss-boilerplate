const fs = require('fs');
const path = require('path');

const htmlFilePath = '/Users/robert/data/digital-designs/leonescreamery/lcmin/user/templates/default_site/layouts.group/_layout_main.html';
const cssDirPath = '/Users/robert/data/digital-designs/leonescreamery/css';

fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
  if (err) {
    console.error('Error reading the HTML file:', err);
    return;
  }

  // Assuming versioned filename format is custom-{version}.css
  const versionedCssFileNameRegex = /custom-\d+\.css/;
  const versionedCssFileNameMatch = htmlContent.match(versionedCssFileNameRegex);

  if (versionedCssFileNameMatch) {
    const versionedCssFileName = versionedCssFileNameMatch[0];
    const originalCssFileName = 'custom.css';
    const versionedCssFilePath = path.join(cssDirPath, versionedCssFileName);
    const originalCssFilePath = path.join(cssDirPath, originalCssFileName);

    // Rename the versioned CSS file back to original filename
    fs.rename(versionedCssFilePath, originalCssFilePath, (err) => {
      if (err) {
        console.error('Error renaming the CSS file:', err);
        return;
      }

      // Update the HTML content to reference the original CSS filename
      const updatedHtmlContent = htmlContent.replace(versionedCssFileName, originalCssFileName);

      // Write the updated HTML back to the file
      fs.writeFile(htmlFilePath, updatedHtmlContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing the updated HTML file:', err);
          return;
        }
        console.log('Version control removed from custom.css link.');
      });
    });
  } else {
    console.log('No versioned custom.css file found in HTML.');
  }
});