<template>
  <div id="Login">
	<div class="log-con">
		<div class="title">商户登录</div>
		<el-input
		  	class="newIn"
		    placeholder="用户名"
		    prefix-icon="el-icon-head"
		    v-model="username">
		</el-input>
		<el-input
		  	class="newIn"
		    placeholder="密码"
		    prefix-icon="el-icon-search"
		    v-model="password">
		</el-input>
		<router-link to="###">
			<div class="toShop">切换到店铺登录<i class="el-icon-d-arrow-right"></i></div>
		</router-link>	
		<el-button type="success" class="log-btn" @click.native='login'>登录</el-button>
		<div class="log-info">
			<div class="findpwd">找回密码</div>
			<div class="reg">立即注册</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     	username: '',
     	password: ''
    }
  },
  mounted(){

  },
  methods: {
  	login(){
  		if(this.username && this.password) {
  			this.$message({
	          message: '恭喜你，登录成功！',
	          type: 'success'
	        });
  			this.$router.push({
  				path: '/index'
  			})
  		}else if(!this.username){
  			this.$message({
	          message: '用户名不能为空！',
	          type: 'warning'
	        });
  		}else if(!this.password){
  			this.$message({
	          message: '密码不能为空！',
	          type: 'warning'
	        });
  		}
  	}
  }
}
</script>

<style lang="less" scoped>
  #Login {
  	width: 100%;
  	height: 100%;
  	.log-con {
  		padding: 30px;
  		width: 340px;
  		height: 340px;
  		position: absolute;
  		top: 0;
	  	bottom: 0;
	  	left: 0;
	  	right: 0;
	  	margin: auto;
	  	border-radius: 8px;
	  	box-shadow: 0px 0px 5px 5px #ccc;
	  	.title {
	  		height: 80px;
	  		line-height: 80px;
	  		text-align: center;
	  		font-size: 20px;
	  		font-weight: bold;
	  	}
	  	.newIn {
	  		margin: 10px 0;
	  		width: 340px;
	  	}
	  	.toShop {
	  		margin-top: 20px;
	  		height: 18px;
	  		line-height: 18px;
	  		width: auto;
	  		float: right;
	  		color: #cbcbcb;
	  	}
	  	.log-btn {
	  		margin-top: 10px;
	  		width: 340px;
	  		background: #0eb089;
	  		border-color: #0eb089;
	  	}
	  	.log-info {
	  		margin-top: 30px;
	  		width: 340px;
	  		height: 20px;
	  		color: #cbcbcb;
	  		.findpwd {
	  			float: left;
	  		}
	  		.reg {
	  			float: right;
	  		}
	  	}
  	}
  }
</style>
