<template>
  <div class="tableBox">
    <el-table border :data="tableData">
      <el-table-column
        v-for="(item,index) in columns"
        :key="index"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
        align="center"
      >
        <template slot-scope="scope">
          <slot
            v-if="item.scope"
            :name="item.prop"
            :rowName="item.prop"
            :row="scope.row"
            :value="scope.row[item.prop]"
            :scop="item.scope"
          />
          <template v-else-if="item.props=='mg_state'">
            <el-switch @change="stateChange(scope.row)" v-model="scope.row.mg_state"></el-switch>
          </template>
          <template
            v-else
          >{{ (scope.row[item.prop]||scope.row[item.prop]===0)?scope.row[item.prop]:'-' }}</template>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row,scope.$index)">删除</el-button>
          <el-button @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[2, 4, 5, 10]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getUsersData } from "../../api/index.js";
export default {
  name: "tablelist",

  data() {
    return {
      pageData_: {
        pageSize: 5,
        currentPage: "",
        total: 10
      },
      tableData: [],
      columns: [
        { prop: "username", label: "用户名", width: "130" },
        { prop: "email", label: "邮箱", width: "130" },
        { prop: "role_name", label: "角色", width: "130" },
        {
          label: "动画",
          prop: "mobile",
          width: ""
        },
        {
          label: "状态",
          prop: "mg_state",
          width: "140px"
        }
      ],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      total: 0
    };
  },
  methods: {
    initData() {
      const { query, pagenum, pagesize } = this.queryInfo;
      getUsersData(query, pagenum, pagesize).then(res => {
        this.tableData = res.data.users;
        this.total = res.data.total;
        console.log(this.tableData);
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.queryInfo.pagesize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.queryInfo.pagenum = val;
      this.initData();
    }
  },
  created() {
    this.initData();
  }
};
</script>