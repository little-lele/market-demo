<template>
  <div class="home">
    <el-container class="slider">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        router
        :collapse-transition="false"
      >
        <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="menuIconObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="n.path" v-for="n in item.children" :key="n.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{n.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-container>
    <div class="breadCom">
      电商后台管理系统
      <el-button @click="cancleBtn">退出</el-button>
    </div>

    <div class="contain">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.breadName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuList } from "@/api/index.js";
export default {
  data() {
    return {
      menuList: [],
      menuIconObj: {
        125: "el-icon-s-custom",
        103: "el-icon-s-operation",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing"
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getMenu() {
      getMenuList().then(res => {
        console.log(res);
        this.menuList = res.data;
      });
    },
    cancleBtn() {
      console.log("退出");
    }
  },
  created() {
    this.getMenu();
    console.log(this.menuList);
  }
};
</script>
<style lang="less" scoped>
@com-length: 120px;
.home {
  .slider {
    width: 200px;
    height: 100vh;
    // background-color: skyblue;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: @com-length / 2;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .contain {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 120px);
    background-color: #ccc;
    padding: @com-length / 2 20px 20px 220px;
    .el-breadcrumb {
      height: @com-length / 2;
      line-height: @com-length / 2;
    }
    .content {
      background-color: #fff;
      color: #333;
      padding: 10px;
    }
  }
  .breadCom {
    width: 100%;
    padding: 0 20px;
    height: @com-length / 2;
    background-color: #545c64;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    line-height: @com-length / 2;
    font-size: 24px;
    color: #fff;
    .el-button {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translate(0, -50%);
    }
  }
}
</style>
