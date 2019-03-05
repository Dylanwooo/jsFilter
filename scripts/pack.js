'use strict';

const pkg = require('../package.json')
const productionName = pkg.name
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('./dist/' + productionName + '.zip');
const archive = archiver('zip');

output.on('close', () => {
	console.log(archive.pointer() + ' total bytes');
	console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', (err) => {
	throw err;
});

archive.pipe(output);
archive.bulk([{
	expand: true,
	cwd: path.join(__dirname, '../dist/', productionName),
	src: [
		'js/**',
		'img/**',
    'css/**',
    'plugin/**',
		'*.html'
	],
	dest: productionName
}]);

archive.finalize();
