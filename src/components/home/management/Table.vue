<template>
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
        <el-button class="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          class="el-icon-delete"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
import { getStuList, delStu } from "@/api";
export default {
  data() {
    return {
      stuData: []
    };
  },
  created() {
    this.updateTable();
  },
  methods: {
    updateTable(params = {}) {
      getStuList(params)
        .then(res => {
          console.log(res);
          if (res.data.state) {
            let { data } = res.data;
            this.stuData = data;
          }
        })
        .catch(err => {
          alert("网络请求错误！");
        });
    },
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
    handleEdit(index, row){

    }

  }
};
</script>