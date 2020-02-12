<template>
  <div class="crumbs">
    <el-breadcrumb separator="-">
      <el-breadcrumb-item v-for="item in crumbs" :key="item.index">
        <svg-icon v-if="item.icon" :icon-class="item.icon" />
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("nav");

export default {
  computed: {
    ...mapState(["crumbs"])
  }
};
</script>

<style lang="scss" scoped>
.crumbs {
  float: left;
  padding-left: 15px;
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
  }
}
</style>
