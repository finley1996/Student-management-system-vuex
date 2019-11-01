<template>
  <div class="bg">
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
    <div class="regist">
      <h2 class="zcbt">用户注册</h2>
      <br />
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <a class="back2login" href="#/login">返回登录</a>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.lizi{
  position: absolute;
  width: 100%;
  height: 100%;
}
.back2login {
  position: relative;
  left: -100px;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: url("../../public/img/weather.png");
}
.regist {
  width: 400px;
  margin: 0 auto;
   opacity: 0.8;
  text-align: center;
  border: 1px solid rgb(57, 69, 87);
  box-shadow: 10px 20px 30px #000;
  background-color: rgb(247, 247, 247);
  padding: 50px;
}
.zcbt {
  color: rgb(111, 179, 224);
  position: relative;
  left: 10px;
  line-height: 50px;
}
</style>
<script>
import { regist } from "@/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        nickname: "",
        email: "",
        phone: "",
        sex: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "字符范围在5-10之间", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入你的昵称", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "昵称名在3到16个字符之间",
            trigger: "blur"
          }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
        phone: [
          { required: true, message: "请填写你的手机号", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择你的性别", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          regist(this.ruleForm).then(res => {
            if (res.data.state) {
              alert("注册成功！请登录！");
              this.$router.push("/login");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>