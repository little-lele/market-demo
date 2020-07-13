<template>
  <div>
    <el-alert title="错误提示的文案" type="warning" center :closable="false" show-icon>
    </el-alert>
    <el-steps :active="activeIndex+''" align-center>
      <el-step description="基本信息"></el-step>
      <el-step description="商品参数"></el-step>
      <el-step description="商品属性"></el-step>
      <el-step description="商品图片"></el-step>
      <el-step description="商品内容"></el-step>
      <el-step description="完成" name="5==activeIndex"></el-step>
    </el-steps>
    <el-tabs :tab-position="tabPosition" style="height: 200px;" @tab-click="checkcTab">
      <el-tab-pane label="基本信息">用户管理</el-tab-pane>
      <el-tab-pane label="商品参数">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
      <el-tab-pane label="商品内容">角色管理</el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabPosition: 'left',
      activeIndex: 0
    }
  },
  methods: {
    checkcTab () {
      console.log(this.activeIndex);
    }
  }
}
</script>