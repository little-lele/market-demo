<template>
  <div class="goods">
    <h1>角色列表</h1>
    <com-table
      :columns="columns"
      :tableData="tableData"
      :queryInfo="queryInfo"
      @handleSize="sizeChange"
      @handle-current="currentChange"
      :total="total"
    >
      <template slot-scope="scope" slot="actionColumn">
        <div>
          <el-button type="text" @click="toAction(scope.row,scope.$index)">删除</el-button>
          <el-button type="text" @click="toDetail(scope.row,scope.$index)">查看</el-button>
        </div>
      </template>
    </com-table>
  </div>
</template>
<script>
import ComTable from "../../components/ComTable.vue";
import { getOrdersData } from "../../api/index.js";
export default {
  components: { ComTable },
  data() {
    return {
      total: 10,
      columns: [
        {
          label: "#",
          prop: "order_id",
          width: "80px"
        },
        {
          label: "订单编号",
          prop: "order_number",
          width: ""
        },
        {
          label: "订单总价",
          prop: "order_price",
          width: ""
        },
        {
          label: "是否付款",
          prop: "pay_status",
          width: ""
        },
        {
          label: "是否发货",
          prop: "is_send",
          width: ""
        },

        {
          label: "创建时间",
          prop: "create_time",
          width: "",
          filter: true
        }
      ],
      actionColumn: {
        label: "权限等级",
        width: "",
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
    async initData() {
      const { query, pagenum, pagesize } = this.queryInfo;
      await getOrdersData(query, pagenum, pagesize).then(res => {
        console.log(res.data, res);
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
    sizeChange(arg) {
      console.log(arg, 1);
      this.queryInfo.pagesize = arg;
      this.initData(this.queryInfo);
    },
    currentChange(arg) {
      console.log(arg, 1);
      this.queryInfo.pagenum = arg;
      this.initData(this.queryInfo);
    },
    toAction(row, op) {
      console.log(row, op);
    },
    toDetail(row, op) {
      console.log(row, op);
    }
  },
  created() {
    this.initData();
    console.log(this.actionColumn.label);
  }
};
</script>
