<template>
  <div class="cont">欢迎登入！{{userinfo.nickname}}</div>
</template>
<script>
// import {mapState} from 'vuex'
export default {
  //   computed:{
  //     ...mapState(['userinfo'])
  //   },
  data() {
    return {
      userinfo: {}
    };
  },
  created() {
    this.userinfo = JSON.parse(localStorage.userinfo);
  }
};
</script>
<style>
.cont{
  width: 100%;
  height: 100%;
  background-image: url('../../../../public/img/welcome.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 25px;
  text-align: center;
  color:goldenrod
}
</style>