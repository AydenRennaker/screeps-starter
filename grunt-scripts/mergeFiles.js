let modConcat = require('module-concat');
let {gitDescribeSync} = require('git-describe');

module.exports = function (grunt) {
	grunt.registerTask('mergeFiles', 'A Grunt plugin for merging files', function () {
		var done = this.async();

		let outputDir = './dist/';
		let outputFile = 'main.js';
		grunt.file.mkdir(outputDir);
		let opts = {
			"compilers": {
				".version": (src, options) => "module.exports = " + JSON.stringify(gitDescribeSync())
			}
		};
		modConcat('./src/main.js', outputDir + outputFile, opts, function (err, stats) {
			if (err) {
				grunt.fail.fatal('Error while processing json: ' + err.message);
			} else {
				grunt.log.write(stats.files.length + ' were combined into ' + outputFile);
			}

			done();
		});
	});

};