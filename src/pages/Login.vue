<template>
  <div class="container">
<vue-particles
        color="#A67D3D"
        :particleOpacity="0.9"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#A67D3D"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm myForm"
    >
      <img class="gougou" src="../../public/img/gougou.png" alt />
      <h3 class="bt">千峰学员管理系统登录</h3>
      <hr />
      <el-form-item label="用户名 :" prop="username" class="formitem">
        <el-input class="forminput" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码 :" prop="password" class="formitem">
        <el-input class="forminput" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="formitem">
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button class="btn" type="info" @click="regist">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.lizi{
  position: absolute;
  width: 100%;
  height: 100%;
}
.gougou {
  position: absolute;
  width: 100px;
  height: 80px;
  top: -80px;
  left: 350px;
}
.container {
  height: 100%;
  background-image: url("../../public/img/weather.png");
}
.myForm {
  border: 1px solid rgb(57, 69, 87);
  opacity: 0.8;
  box-shadow: 10px 20px 30px #000;
  padding: 50px;
  width: 400px;
  background-color: rgb(247, 247, 247);
  /* background-image: url('../../public/img/gougou.png'); */
  text-align: center;
  position: relative;
  top: 200px;
  left: 500px;
}
/* .btn {
  width: 100%;
  margin-left: 0;
  position: relative;
  left: -50px;
} */
.bt {
  color: rgb(111, 179, 224);
  margin: 20px 0;
}
.formitem {
  margin: 20px 0;
  left: -50px;
}
.forminput {
  width: 250px;
  position: relative;
  left: -20px;
}
</style>
<script>
import { login } from "@/api";
export default {
  data() {
    let validatePwd = (rule, value, callback) => {
      // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      // let result = reg.test(value);
      if (value) {
        callback();
      } else {
        callback(new Error("密码至少包含 数字和英文，长度6-20"));
      }
    };
    let validateUsername = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]{4,16}$/;
      let result = reg.test(value);
      if (result) {
        callback();
      } else {
        callback(new Error("4到16位(字母，数字，下划线，减号)"));
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    regist() {
      this.$router.push("/regist");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.ruleForm).then(res => {
            if (res.data.state) {
              let { token, userInfo } = res.data;
              localStorage.setItem("lgtoken", token);
              this.$store.commit("SETUSERINFO", userInfo);
              //由于刷新后信息会丢失 所以存一分userinfo到localstorage
              localStorage.setItem("userinfo", JSON.stringify(userInfo));
              this.$router.push("/Welcome");
            } else {
              this.$alert("账户或者密码错误", "提示", {
                confirmButtonText: "确定"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>