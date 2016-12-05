var getMarks = require('./ASCIIMark.js');
var getCookie = require('./mockLandOperation.js');
var getCourse = require('./chunk.js');
var getAllGrades = require('./allGrades.js');
var getFinalEams = require('./eams.js');
var readlineSync = require('readline-sync'),
  chalk = require('chalk'),
  log4js = require('log4js'),
  logger;
 
log4js.configure({appenders: [{type: 'file', filename: 'fooApp.log'}]});
logger = log4js.getLogger('fooApp');

readlineSync.setDefaultOptions({
  print: function(display, encoding)
    { logger.info(chalk.stripColor(display)); }, // Remove ctrl-chars. 
  prompt: chalk.red.bold('> ')
});
 
// readlineSync.setDefaultOptions({
//   print: function(display, encoding)
//     { logger.info(chalk.stripColor(display)); }, // Remove ctrl-chars. 
//   prompt: chalk.red.bold('> ')
// });

var console_text = function () {
/*

`7MMF'   `7MF'`7MM"""YMM   .M"""bgd MMP""MM""YMM   .g8"""bgd
  MM       M    MM    `7  ,MI    "Y P'   MM   `7 .dP'     `M
  MM       M    MM   d    `MMb.          MM      dM'       `
  MM       M    MMmmMM      `YMMNq.      MM      MM
  MM       M    MM   Y  , .     `MM      MM      MM.
  YM.     ,M    MM     ,M Mb     dM      MM      `Mb.     ,'
   `bmmmmd"'  .JMMmmmmMMM P"Ybmmd"     .JMML.      `"bmmmd'

				DESIGN BY          
			                o     |    o |
			,-. ,-. ;-. ,-. . ;-. |    . | ,
			|   | | | | `-. | |   |    | |<
			`-' `-' ' ' `-' ' '   `--' ' ' `

*/
};

console.log(getMarks.getMarks(console_text));
 
// console.log(chalk.black.bold.bgYellow('电子科大信息门户登录'));
// user = readlineSync.question(chalk.gray('输入你的学号') + ': ');
// pw = readlineSync.question(chalk.gray('输入密码') + ': ', {hideEchoBack: true});
// console.log(user);

getCookie(function (err, cookies) {
	//console.log(cookies);

	// console.log(chalk.green('Welcome, ' + user + '!'));

	items = ['查询本学期课程', '查询期末考试安排', '查询所有成绩'];
	selectItem = readlineSync.keyInSelect(items,'请选择' + ': ');
	console.log(items[selectItem]);
	//console.log(items[1]);
	//console.log(items[selectItem] = items[1]);
	if (items[selectItem] == items[0]) {
		getCourse(function (err, callback) {
			console.log(callback);
		})
	} else if (items[selectItem] == items[1]) {
		getFinalEams(function (err, callback) {
			console.log(callback);
		})
	} else if (items[selectItem] == items[2]) {
		getAllGrades(function (err, callback) {
			console.log(callback);
		})
	} else {
		console.log('已退出');
	}
	// Authorization ... 
	//command = readlineSync.prompt();
});