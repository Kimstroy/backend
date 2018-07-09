<template>
  <div id="Top">
  	<div class="top">
      <div class="bam f-l">
      	<!-- <span>主页/</span>
      	<span v-for="name in nameArr">{{name}}<span v-if="nameArr.leng>1">/</span></span> -->
      </div>
      <div class="add f-r">快速添加<i class="el-icon-arrow-down"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     nameArr: this.$route.meta.name,
    }
  },
  mounted(){
  	// console.log(this.$route.meta.name)
  }
}
</script>

<style lang="less" scoped>
.f-l {
	float: left;
}
.f-r {
	float: right;
}
  .top {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    background: #fff;
    .add {
      padding: 20px 0;
      height: 20px;
      line-height: 20px;
      color: #cbcbcb;
    }
  }
</style>
