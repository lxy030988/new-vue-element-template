<template>
  <div v-if="!item.hidden">
    <template v-if="item.children">
      <el-submenu :index="item.id.toString()">
        <template slot="title">
          <item :icon="item.icon" :title="item.name" />
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.id"
          :item="child"
        />
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path">
        <item :icon="item.icon" :title="item.name" />
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "SidebarItem", // 递归组件名称很重要
  components: { Item },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {}
};
</script>
