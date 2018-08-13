<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>

    <el-alert
      class="alert"
      title="添加商品信息"
      :closable="false"
      type="info"
      center
      show-icon>
    </el-alert>

    <!-- 步骤条 -->
    <el-steps
      :active="1"
      finish-status="success"
      align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
  </el-card>
</template>

<script>
export default {

};
</script>

<style>
.alert {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-step__title {
  font-size: 12px;
}
</style>
