# vue-backend-ele

> 饿了么ui搭建后台管理系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#element-ui 
npm i element-ui -S
在main.js加入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';;
Vue.use(ElementUI);

#axios
npm install axios
封装axios
参考src/axios/index.js
使用  在要用的页面 import api from './axios/index.js'(文件路径)
methods: {
	fn(){
		api.(url, params).then(res=>{}).catch(err=>{})
	}
}

#less使用
npm install less less-loader --save
修改webpack.base.conf.js的
module: {
    rules: []
}的rules中添加
{
	test: /\.less$/,
	loader: "style-loader!css-loader!less-loader",
}

#mock使用
npm install mockjs
在src中创建mock.js具体内容参考src/mock.js文件，在main.js中require('./mock')

