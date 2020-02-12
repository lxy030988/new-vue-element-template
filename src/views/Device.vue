<template>
  <div class="container">
    <div v-show="show === 'table'">
      <div class="handle-box">
        <el-form
          class="searchForm"
          :inline="true"
          :model="searchForm"
          ref="searchForm"
        >
          <el-form-item prop="type">
            <el-select
              v-model="searchForm.type"
              placeholder="请选择设备类型"
              clearable
            >
              <el-option
                v-for="(value, index) in types"
                :key="index"
                :label="value"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="status">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择设备状态"
              clearable
            >
              <el-option
                v-for="(value, index) in statuses"
                :key="index"
                :label="value"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchSubmit" type="primary" plain
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="add"
          >新建</el-button
        >
      </div>
      <el-table stripe size="medium" :data="tableData" style="width: 100%">
        <el-table-column
          prop="no"
          label="设备编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :formatter="formatType"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="formatStatus"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="text"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              class="delete"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div v-show="show === 'add'">
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="120px"
        class="addForm"
      >
        <el-form-item label="id" prop="id" style="display:none">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item
          label="设备编号"
          prop="no"
          :rules="[
            { required: true, message: '设备编号不能为空', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="addForm.no"
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备类型"
          prop="type"
          :rules="[
            { required: true, message: '设备类型不能为空', trigger: 'change' }
          ]"
        >
          <el-select v-model="addForm.type" placeholder="请选择设备类型">
            <el-option
              v-for="(value, index) in types"
              :key="index"
              :label="value"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备状态"
          prop="status"
          :rules="[
            { required: true, message: '设备状态不能为空', trigger: 'change' }
          ]"
        >
          <el-select v-model="addForm.status" placeholder="请选择设备状态">
            <el-option
              v-for="(value, index) in statuses"
              :key="index"
              :label="value"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="经度"
          prop="longitude"
          :rules="[
            { required: true, message: '经度不能为空', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="addForm.longitude"
            placeholder="请输入经度"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="纬度"
          prop="latitude"
          :rules="[
            { required: true, message: '纬度不能为空', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="addForm.latitude"
            placeholder="请输入纬度"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button @click="show = 'table'">返回</el-button>
          <el-button @click="addSubmit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getType,
  getStatus,
  getCount,
  getList,
  addData,
  updateData,
  deleteData
} from "@/api/device";
export default {
  data() {
    return {
      show: "table",
      types: {},
      statuses: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addForm: {
        id: null,
        latitude: "",
        longitude: "",
        no: "",
        status: "",
        type: ""
      },
      postType: "add",
      searchForm: {
        status: "",
        type: ""
      }
    };
  },
  async created() {
    const { data: types } = await getType();
    this.types = types;
    const { data: statuses } = await getStatus();
    this.statuses = statuses;

    this.getCount();
    this.getList();
  },
  mounted() {},
  methods: {
    formatType(row, column, cellValue) {
      return this.types[cellValue];
    },
    formatStatus(row, column, cellValue) {
      return this.statuses[cellValue];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    async getCount() {
      const { data } = await getCount(this.searchForm);
      this.total = data;
    },
    async getList() {
      const { data } = await getList({
        ...this.searchForm,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        property: "no",
        order: "ASC"
      });
      this.tableData = data;
    },
    searchSubmit() {
      this.getCount();
      this.getList();
    },
    add() {
      this.show = "add";
      this.$refs.addForm.resetFields();
      this.postType = "add";
      this.addForm.longitude = "";
      this.addForm.latitude = "";
    },
    postData(data) {
      if (this.postType === "add") {
        return addData(data);
      } else {
        return updateData(data);
      }
    },
    addSubmit() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const { code } = await this.postData(this.addForm);
          if (code === "200") {
            this.show = "table";
            this.currentPage = 1;
            this.getCount();
            this.getList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit(row) {
      Object.keys(this.addForm).forEach(item => {
        this.addForm[item] = row[item];
      });
      this.show = "add";
      this.postType = "update";
    },
    handleDelete(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { code } = await deleteData({ id });
          if (code === "200") {
            this.getCount();
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
