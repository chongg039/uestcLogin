module.exports = function(cbk){

	var request = require('request');
	var cheerio = require('cheerio');
	var EventProxy = require('eventproxy');

	var user = require('./user.js');

	var ep = new EventProxy();
	var request = request.defaults({followRedirect: false});

	const userName = user.userName;
	const password = user.password;
	//var eamsCookies;

	// const baseUrl = 'http://eams.uestc.edu.cn/eams/';
	const loginUrl = 'http://idas.uestc.edu.cn/authserver/login?service=http://eams.uestc.edu.cn/eams/home.action';

	request(loginUrl, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			var $ = cheerio.load(body);
			lt = $('[name=lt]').attr('value');
			dllt = $('[name=dllt]').attr('value');
			execution = $('[name=execution]').attr('value');
			_eventId = $('[name=_eventId]').attr('value');
			rmShown = $('[name=rmShown]').attr('value');

			var setCookies1 = response.headers['set-cookie'];
			Cookies1 = setCookies1[0] + ";" + setCookies1[1];
			//console.log(Cookies1);
			//console.log(lt);
		} else { 
			console.log(err);
		}

		var loginOption = {
			url: loginUrl,
			method: 'POST',
			headers: {
				'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Encoding':'gzip, deflate, sdch',
				'Accept-Language':'zh-CN,zh;q=0.8',
				'Cache-Control':'no-cache',
				'Connection':'keep-alive',
				'Cookie':Cookies1,
				'Host':'idas.uestc.edu.cn',
				'Origin':'http://idas.uestc.edu.cn',
				'Pragma':'no-cache',
				'Referer':'http://idas.uestc.edu.cn/authserver/login?service=http://eams.uestc.edu.cn/eams/home.action',
				'Upgrade-Insecure-Requests':1,
				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
			},
			form: {
				username: userName,
				password: password,
				lt: lt,
				dllt: dllt,
				execution: execution,
				_eventId: _eventId,
				rmShown: rmShown
			},
			followRedirect: false
		};

		request(loginOption, function (err, res, body) {
			//console.log(res.headers);
			//获取重定向地址
			redirectLocation = res.headers['location'];
			//console.log(redirectLocation);
			redirectCookies = res.headers['set-cookie'][1];
			//console.log(redirectCookies);

			request(redirectLocation, function (err, res, body) {
				//console.log(res.headers);
				JSESSIONID1 = res.headers['set-cookie'][0];
				//console.log(JSESSIONID1);
				finalCookies = JSESSIONID1 + "; " + redirectCookies;
				//console.log(finalCookies);

				var redirectOptions ={
					url: 'http://eams.uestc.edu.cn/courseTableForStd!courseTable.action',
					method: 'GET',
					headers: {
						'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
						'Accept-Encoding':'deflate, sdch', // don't use gzip!!! else the content may be messied
						'Accept-Language':'zh-CN,zh;q=0.8',
						'Cache-Control':'no-cache',
						'Connection':'keep-alive',
						'Cookie':finalCookies,
						'Host':'eams.uestc.edu.cn',
						'Pragma':'no-cache',
						'Referer':'http://idas.uestc.edu.cn/authserver/login?service=http://eams.uestc.edu.cn/eams/home.action',
						'Upgrade-Insecure-Requests':1,
						'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
					}
				};

				request(redirectOptions, function (err, res, body) {
					//console.log(body);
					
					var eamsCookies = finalCookies + ";" + 'semester.id=123;';
					return cbk(null, eamsCookies);					

					// // 下面是获取本学期期末考试情况
					// var eamsOptions = {
					// 	url: baseUrl + 'stdExamTable!examTable.action?examType.id=2&semester.id=123',
					// 	method: 'GET',
					// 	headers: {
					// 		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					// 		'Accept-Encoding':'deflate, sdch', // don't use gzip!!! else the content may be messied
					// 		'Accept-Language':'zh-CN,zh;q=0.8',
					// 		'Cache-Control':'no-cache',
					// 		'Connection':'keep-alive',
					// 		'Cookie':eamsCookies,
					// 		'Host':'eams.uestc.edu.cn',
					// 		'Upgrade-Insecure-Requests':1,
					// 		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
					// 	}
					// };

					// request(eamsOptions, function (err, res, eamsbody) {
					// 	console.log(eamsbody);
					// 	// app.get('/', function (req, res) {
					// 	// 	res.send(body);
					// 	// });
					// });

					// // 下面是所有学年成绩
					// var gradesOptions = {
					// 	url: baseUrl + 'teach/grade/course/person!historyCourseGrade.action?projectType=MAJOR',
					// 	method: 'GET',
					// 	headers: {
					// 		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					// 		'Accept-Encoding':'deflate, sdch', // don't use gzip!!! else the content may be messied
					// 		'Accept-Language':'zh-CN,zh;q=0.8',
					// 		'Cache-Control':'no-cache',
					// 		'Connection':'keep-alive',
					// 		'Pragma':'no-cache',
					// 		'Cookie':eamsCookies,
					// 		'Host':'eams.uestc.edu.cn',
					// 		'Upgrade-Insecure-Requests':1,
					// 		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
					// 	}
					// };

					// request(gradesOptions, function (err, res, body) {
					// 	console.log(body);
					// 	// app.get('/', function (req, res) {
					// 	// 	res.send(body);
					// 	// });
					// });
				});
			});
		});
	});
}