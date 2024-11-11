// split-css.js

const fs = require('fs');
const path = require('path');

// Paths
const cssSourceDir = path.join(__dirname, 'src', 'assets', 'css');
const componentsDir = path.join(__dirname, 'src', 'components');
const globalCSSFile = path.join(cssSourceDir, 'global.css');

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

function findCSSUsageInComponents(selectors) {
  const usage = {};

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
            usage[selector] = (usage[selector] || 0) + 1;
          }
        });
      }
    });
  }

  searchComponents(componentsDir);
  return usage;
}

function createModuleCSSFiles(usage, originalCSSContent) {
  const moduleCSSFiles = {};
  const globalCSSContent = [];

  for (const [selector, count] of Object.entries(usage)) {
    if (count >= 3) {
      globalCSSContent.push(selector);
    } else {
      const componentPath = getFirstComponentUsingSelector(selector);
      if (componentPath) {
        if (!moduleCSSFiles[componentPath]) moduleCSSFiles[componentPath] = [];
        moduleCSSFiles[componentPath].push(selector);
      }
    }
  }

  // Write to global.css
  const globalCSSContentText = globalCSSContent
    .map((selector) =>
      originalCSSContent
        .match(new RegExp(`${selector}\\s*{[^}]*}`, 'g'))
        .join('\n'),
    )
    .join('\n\n');
  fs.writeFileSync(globalCSSFile, globalCSSContentText, 'utf8');
  console.log('Created global.css');

  // Create module files for each component
  Object.entries(moduleCSSFiles).forEach(([componentPath, selectors]) => {
    const componentCSSContent = selectors
      .map((selector) =>
        originalCSSContent
          .match(new RegExp(`${selector}\\s*{[^}]*}`, 'g'))
          .join('\n'),
      )
      .join('\n\n');

    const cssFilePath = componentPath.replace(/\.tsx$/, '.module.css');
    fs.writeFileSync(cssFilePath, componentCSSContent, 'utf8');
    console.log(`Created CSS module for ${componentPath} at ${cssFilePath}`);
  });
}

// Locate the first component that uses a specific selector
function getFirstComponentUsingSelector(selector) {
  let foundPath = null;

  function searchComponent(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);

      if (foundPath) return;
      if (fs.statSync(fullPath).isDirectory()) {
        searchComponent(fullPath);
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(selector)) {
          foundPath = fullPath;
        }
      }
    });
  }

  searchComponent(componentsDir);
  return foundPath;
}

// Main execution
try {
  const cssContent = fs
    .readdirSync(cssSourceDir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => fs.readFileSync(path.join(cssSourceDir, file), 'utf8'))
    .join('\n');

  const selectors = getCSSSelectors(cssContent);
  const usage = findCSSUsageInComponents(selectors);
  createModuleCSSFiles(usage, cssContent);
  console.log('CSS splitting completed successfully!');
} catch (error) {
  console.error('Error during CSS splitting:', error);
}
