
<template>
  <!-- "dialogFormVisible = true" -->
  <!-- :visible.sync="dialogFormVisible" -->
  <!-- :label-width="formLabelWidth" -->
  <div class="slot">
    <el-button type="primary" @click="dialogFormVisible = true">添加信息</el-button>

    <el-dialog title="增加学员项目" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://106.12.79.128:1901/students/uploadStuAvatar"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.avatarUrl" :src="ruleForm.avatarUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="productUrl">
          <el-input type="text" v-model="ruleForm.productUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input type="text" v-model="ruleForm.class"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="ruleForm.city"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="degree">
          <el-input v-model="ruleForm.degree"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">添 加</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import { addStuInfo } from "@/api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        avatarUrl: "",
        productUrl: "",
        class: "",
        age: "",
        city: "",
        degree: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        productUrl: [
          { required: true, message: "请输入你的项目地址", trigger: "change" }
        ],
        class: [
          { required: true, message: "请输入你所在班级", trigger: "change" }
        ],
        age: [{ required: true, message: "请填写你的年龄", trigger: "change" }],
        city: [
          {
            required: true,
            message: "请输入你目前居住的城市",
            trigger: "change"
          }
        ],
        degree: [
          { required: true, message: "请输入你的学历", trigger: "change" }
        ],
        description: [
          { required: true, message: "一句话对自己的评价", trigger: "change" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addStuInfo(this.ruleForm).then(res => {
            if (res.data.state) {
              alert("添加成功");
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
    },
    //图片上传显示
    handleAvatarSuccess(res, file) {
      this.ruleForm.avatarUrl = res.avatarUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>