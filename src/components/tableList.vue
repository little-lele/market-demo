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
            <!-- <template v-else-if="item.prop=='upd_time'">{{scope.row[item.prop] | formatDate }}</template> -->
            <template
              v-else
            >{{ (scope.row[item.prop]||scope.row[item.prop]===0)?scope.row[item.prop]:'-' }}</template>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="actionColumn" label="操作" align="center">
        <template slot-scope="scope">
          <slot :scop="scope" :row="scope.row" name="actionColumn" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//import formatDate from "../tools/formdata.js";
export default {
  name: "tablelist",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    actionColumn: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // handleSizeChange() {
    //   console.log();
    //   this.$emit("handleSizeChange", this.pageData_.pageSize);
    // },
    // handleCurrentChange() {
    //   this.$emit("handleCurrentChange", this.pageData_.currentPage);
    // }
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
  }
};
</script>