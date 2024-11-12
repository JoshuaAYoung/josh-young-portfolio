// create-used-selectors-css.js

const fs = require('fs');
const path = require('path');

// Paths
const cssSourceDir = path.join(__dirname, 'src', 'assets', 'css');
const componentsDir = path.join(__dirname, 'src', 'components');
const usedCSSFile = path.join(cssSourceDir, 'used-selectors.css');

// Helper functions
function getCSSSelectors(cssContent) {
  const selectorRegex = /([.#]?[a-zA-Z0-9_-]+)\s*\{/g;
  let match;
  const selectors = new Set();

  while ((match = selectorRegex.exec(cssContent)) !== null) {
    selectors.add(match[1].trim());
  }
  return selectors;
}

function findUsedSelectorsInComponents(selectors) {
  const usedSelectors = new Set();

  function searchComponents(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);

      if (fs.statSync(fullPath).isDirectory()) {
        searchComponents(fullPath);
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');

        selectors.forEach((selector) => {
          const regex = new RegExp(
            `className=["'\`]([^"'\`]*\\b${selector}\\b[^"'\`]*)["'\`]`,
            'g',
          );
          if (regex.test(content)) {
            usedSelectors.add(selector);
          }
        });
      }
    });
  }

  searchComponents(componentsDir);
  return usedSelectors;
}

// Main execution
try {
  const cssContent = fs
    .readdirSync(cssSourceDir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => fs.readFileSync(path.join(cssSourceDir, file), 'utf8'))
    .join('\n');

  const allSelectors = getCSSSelectors(cssContent);
  const usedSelectors = findUsedSelectorsInComponents(allSelectors);

  // Write only used selectors to new CSS file
  const usedCSSContent = Array.from(usedSelectors)
    .map((selector) =>
      cssContent.match(new RegExp(`${selector}\\s*{[^}]*}`, 'g')).join('\n'),
    )
    .join('\n\n');

  fs.writeFileSync(usedCSSFile, usedCSSContent, 'utf8');
  console.log('Created used-selectors.css with all used selectors.');
} catch (error) {
  console.error('Error during CSS processing:', error);
}
