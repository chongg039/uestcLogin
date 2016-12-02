const readlineSync = require('readline-sync');

const userName = readlineSync.question('请输入学号：');

const password = readlineSync.questionNewPassword('请输入密码：', {
	min: 1,
	max: 20,
	confirmMessage: '确认密码：'
});

module.exports = {
	userName: userName,
	password: password,
};