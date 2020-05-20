<template>
  <div class="tableBox">
    <el-table border :data="tableData">
      <template v-for="(item,index) in columns">
        <el-table-column
          align="center"
          :label="item.label"
          :prop="item.prop"
          :key="index"
          :width="item.width"
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
            <template v-else-if="item.filter">{{scope.row[item.prop] | formatDate }}</template>
            <template
              v-else
            >{{ (scope.row[item.prop]||scope.row[item.prop]===0)?scope.row[item.prop]:'-' }}</template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="actionColumn"
        :label="actionColumn.label||defaultData.actionColumn.label"
        :fixed="actionColumn.fixed||defaultData.actionColumn.fixed"
        :width="actionColumn.width"
        align="center"
      >
        <template slot-scope="scope">
          <slot :scop="scope" :row="scope.row" name="actionColumn" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total>=5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.currentPage"
      :page-sizes="[2,4,6,8]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "Rolelist",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    actionColumn: {
      type: [String, Object],
      default() {
        return {};
      }
    },
    queryInfo: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      defaultData: {
        actionColumn: {
          //表格操作列默认值
          label: "操作",
          fixed: undefined
        }
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSize", val);
      console.log(val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrent", val);
      console.log(val);
    }
  },
  filters: {
    formatDate(stamp) {
      const time = new Date(stamp * 1000);
      const year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let date = time.getDate();
      date = date < 10 ? "0" + date : date;
      let hrs = time.getHours();
      hrs = hrs < 10 ? "0" + hrs : hrs;
      let min = time.getMinutes();
      min = min < 10 ? "0" + min : min;
      return `${year}-${month}-${date} ${hrs}:${min}`;
    }
  },
  created() {
    console.log(this.actionColumn.label);
  }
};
</script>