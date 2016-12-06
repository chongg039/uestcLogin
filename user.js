var readlineSync = require('readline-sync'),
  	chalk = require('chalk'),
  	user, pw;

console.log(chalk.black.bold.bgYellow('电子科大信息门户登录'));
user = readlineSync.question(chalk.gray('输入你的学号') + ': ');
pw = readlineSync.question(chalk.gray('输入密码') + ': ', {hideEchoBack: true});
//console.log(user);
console.log(chalk.green('Welcome, ' + user + '!'));

module.exports = {
	userName: user,
	password: pw,
};