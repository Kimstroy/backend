<template>
  <div id="Detail">
    详情页{{id}}
  </div>
</template>

<script>
export default {
  data () {
    return {
     	id: ''
    }
  },
  mounted(){
  	this.id = this.$route.query.id
  }
}
</script>

<style lang="less" scoped>
  
</style>
