//This should be a unique token that never appears anywhere in the code even comments in the code
var uniqueToken = "$$";

//As long as the uniqueToken is chosen properly close and opener can be anything
var opener = "["
var closer = "]"

function createCustomEncodeFunction(optionToken) {
	return function(str) {
		return uniqueToken + optionToken + opener + str + closer + optionToken + uniqueToken;
	}
}

//Most basic and default code wrapper
module.exports.code = createCustomEncodeFunction("");

module.exports.code_i = createCustomEncodeFunction("i");