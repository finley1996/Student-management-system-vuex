<template>
  <div>
    <div class="qflogo"></div>
    <el-menu default-active="Welcome" class="el-menu-vertical-demo" :collapse="isCollapse" text-color="#A67D3D" active-text-color="#CD7F32" :router="true">
      <el-menu-item index="Welcome">
        <i class="el-icon-menu"></i>
        <span slot="title">管理首页</span>
      </el-menu-item>
      <el-submenu index="#">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">学员管理</span>
        </template>
        <el-menu-item index="Management">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-menu"></i>学员信息</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">我的中心</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo.el-menu {
   background-image: url('../../../public/img/weather.png');
}
.qflogo{
  height: 60px;
  background-image: url('../../../public/img/weather.png');
  background-repeat: no-repeat;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isCollapse"])
  }
};
</script>