//引入mock.js
const Mock = require('mockjs');
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
	let articles = [];
	for (let i = 0; i < 30; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 10), //  Random.csentence( min, max )
			content: Random.csentence(10, 30),
			thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		articles.push(newArticleObject)
	}
	return {
		articles: articles
	}
}
const createCompanyData = function(){
	let companyData = [];
	for(let i=0; i<30; i++){
		let item = {
			num: '12000086' + (i < 10 ? '0' + String(i) : String(i)),
			date: Random.date('yyyy年MM月dd日'),
			company: Random.ctitle(3, 6) +'有限公司',
			budgetAmount: Random.float(10000, 1000000, 0,0),
			createAmount: Random.float(10000, 1000000, 0,0),
			...Mock.mock({
				"status|0-1": 1 
			})
		}
		companyData.push(item)
	}
	return {
		data: companyData
	}
}

const indexChartData = function(){
	let chartData = [];
	for(let i=0; i<20; i++){
		let item = {
			date: '01/'+ (10 + i),
			...Mock.mock({
				"num|0-5000": 5000 ,
			})
		}
		chartData.push(item)
	}
	return {
		data: chartData
	}
}

const typesData = [
	{type: 'all', name: '全部'}, 
	{type: '1', name: '一楼'},{type: '2', name: '二楼'},{type: '3', name: '三楼'},
	 {type: 'b1', name: '包间:春暖花开'},{type: 'b2', name: '包间:桃红柳绿'}, 
	{type: 'b3', name: '包间:五谷丰登'}, {type: 'b4', name: '包间:傲雪凌霜'},
	{type: 'c1', name: '春兰'}, {type: 'c2', name: '夏荷'}, {type: 'c3', name: '秋菊'},{type: 'c4', name: '冬梅'}, 
	{type: 'd1', name: '吉祥厅'}, {type: 'd2', name: '如意厅'},{type: 'd3', name: '福禄厅'}, {type: 'd4', name: '亨通厅'}, 
]

const tableData = [
	{name: '一楼', num: '1号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '2号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '3号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '4号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '5号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '6号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '7号桌', isLeisure: true, price: 500},
	{name: '一楼', num: '8号桌', isLeisure: true, price: 500},
	{name: '包间:春暖花开', num: '1号桌', isLeisure: false, price: 3500},
	{name: '包间:桃红柳绿', num: '2号桌', isLeisure: false, price: 3500},
	{name: '包间:五谷丰登', num: '3号桌', isLeisure: false, price: 3500},
	{name: '包间:傲雪凌霜', num: '4号桌', isLeisure: false, price: 3500},
	{name: '春兰', num: '1号桌', isLeisure: true, price: 2500},
	{name: '夏荷', num: '2号桌', isLeisure: false, price: 2500},
	{name: '秋菊', num: '3号桌', isLeisure: true, price: 2500},
	{name: '冬梅', num: '4号桌', isLeisure: false, price: 2500},
	{name: '吉祥厅', num: '1号桌', isLeisure: false, price: 1500},
	{name: '如意厅', num: '2号桌', isLeisure: true, price: 1500},
	{name: '福禄厅', num: '3号桌', isLeisure: false, price: 1500},
	{name: '亨通厅', num: '4号桌', isLeisure: false, price: 1500},
]

// Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/index', 'post', createCompanyData);
Mock.mock('/news/indexChart', 'post', indexChartData);
Mock.mock('/news/types', 'post', typesData);
Mock.mock('/news/tables', 'post', tableData);