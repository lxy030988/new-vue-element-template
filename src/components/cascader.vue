<template>
  <div class="cascader">
    <el-cascader
      clearable
      filterable
      v-model="selectedOptions"
      :options="options"
      :props="cascaderProps"
      @change="cascaderChange"
      :disabled="disabled"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "cascader",
  props: ["selected", "options", "disabled", "value"],
  data() {
    return {
      cascaderProps: {
        expandTrigger: "hover",
        checkStrictly: true,
        value: this.value || "id",
        label: "name",
        children: "children"
      },
      selectedOptions: []
    };
  },
  created() {
    if (this.selected) {
      this.selectedOptions = this.getDefaultValueArr(
        this.options,
        this.selected,
        []
      );
    } else {
      this.selectedOptions = [];
    }
  },
  mounted: function() {},
  methods: {
    cascaderChange(value) {
      console.log(value);
      const res = value.length > 0 ? value[value.length - 1] : null;
      this.$emit("refSelect", res);
    },
    //获取部门的父级id
    getFatherId(data, id) {
      for (let value of data) {
        if (value.id === id) {
          return value.parentId;
        } else {
          if (value.children) {
            let fatherId = this.getFatherId(value.children, id);
            if (fatherId !== undefined) {
              return fatherId;
            }
          }
        }
      }
    },
    //获取cascader初始值arr
    getDefaultValueArr(data, id, arr) {
      if (id === 0) {
        return arr;
      } else {
        arr.unshift(id);
        let fatherId = this.getFatherId(data, id);
        this.getDefaultValueArr(data, fatherId, arr);
      }
      return arr;
    }
  },
  watch: {
    selected: {
      handler(val, oldVal) {
        // console.log(val, oldVal);
        if (val) {
          this.selectedOptions = this.getDefaultValueArr(this.options, val, []);
        } else {
          this.selectedOptions = [];
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.el-cascader {
  width: 100%;
  /deep/ .el-input {
    width: 100%;
  }
}
</style>
