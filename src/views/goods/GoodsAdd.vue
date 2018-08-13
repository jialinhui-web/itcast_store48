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
</style>
