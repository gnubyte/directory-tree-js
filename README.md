# Directory Tree Generator
A Node.js global install package that generates a directory tree structure in markdown format.

## Installation
Clone or download this repository.


Navigate to the project directory in the command line.
Run `npm install` to install the dependencies.

run `npm link` to install the CLI locally

## Usage
To generate a directory tree and display it in the console:
`directory-tree`

To generate a directory tree and write it to a file:
`directory-tree -o <output-file-name>`

To include hidden files and directories in the tree:
`directory-tree -h`

To generate the directory tree in JSON format:
`directory-tree -j`


To generate the directory tree in JSON format and write it to a file:
`directory-tree -jo <output-file-name>`
Replace <output-file-name> with the desired name of the output file.

## Tests
To run the unit tests, follow these steps:

Make sure you have Mocha installed globally: `npm install -g mocha`
Run the tests: `mocha`
Make sure to modify and expand the README as needed, providing any additional information that may be relevant to users.

I hope this helps! Let me know if you have any further questions.
