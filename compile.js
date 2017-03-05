var Bundlebars = require('bundlebars');
var fs = require('fs');

var COMPILE_INFO = require('./compile_conf.js');

var bb = new Bundlebars();

var APP_DIRECTORY = './../';

bb.compile("index.hbs",COMPILE_INFO).then(
	writeToFileFunction("index.html")
)

function writeToFileFunction(filePath){
	return function(res) {
		fs.writeFile(filePath, res, (err) => {
		  if (err) {
		  	console.log(err);
		  	throw err;
		  }
		  console.log("Generated " + filePath)
		});
	}
}