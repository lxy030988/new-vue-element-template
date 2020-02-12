<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#242F42"
      text-color="#FFFEFF"
      active-text-color="#FFFEFF"
      router
    >
      <sidebar-item v-for="item in navs" :key="item.id" :item="item" />
    </el-menu>
  </div>
</template>

<script>
import bus from "../bus";
import SidebarItem from "./SidebarItem";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("nav");

export default {
  components: { SidebarItem },
  data() {
    return {
      collapse: false
    };
  },
  computed: {
    ...mapState(["navs"]),
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  // display: block;
  // position: absolute;
  // left: 0;
  // top: 70px;
  // bottom: 0;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  /deep/ .svg-icon {
    margin-right: 14px;
    font-size: 18px;
  }
}
// .sidebar::-webkit-scrollbar {
//   width: 0;
// }
// .sidebar-el-menu:not(.el-menu--collapse) {
//   width: 250px;
// }
.sidebar > ul {
  height: 100%;
}
.el-menu {
  border-right: none;
  /deep/ {
    svg {
      color: #5192ee;
    }
    .el-menu-item.is-active {
      background: #4486e6 !important;
      background: linear-gradient(to right, #639ff7, #1d67d0) !important;
      svg {
        color: white;
      }
    }
  }
}
.el-menu--collapse /deep/ {
  .el-submenu > .el-submenu__title > span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
