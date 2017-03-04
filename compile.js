var Bundlebars = require('bundlebars');
var fs = require('fs');

var COMPILE_INFO = require('./conf.js');

var bb = new Bundlebars({
	"helpersDir" : "helpers",
	"partialsDir" : "partials"
});

var APP_DIRECTORY = './../';

bb.compile("index.hbs",COMPILE_INFO).then(
	writeToFileFunction("index.html")
);

// var helpers = require('./helpers.js')

// COMPILE_INFO.forEach(function(fileInfo){
// 	var filePath = fileInfo[0];
// 	var defaultPath = defaultDataPath(filePath);
// 	var dataPath = fileInfo.length > 1 ? fileInfo[1] : defaultPath;
// 	dataPath = APP_DIRECTORY + dataPath;
// 	var templateDataInfo = require(dataPath);
// 	var templateData = templateDataInfo.intData;
// 	var externalDataInfo = templateDataInfo.extData;
// 	for (var key in externalDataInfo) {
// 		var extDataPath = APP_DIRECTORY + externalDataInfo[key];
// 		var extDataOriginal;
// 		try {
// 			extDataOriginal = require(extDataPath);
// 		}
// 		catch (e) {
// 			//If require failed than the value stored for that key was not a valid file path
// 		  console.log('Error loading external data for file ' + dataPath + ' for key ' + key );
// 		}
// 		var extData = clone(extDataOriginal);
// 		var existingHash = templateData[key];
// 		if (typeof existingHash !== 'undefined') {
// 			for (var existingKey in existingHash) {
// 				extData[existingKey] = existingHash[existingKey];
// 			}
// 		}
// 		templateData[key] = extData;
// 	}
// 	bb.compile(filePath, templateData)
// 	  .then(writeToFileFunction(helpers.resultFilePath(filePath)));
// });

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

function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

function defaultDataPath(templateFilePath){
	var filePathComponents = templateFilePath.split('.'); 
	if (filePathComponents.length > 1) {
		var fileNameIndex = filePathComponents.length - 2;
		filePathComponents[fileNameIndex] = filePathComponents[fileNameIndex] + '_data';
		var fileExtensionIndex = filePathComponents.length - 1;
		filePathComponents[fileExtensionIndex] = 'js'
	}
	return filePathComponents.join('.');
}