var getCookie = require('./mockLandOperation.js');
var request = require('request');
var cheerio = require('cheerio');

var requestt = request.defaults({followRedirect: false});

getCookie(function (err, cookies) {
	const baseUrl = 'http://eams.uestc.edu.cn/eams/';
	// 下面是所有学年成绩
	var allGradesOptions = {
		url: baseUrl + 'courseTableForStd.action?_=1465456078624',
		method: 'GET',
		headers: {
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding':'deflate, sdch', // don't use gzip!!! else the content may be messied
			'Accept-Language':'zh-CN,zh;q=0.8',
			'Connection':'keep-alive',
			'Cookie':cookies,
			'Host':'eams.uestc.edu.cn',
			'Referer':'http://eams.uestc.edu.cn/eams/home!submenus.action?menu.id=844',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
		}
	};

	requestt(allGradesOptions, function (err, res, body) {
		//console.log(body);
		// app.get('/', function (req, res) {
		// 	res.send(body);
		// });
		//$ = cheerio.load('if(jQuery("#courseTableType").val()=="std"){...}');
		var ids = body.match(/ids.*\)/)[0].match(/\d+/)[0];
		//console.log(test);

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
			ids: ids
		}
	}

	request(semesterOptions, function (err, res, body) {
		//console.log(res);
		// app.get('/', function (req, res) {
		// 	res.send(body);
		// });
		var title = [];
		var course = [];
		var $ = cheerio.load(body);
		$('table[id=manualArrangeCourseTable]').find('thead').find('th').each(function (i, elem) {
				title[i] = $(this).text();
				//console.log(title[i]);
		});

		$('tbody').find('tr').each(function (i, elem) {
				$(this).find('td').each(function (x, ele) {
					course[x] = $(this).text();
					// console.log(course[x]);
					// console.log('--------------------------');
				});
				var temp = course[5].replace(/简介/g, "");
				var pmet = temp.replace(/(^\s+)|(\s+$)/g, "");
				console.log('课程：' + course[2] + ' ' + '教师：' + pmet.replace(/\s/g, "") + ' ' + '学分：' + course[3]);
				// $(this).find('td').each(function (n, some) {
				// 	course[n] = $(this).text();
				// 	//console.log(course[n]);
				// })
				// course[i] = $(this).text();
				// console.log(course[i]);
				// pmet.replace(/\s/g, "")
		});	
	});


	});
})