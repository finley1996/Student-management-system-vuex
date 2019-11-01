<template>
  <el-container>
    <el-aside width="200"><Menu></Menu></el-aside>
    <el-container>
      <el-header>
          <Headers></Headers>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Headers from '../components/home/Head'
import Menu from "../components/home/Menu"
export default{
    components:{
        Headers,Menu
    }
}
</script>
<style>
.el-header,
.el-footer {
  background-image: url('../../public/img/weather.png');
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-image: url('../../public/img/weather.png');
  color: #333;
  text-align: center;
  line-height: 200px;
}


body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-main{
  padding: 0px !important
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>