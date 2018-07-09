<template>
  <div id="About">
   	<div class="main">
   		<div class="areas bs white">
   			<div class="ar-t">
   				<div class="title f-l">区域</div>
   				<div class="actions f-r">
   					<div class="add f-l"><i class="el-icon-circle-plus-outline"></i><span>添加区域</span></div>
   					<div class="add f-l"><i class="el-icon-circle-plus-outline"></i><span>区域管理</span></div>
   				</div>
   			</div>
   			<div class="area">
   				<el-tag 
   				size="medium"
   				v-for="(tag, i) in tags" 
   				:key="i" 
   				:class="{active: activeIndex == i}" 
   				@click.native="changeActive(i)">
		   			{{tag.name}}
		   		</el-tag>
   			</div>
   		</div>
   		<div class="areas bs white m-t">
   			<div class="ar-t">
   				<div class="title f-l green">全部</div>
   				<div class="actions f-r">
   					<div class="add f-l"><i class="el-icon-circle-plus-outline"></i><span>添加桌台</span></div>
   					<div class="add f-l"><i class="el-icon-circle-plus-outline"></i><span>桌台编辑</span></div>
   				</div>
   			</div>
   			<div class="area">
   				<div class="table f-l bs" v-for="item in tables" :class="{leisureb: !item.isLeisure}">
   					<div class="ty" :class="{lein: !item.isLeisure}">
   						<p class="tya" :class="{w: !item.isLeisure}">{{item.name}}</p>
   						<p :class="{w: !item.isLeisure}">({{item.num}})</p>
   					</div>
   					<div class="pr" >
   						<p :class="{leisure: !item.isLeisure}" v-if="!item.isLeisure">{{item.price}}</p>
   						<p v-else>空闲</p>
   					</div>
   				</div>
   			</div>
   		</div>
   	</div>
  </div>
</template>

<script>
	import api from './../../axios/index.js'
export default {
  data () {
    return {
     	tags: [],
     	activeIndex: 0,
     	tables: []
    }
  },
  mounted(){
  	this.getTypesData();
  	this.getTablesData();
  },
  methods: {
  	getTypesData(){
  		api.$http('/news/types')
  		.then(res => {
  			this.tags = res
  		})
  	},
  	getTablesData(){
  		api.$http('/news/tables')
  		.then(res => {
  			this.tables = res
  		})
  	},
  	changeActive(i){
  		this.activeIndex = i
  	}
  }
}
</script>

<style lang="less" scoped>
 @import '../../assets/css/common.less';
  .main {
  	padding: 20px;
  	.areas {
  		min-height: 120px;
  		.ar-t {
  			padding: 0 15px;
  			height: 32px;
  			line-height: 32px;
  			color: #cbcbcb;
  			border-bottom: 1px solid #cbcbcb;
  			.title {

  			}
  			.actions {
  				color: @green;
  				padding: 10px 0;
  				div{
  					height: 12px;
  					line-height: 12px;
  					margin-right: 20px;
  					span {
  						display: inline-block;
  						margin-left: 5px;
  					}
  				}
  			}
  		}
  		.area {
  			padding: 10px;
  			overflow: hidden;
  			.el-tag {
  				margin: 5px;
  				cursor: pointer;
  				background: none;
  				color: #333;
  				border: 1px solid #cbcbcb;
  			}
  			.active {
  				background: @green;
  				color: #fff;
  				border: 1px solid @green;
  			}
  			.table {
  				width: 100px;
  				height: 106px;
  				margin: 6px 5px;
  				border: 1px solid #cbcbcb; 
  				color: @gary;
  				.ty {
  					text-align: center;
  					padding: 6px 0;
  					height: 37px;
  					line-height: 18px;
  					border-bottom: 1px dotted #cbcbcb;
  					.tya {
  						color: #333;
  					}
  					.w {
  						color: #fff;
  					}
  				}
  				.lein {
					background: @green;
					border-bottom: 1px dotted @green;
				}
  				.pr {
  					height: 56px;
  					line-height: 56px;
  					text-align: center;
  				}
  				.leisure {
					color: @orange;
				}
  			}
  			.leisureb {
  				border: 1px solid @green;
  				box-shadow: 0 0 1px 1px @green;
  			}
  		}
  	}
  	.m-t {
  		margin-top: 30px;
  	}
  }
</style>
