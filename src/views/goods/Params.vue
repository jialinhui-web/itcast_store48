<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="分类参数"></my-breadcrumb>
    <el-alert
      class="alert"
      :closable="false"
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon>
    </el-alert>

    <el-row>
      <el-col :span="24">
        请选择商品分类：
        <el-cascader
          expand-trigger="hover"
          :options="options"
          :props="{ label: 'attr_name', value: 'attr_id' }"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">动态参数</el-tab-pane>
      <el-tab-pane label="静态参数" name="only">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 多级下拉，绑定的数据
      options: [],
      selectedOptions: [],
      // tab绑定的数据
      activeName: 'many'
    };
  },
  methods: {
    // 多级下拉，选中内容改变之后
    handleChange() {
    }
  }
};
</script>

<style>
.alert {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
