<template>
  <div class="wrapper">
    <div class="left">
      <div class="title">后台管理</div>
      <v-sidebar></v-sidebar>
    </div>
    <div class="right">
      <v-head></v-head>
      <div class="content-box" :class="{ 'content-collapse': collapse }">
        <v-tags></v-tags>
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
          <el-backtop target=".content"></el-backtop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header";
import vSidebar from "./Sidebar";
import vTags from "./Tags";
import bus from "./bus";

import { filterTree } from "@/utils/treeOperations";

import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("nav");

export default {
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    // console.log(process.env);
    // this.getUser();
    this.setCrumbs(this.$route.path);

    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
  methods: {
    ...mapMutations(["setCrumbs", "setNavs"]),
    async getUser() {
      const { data } = await getUser();
      //设置导航
      this.setNavs(filterTree(data.sysSourceTreeDTOList));
      //设置面包屑
      // console.log("created", this.$route.path);
    }
  },
  watch: {
    $route: {
      handler(val) {
        // console.log("watch", val.path);
        //更新面包屑
        this.setCrumbs(val.path);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
}
.left {
  width: 240px;
  background: #242f42;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 22px;
    color: white;
    text-align: center;
    padding: 50px 0 40px;
  }
}
.right {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .content-box {
    flex: 1;
    background: #f1f1f1;
    padding: 10px 15px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      // padding: 10px;
      box-sizing: border-box;
      background: white;
      height: 0;
    }
  }
}

.content-collapse {
  left: 65px;
}
</style>
