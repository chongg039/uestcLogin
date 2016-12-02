var getCookie = require('./mockLandOperation.js');
var request = require('request');
var cheerio = require('cheerio');

getCookie(function (err, cookies) {
	const baseUrl = 'http://eams.uestc.edu.cn/eams/';

	var semesterOptions = {
		url: baseUrl + 'courseTableForStd!courseTable.action',
		method: 'POST',
		headers: {
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding':'deflate', // don't use gzip!!! else the content may be messied
			'Accept-Language':'zh-CN,zh;q=0.8',
			'Cache-Control':'no-cache',
			'Connection':'keep-alive',
			'Content-Length':68,
			'Pragma':'no-cache',
			'Cookie':cookies,
			'Host':'eams.uestc.edu.cn',
			'Origin':'http://eams.uestc.edu.cn',
			'Referer':'http://eams.uestc.edu.cn/eams/courseTableForStd.action',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
			'X-Requested-With':'XMLHttpRequest'
		},
		form: {
			ignoreHead: 1,
			'setting.kind': 'std',
			startWeek: 1,
			'semester.id': 123,
			ids: 132040
		}
	};

	request(semesterOptions, function (err, res, body) {
		console.log(body);
		// app.get('/', function (req, res) {
		// 	res.send(body);
		// });
	});

});