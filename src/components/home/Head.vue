<template>
<el-row type="flex" class="row-bg" justify="space-between">
  <el-col :span="6"><div class="grid-content bg-purple left"><i @click="CHANGECOLLAPSE" class="el-icon-s-operation"></i></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light">千锋教育学员管理系统</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple right">欢迎您！{{userinfo.username}} <a href="#" @click.prevent='quit'>登出</a></div></el-col>
</el-row>
</template>
<style>
 .el-icon-s-operation{
     font-size: 30px;

 }
 .grid-content{
     color:#A67D3D
 }
 .left{
     text-align: left
 }
 .right{
     text-align: right
 }
</style>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapState(['isCollapse']) 
  },
  methods:{
      ...mapMutations(['CHANGECOLLAPSE']),
      quit(){
        this.$router.push('/login')
        localStorage.removeItem('lgtoken')
      }
  },
  data () {
    return {
        userinfo : {}      
    }
},
  created () {
      this.userinfo = JSON.parse(localStorage.userinfo) 
  }
};

</script>
