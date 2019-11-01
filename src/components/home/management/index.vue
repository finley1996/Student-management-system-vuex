<template>
  <div class="pand">
    <Breadcrumb></Breadcrumb>
    <br />
    <div class="intow">
      <!-- 远程搜索框 -->
      <el-select
        v-model="value"
        @change="searchResultChange"
        clearable
        filterable
        remote
        reserve-keyword
        placeholder="请输学员姓名 "
        :remote-method="searchInput"
      >
        <el-option v-for="item in searchResult" :key="item.value" :value="item.name"></el-option>
      </el-select>
      <el-button icon="el-icon-search" circle  @click="search"></el-button>&nbsp;&nbsp;&nbsp;
      <!-- 学员信息添加 -->
      <div class="slot">
        <el-button type="primary" @click="dialogFormVisible = true;slotEvent='addStudentInfo'">添加信息</el-button>
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
    </div>
    <br />
    <!-- 选择框 -->
    <el-form ref="classForm" :model="classForm">
      <el-form-item label="选择班级">
        <el-select
          @change="selectClasses"
          @click.native="getAllClasses"
          v-model="classForm.selectedClass"
          placeholder="请选择班级"
        >
          <el-option label="全部" value="all"></el-option>
          <el-option :label="item" :value="item" v-for="item in classes" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格框 -->
    <el-table :data="stuData" style="width: 100%">
      <el-table-column label="头像" width="180">
        <template slot-scope="scope">
          <img width="50px" height="50px" :src="scope.row.avatarUrl" alt />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="class" label="班级" width="180"></el-table-column>
      <el-table-column prop="degree" label="学历" width="180"></el-table-column>
      <el-table-column prop="productUrl" label="项目地址" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            class="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            class="el-icon-delete"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="stuCount"
      :total="stuTotal"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import Breadcrumb from "./Breadcrumb";

import {
  getStuList,
  delStu,
  addStuInfo,
  editStuInfo,
  searchStu,
  getClasses
} from "@/api";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      //远程搜索数据
      searchResult: [],
      //分页器数据
      stuCount: 10,
      stuTotal: 30,
      // 选择框数据
      classes: [],
      value: "",
      classForm: {
        selectedClass: "",
        class: "H51901"
      },
      //学生添加数据
      dialogFormVisible: false,
      stuData: [],
      //表格数据
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
      formLabelWidth: "120px",
      slotEvent: "addStudentInfo"
    };
  },
  created() {
    this.updateTable();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let slotName = this.slotEvent;
          this[slotName]();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加学员信息
    addStudentInfo() {
      let data = this.ruleForm;
      addStuInfo(data).then(res => {
        if (res.data.state) {
          this.updateTable();
          //让这个模态框关闭
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        }
      });
    },
    //编辑、更新学员信息
    updateStuInfo() {
      let updated = this.ruleForm;
      editStuInfo(updated).then(res => {
        if (res.data.state) {
          //关闭模拟框
          this.dialogFormVisible = false;
          //更新表格
          this.updateTable();
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message({
            type: "error",
            message: "你没有做任何修改"
          });
        }
      });
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
    },
    //获取表格信息
    updateTable(params = { count: 10 }) {
      getStuList(params)
        .then(res => {
          if (res.data.state) {
            let { data, total } = res.data;
            this.stuData = data;
            this.stuTotal = total;
          }
        })
        .catch(err => {
          alert("网络请求错误！");
        });
    },
    //删除学员信息
    handleDelete(index, row) {
      let sId = row.sId;
      this.$confirm("此操作将永久删除学员信息，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delStu(sId).then(res => {
            console.log(sId);
            console.log(res.data.state);

            if (res.data.state) {
              this.stuData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "该消息已被删除"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //更新学员信息方法
    handleEdit(index, row) {
      this.slotEvent = "updateStuInfo";
      this.dialogFormVisible = true;
      //这里使用深拷贝，这样更改的时候视图不会出更新bug
      let stuForm = JSON.stringify(row);
      this.ruleForm = JSON.parse(stuForm);
    },
    //分页器
    currentChange(page) {
      //默认一页显示10条
      //console.log(this.classForm.selectedClass);
      let query = {
        key: this.value,
        count: 10,
        page,
        class: this.classForm.selectedClass
      };
      this.updateTable(query);
    },
    // 搜索框输入值发生变化的时候
    searchInput(key) {
      this.key = key;
      if (!key) {
        return;
      } else {
        let query = {
          key,
          count: 10
        };
        searchStu(query).then(res => {
          if (res.data.state) {
            this.searchResult = res.data.data;
            console.log(this.searchResult);
          }
        });
      }
    },
    //搜索框选中某个结果之后
    searchResultChange() {
      if (!this.value) {
        return;
      } else {
        let query = {
          key: this.value,
          count: 10
        };
        searchStu(query).then(res => {
          if (res.data.state) {
            this.stuData = res.data.data;
            this.searchResult = [];
            this.key = "";
            this.stuTotal = res.data.total;
          }
        });
      }
    },
    //获取班级列表
    getAllClasses() {
      //发送请求获取班级列表
      let _this = this;
      getClasses().then(res => {
        if (res.data.state) {
          _this.classes = res.data.data;
        }
      });
    },
    selectClasses() {
      //再次发送请求 获取学员信息
      let selected = this.classForm.selectedClass;
      let query =
        selected === "all"
          ? {
              count: 10
            }
          : {
              class: selected,
              count: 10
            };
      this.updateTable(query);
    },
    //点击放大镜按钮触发的事件
    search() {
      let query = {
        key: this.key,
        count: 10
      };
      searchStu(query).then(res => {
        if (res.data.state) {
          this.stuData = res.data.data;
          this.searchResult = [];
          //情况key
          this.value = this.key;
          this.key = "";
          this.stuTotal = res.data.total;
        }
      });
    }
  }
};
</script>
<style scoped>
.pand{
  padding: 30px
}
.intow {
  display: flex;
}
.el-input {
  width: 200px !important ;
}
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