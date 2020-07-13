<template>
  <div>

    <el-input type="text" v-model="query" clearable @clear="clearBtn">
      <el-button slot="append" @click="searchBtn" icon="el-icon-search"></el-button>
    </el-input>

  </div>
</template>
<script>
export default {
  name: 'searchBar',

  data () {
    return {
      query: ""
    }
  },
  methods: {
    clearBtn () {
      this.query = ''
      this.$emit('clearItem')
    },
    searchBtn (query) {
      this.$emit('searchItem', this.query)
    }
  }
}
</script>
<style lang="less" scoped>
</style>