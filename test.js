const fs = require('fs');
const { expect } = require('chai');
const { generateTree, writeTreeToFile, generateAndWriteTree } = require('./index');

describe('Directory Tree Generator', () => {
  const testDir = 'test-directory';

  before(() => {
    // Create a test directory with a specific structure
    fs.mkdirSync(testDir);
    fs.mkdirSync(`${testDir}/folder1`);
    fs.mkdirSync(`${testDir}/folder2`);
    fs.writeFileSync(`${testDir}/file1.txt`, '');
    fs.writeFileSync(`${testDir}/file2.txt`, '');
    fs.writeFileSync(`${testDir}/folder1/file3.txt`, '');
    fs.writeFileSync(`${testDir}/folder2/file4.txt`, '');
    fs.writeFileSync(`${testDir}/.hidden-file.txt`, '');
  });

  after(() => {
    // Clean up the test directory
    fs.rmSync(testDir, { recursive: true });
  });

  describe('generateTree', () => {
    it('should generate the directory tree without hidden files and directories by default', () => {
      const expectedTree = `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`;

      const generatedTree = generateTree(testDir);
      expect(generatedTree.trim()).to.equal(expectedTree.trim());
    });

    it('should generate the directory tree with hidden files and directories when includeHidden is true', () => {
      const expectedTree = `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
- .hidden-file.txt
`;

      const generatedTree = generateTree(testDir, '', true);
      expect(generatedTree.trim()).to.equal(expectedTree.trim());
    });
  });

  describe('writeTreeToFile', () => {
    const testOutputFile = 'test-output.md';

    afterEach(() => {
      // Clean up the test output file
      if (fs.existsSync(testOutputFile)) {
        fs.unlinkSync(testOutputFile);
      }
    });

    it('should write the directory tree to a file', () => {
      const tree = `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`;
      writeTreeToFile(tree, testOutputFile);
      expect(fs.existsSync(testOutputFile)).to.be.true;

      const fileContent = fs.readFileSync(testOutputFile, 'utf8');
      expect(fileContent.trim()).to.equal(tree.trim());
    });
  });

  describe('generateAndWriteTree', () => {
    const testOutputFile = 'test-output.md';

    afterEach(() => {
      // Clean up the test output file
      if (fs.existsSync(testOutputFile)) {
        fs.unlinkSync(testOutputFile);
      }
    });

    it('should generate and print the directory tree to the console without options', () => {
      const expectedTree = `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`;

      // Stub console.log to capture the output
      let consoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleOutput += message + '\n';
      };

      generateAndWriteTree(testDir, {});
      expect(consoleOutput.trim()).to.equal(expectedTree.trim());

      // Restore console.log
      console.log = originalConsoleLog;
    });

    it('should generate and write the directory tree to a file', () => {
      const expectedTree = `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`;

      generateAndWriteTree(testDir, { outputFileName: testOutputFile });
      expect(fs.existsSync(testOutputFile)).to.be.true;

      const fileContent = fs.readFileSync(testOutputFile, 'utf8');
      expect(fileContent.trim()).to.equal(expectedTree.trim());
    });

    it('should generate and print the directory tree in JSON format', () => {
      const expectedJsonTree = {
        'test-directory': `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`
      };

      // Stub console.log to capture the output
      let consoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleOutput += message + '\n';
      };

      generateAndWriteTree(testDir, { jsonOutput: true });
      const parsedOutput = JSON.parse(consoleOutput);
      expect(parsedOutput).to.deep.equal(expectedJsonTree);

      // Restore console.log
      console.log = originalConsoleLog;
    });

    it('should generate and write the directory tree in JSON format to a file', () => {
      const expectedJsonTree = {
        'test-directory': `- folder1/
  - file3.txt
- folder2/
  - file4.txt
- file1.txt
- file2.txt
`
      };

      generateAndWriteTree(testDir, { jsonOutput: true, outputFileName: testOutputFile });
      expect(fs.existsSync(testOutputFile)).to.be.true;

      const fileContent = fs.readFileSync(testOutputFile, 'utf8');
      const parsedOutput = JSON.parse(fileContent);
      expect(parsedOutput).to.deep.equal(expectedJsonTree);
    });
  });
});
