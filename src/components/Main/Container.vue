<template>
	<div id="Container">
		<el-container>
		  <el-aside width="200px">
		  	<div class="logo">LOGO</div>
		  	<el-menu
		      :default-active="onRoutes"
		      unique-opened 
		      router
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose"
		      background-color="#324057"
		      text-color="#fff"
		      active-text-color="#ffd04b">
		      	<template v-for="(item,index) in menus">
					<template v-if="item.children.length > 0">
						<el-submenu :index="item.index" :key="index">
							<template slot="title">
								<i :class="item.icon"></i>
								<span slot="title">{{ item.title }}</span>
							</template>
							<el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">
								{{ subItem.title }}
							</el-menu-item>
						</el-submenu>
					</template>
					<template v-else>
						<el-menu-item :index="item.index" :key="index">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</el-menu-item>
					</template>
				</template>
		    </el-menu>
		  </el-aside>
		  <el-container>
		    <el-header>
		    	<div class="head">
		    		<el-breadcrumb separator="/">
					  	<el-breadcrumb-item :to="{ path: item=='首页'?'/': null }" v-for="(item,index) in $route.meta.name" :key="index">{{item}}</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="userInfo">
						<div class="info">
							<div class="name">
								{{userInfo.name}}
							</div>
							<div class="head">
								<img src="../../assets/images/timg.jpg">
							</div>
						</div>
						<div class="info">
							<el-badge :value="3" class="item">
							   <i class="el-icon-bell"></i>
							</el-badge>
						</div>
						<div class="info">
							<div class="close">
								<i class="el-icon-delete"></i>
							</div>	
						</div>
					</div>
		    	</div>
		    </el-header>
		    <el-main>
		    	<Top></Top>
		    	<router-view></router-view>
		    </el-main>
		     <el-footer height="30px"></el-footer>
		  </el-container>
		</el-container>		
	</div>
</template>
<script>	
	import Top from '../childrenCom/Top.vue'
	export default {
		components: {
		    Top
		},
		data(){
			return{
				routeTab: [],
				userInfo: {
					name: '张三',
					headSrc: require('../../assets/images/timg.jpg'),

				},
				menus: [
					{
						icon: 'el-icon-location',
						index: 'index',
						title: '首页',
						children :[
							
						]
					},
					{
						icon: 'el-icon-menu',
						index: 'tableManager',
						title: '桌台管理',
						children :[]
					},
					{
						icon: 'el-icon-document',
						index: 'types',
						title: '分类',
						children :[]
					},
					{
						icon: 'el-icon-setting',
						index: 'setting',
						title: '设置',
						children :[]
					}
				]
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
		},
		mounted(){
			this.setRoute(this.$route)
		},
		methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      setRoute(obj){
	      	// this.routeTab.push(obj) 
	      	if(this.routeTab.length > 0){
	      		console.log(123)
	      		let has;
		      	this.routeTab.forEach( item => {
		      		// console.log(item)
		      		if(item.path == obj.path) {
		      			has = true
		      		}
		      	})
		      	if(has){

		      	}else {
		      		this.routeTab.push(obj)
		      	}
	        }else { 
	        	this.routeTab.push(obj)
	        }
	    	// this.routeTab = Array.from(new Set(this.routeTab))
	      }
	    },
	    watch: {
	    	'$route'(to, from) {
	    		this.setRoute(to)
	    	}
	    }
	}
</script>
<style>
	.el-badge__content {
		background: #0eb089;
		height: 12px;
		line-height: 12px;
		padding: 0 3px;
	}
	.el-badge__content.is-fixed {
		top: 10px;
	}
</style>
<style lang="less" scoped>
	#Container {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		.el-container {
			height: 100%;
			.el-aside {
				background: rgb(50, 65, 87);
				.logo {
					width: 100%;
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 30px;
					color:#fff;
					border-bottom: 1px solid #303133;
				}
				.el-menu {
					border: none;
				}
			}
			.el-header{
				background: #B3C0D1;
				.el-breadcrumb {
					padding-top: 30px;
					float: left;
					height: 30px;
					line-height: 30px;
				}
				.userInfo {
					float: right;
					margin: 15px 0 5px;
					height: 40px;
					line-height: 40px;
					// width: 200px;
					color: #fff;
					.info {
						float: left;
						margin-right: 30px;
						.name {
							float: left;
							height: 40px;
							line-height: 40px
						}
						.head {
							float: left;
							width: 40px;
							height: 40px;
							margin-left: 10px;
							border-radius: 50%;
							overflow: hidden;
							img {
								display: block;
								width: 100%;
								height: 100%;
							}
						}
						.item {
							font-size: 20px;
							color: #fff;
						}
						.close {
							width: 40px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							color: #fff;
							font-size: 18px;
						}
					}
				}
			}
			.el-main {
				padding: 0;
				background: #f6faf9;
			}
			.el-footer {
				background: #B3C0D1;
			}
		}
	}
	.el-menu-item-group__title {
		padding: 0;
		padding-left: 20px;
	}
	.head {
		height: 20px;
	}
</style>