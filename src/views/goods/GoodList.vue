<template>
  <div class="goods">
    <el-row :gutter="20">
      <el-col :span='8'>
        <search-bar @searchItem='searchBtn' @clearItem="clearBtn">
        </search-bar>
      </el-col>
      <el-col :span="4">
        <el-button type='primary' @click="addGoods">添加商品</el-button>
      </el-col>
    </el-row>

    <table-list :columns="columns" :tableData="tableData">
      <template slot-scope="scope" slot="actionColumn">
        <div>
          <el-button type="text" @click="toAction(scope.row,scope.$index)">删除</el-button>
          <el-button type="text" @click="toDetail(scope.row,scope.$index)">查看</el-button>
        </div>
      </template>
    </table-list>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage" :page-sizes="[5, 10, 20,50]" :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>
<script>
import SearchBar from "../../components/SearchBar.vue"
import TableList from "../../components/tableList.vue";
import { getGoodsList } from "../../api/index.js";
export default {
  components: { TableList, SearchBar },
  data () {
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
    async initData (queryInfo) {
      const { query, pagenum, pagesize } = queryInfo;
      const res = await getGoodsList(query, pagenum, pagesize)
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
      ;
    },
    handleSizeChange (arg) {
      console.log(arg);
      this.queryInfo.pagesize = arg;
      this.initData(this.queryInfo);
    },
    handleCurrentChange (arg) {
      console.log(arg);
      this.queryInfo.pagenum = arg;
      this.initData(this.queryInfo);
    },
    toAction (row, op) { },
    toDetail (row, op) { },
    searchBtn (query) {
      this.queryInfo.query = query
      console.log(query);
      this.initData(this.queryInfo);
    },
    clearBtn () {
      this.queryInfo.query = '',
        this.queryInfo.pagenum = 1,
        this.queryInfo.pagesize = 5,
        this.initData(this.queryInfo);
    },
    //添加商品按钮
    addGoods () {
      this.$router.push({ name: 'addgoods' })
    }
  },
  created () {
    this.initData(this.queryInfo);
  }
};
</script>
