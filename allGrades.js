module.exports = function (cbk) {

var getCookie = require('./mockLandOperation.js');
var request = require('request');
var cheerio = require('cheerio');

getCookie(function (err, cookies) {
	const baseUrl = 'http://eams.uestc.edu.cn/eams/';

	// 下面是所有学年成绩
	var allGradesOptions = {
		url: baseUrl + 'teach/grade/course/person!historyCourseGrade.action?projectType=MAJOR',
		method: 'GET',
		headers: {
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding':'deflate, sdch', // don't use gzip!!! else the content may be messied
			'Accept-Language':'zh-CN,zh;q=0.8',
			'Cache-Control':'no-cache',
			'Connection':'keep-alive',
			'Pragma':'no-cache',
			'Cookie':cookies,
			'Host':'eams.uestc.edu.cn',
			'Upgrade-Insecure-Requests':1,
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
		}
	};

	request(allGradesOptions, function (err, res, body) {
		//console.log(body);
		return cbk(null, body);
		// app.get('/', function (req, res) {
		// 	res.send(body);
		// });
	});
})
}