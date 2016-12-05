var readlineSync = require('readline-sync'),
  chalk = require('chalk'),
  user, pw;

// const userName = readlineSync.question('请输入学号：');

// const password = readlineSync.questionNewPassword('请输入密码：', {
// 	min: 1,
// 	max: 20,
// 	confirmMessage: '确认密码：'
// });

// module.exports = {
// 	userName: userName,
// 	password: password,
// };
// log4js.configure({appenders: [{type: 'file', filename: 'fooApp.log'}]});
// logger = log4js.getLogger('fooApp');
 
// readlineSync.setDefaultOptions({
//   print: function(display, encoding)
//     { logger.info(chalk.stripColor(display)); }, // Remove ctrl-chars. 
//   prompt: chalk.red.bold('> ')
// });

console.log(chalk.black.bold.bgYellow('电子科大信息门户登录'));
user = readlineSync.question(chalk.gray('输入你的学号') + ': ');
pw = readlineSync.question(chalk.gray('输入密码') + ': ', {hideEchoBack: true});
//console.log(user);
console.log(chalk.green('Welcome, ' + user + '!'));

module.exports = {
	userName: user,
	password: pw,
};