<template>
  <div class="goods">
    <h1>角色列表</h1>
    <role-list
      :columns="columns"
      :tableData="tableData"
      :queryInfo="queryInfo"
      @handle-size="sizeChange"
      @handle-current="currentChange"
      :total="total"
    >
      <template slot-scope="scope" slot="actionColumn">
        <div>
          <el-button type="text" @click="toAction(scope.row)">删除</el-button>
          <el-button type="text" @click="toDetail(scope.row)">查看</el-button>
        </div>
      </template>
    </role-list>
  </div>
</template>
<script>
import RoleList from "./RoleList.vue";
import { getRolesData } from "../../api/index.js";
export default {
  components: { RoleList },
  data() {
    return {
      total: 10,
      columns: [
        {
          label: "#",
          prop: "id",
          width: "80px"
        },
        {
          label: "角色",
          prop: "roleName",
          width: ""
        },
        {
          label: "描述",
          prop: "roleDesc",
          width: ""
        }
      ],
      actionColumn: {
        width: "160px",
        align: "center",
        fixed: "right"
      },
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      tableData: []
    };
  },
  methods: {
    sizeChange(arg) {
      console.log(arg);
      this.queryInfo.pagesize = arg;
      this.initData();
    },
    currentChange(arg) {
      console.log(arg);
      this.queryInfo.pagenum = arg;
      this.initData();
    },
    async initData() {
      await getRolesData().then(res => {
        console.log(res.data.goods, res);
        if (res.meta.status == 200) {
          this.$message.success({
            message: res.meta.msg,
            duration: 2000,
            center: true
          });
          this.tableData = res.data;
          this.total = res.data.total;
        }
      });
    },
    toAction(row, op) {},
    toDetail(row, op) {}
  },
  created() {
    this.initData();
  }
};
</script>
