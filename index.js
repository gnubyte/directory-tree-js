#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateTree(dir, indent = '', includeHidden = false) {
  const files = fs.readdirSync(dir);

  let tree = '';

  files.forEach(file => {
    if (!includeHidden && file.startsWith('.')) {
      return;
    }

    const filePath = path.join(dir, file).replace(/\\/g, '/');
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      tree += `${indent}- ${file}/\n`;
      tree += generateTree(filePath, `${indent}  `, includeHidden);
    } else {
      tree += `${indent}- ${file}\n`;
    }
  });

  return tree;
}

function writeTreeToFile(tree, fileName) {
  fs.writeFileSync(fileName, tree, 'utf8');
  console.log(`Directory tree has been written to ${fileName}`);
}

function generateAndWriteTree(dir, options) {
  const { includeHidden, outputFileName, jsonOutput } = options;
  const tree = generateTree(dir, '', includeHidden);

  if (jsonOutput) {
    const jsonTree = JSON.stringify({ [dir]: tree }, null, 2);

    if (outputFileName) {
      writeTreeToFile(jsonTree, outputFileName);
    } else {
      console.log(jsonTree);
    }
  } else {
    if (outputFileName) {
      writeTreeToFile(tree, outputFileName);
    } else {
      console.log(tree);
    }
  }
}

const args = process.argv.slice(2);
const options = {
  includeHidden: false,
  outputFileName: '',
  jsonOutput: false
};

args.forEach(arg => {
  if (arg === '-h') {
    options.includeHidden = true;
  } else if (arg === '-o' && args.indexOf(arg) !== args.length - 1) {
    options.outputFileName = args[args.indexOf(arg) + 1];
  } else if (arg === '-j') {
    options.jsonOutput = true;
  } else if (arg === '-jo') {
    options.jsonOutput = true;
    options.outputFileName = args[args.indexOf(arg) + 1];
  }
});

generateAndWriteTree(process.cwd(), options);


module.exports = {
    generateTree,
    writeTreeToFile,
    generateAndWriteTree,
  };