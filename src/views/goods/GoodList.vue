<template>
  <div class="goods">
    <h1>商品列表</h1>
    <table-list :columns="columns" :tableData="tableData">
      <template slot-scope="scope" slot="actionColumn">
        <div>
          <el-button type="text" @click="toAction(scope.row,scope.$index)">删除</el-button>
          <el-button type="text" @click="toDetail(scope.row,scope.$index)">查看</el-button>
        </div>
      </template>
    </table-list>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[3, 6, 6, 8]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import TableList from "../../components/tableList.vue";
import { getGoodsList } from "../../api/index.js";
export default {
  components: { TableList },
  data() {
    return {
      pageData_: {
        pageSize: 5,
        currentPage: ""
      },
      total: 10,
      columns: [
        {
          label: "#",
          prop: "goods_id",
          width: "80px"
        },
        {
          label: "商品名称",
          prop: "goods_name",
          width: "400px"
        },
        {
          label: "单价(元)",
          prop: "goods_price",
          width: ""
        },
        {
          label: "商品数量",
          prop: "goods_number",
          width: ""
        },
        {
          label: "创建时间",
          prop: "add_time",
          width: "",
          filter: true
        },
        {
          label: "更新时间",
          prop: "upd_time",
          width: "",
          filter: true
        },
        {
          label: "商品重量",
          prop: "goods_weight",
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
    initData() {
      const { query, pagenum, pagesize } = this.queryInfo;
      getGoodsList(query, pagenum, pagesize).then(res => {
        console.log(res.data.goods, res);
        if (res.meta.status == 200) {
          this.$message.success({
            message: res.meta.msg,
            duration: 2000,
            center: true
          });
          this.tableData = res.data.goods;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(arg) {
      console.log(arg);
      this.queryInfo.pagesize = arg;
      this.initData();
    },
    handleCurrentChange(arg) {
      console.log(arg);
      this.queryInfo.pagenum = arg;
      this.initData();
    },
    toAction(row, op) {},
    toDetail(row, op) {}
  },
  created() {
    this.initData();
  }
};
</script>
