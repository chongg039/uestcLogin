var ASCIIMark = function (f) {
	var lines =f.toString(); 
	return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));   
};

module.exports = {
	getMarks: ASCIIMark
};
