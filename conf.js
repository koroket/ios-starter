var itemsDirectory = "./items/";

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function loadItem (itemName) {
	var item = require(itemsDirectory + itemName);
	item.steps.forEach(function(step){
		var body = step['body'];
		body = replaceAll(body,'$$[',"<pre class='brush: swift;'>");
		body = replaceAll(body,']$$',"</pre>");
		body = replaceAll(body,'$$i[',"<div class='inline'><pre class='brush: swift;gutter: false;'>");
		body = replaceAll(body,']i$$',"</pre></div>");
		step['body'] = body;
	});
	return item;
}

// var locations = loadItem("location");

// console.log(locations);

var _conf = {
	"sections":[{
		"title":"Available technology on the phone",
		"subtitle":"Device Hardware",
		"items":[
			loadItem("location"),
			loadItem("photos"),
		{
			"title":"Storage",
			"key":"storage"
		},{
			"title":"Accelerometer",
			"key":"accelerometer"
		},{
			"title":"Gesture Recognizition",
			"key":"gesture"
		}
		]
	}
	,{
		"title":"User Accounts",
		"subtitle":"Authentication"
	},{
		"title":"Making your app beautiful",
		"subtitle":"UI"
	},{
		"title":"Other people's code/software to make your life easier",
		"subtitle":"SDK/API/Frameworks"
	}
	]
}

module.exports = _conf;