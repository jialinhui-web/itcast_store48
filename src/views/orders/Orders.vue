<template>
  <el-card class="card">
    <my-breadcrumb level1="订单管理" level2="订单列表"></my-breadcrumb>
    <el-table
      border
      stripe
      :data="data"
      style="width: 100%; margin-top: 10px">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop=""
        label="订单编号"
        width="250">
      </el-table-column>
      <el-table-column
        prop=""
        label="订单价格"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="是否付款"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="是否发货"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="下单时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  }
};
</script>

<style>

</style>
