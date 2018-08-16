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
        prop="order_number"
        label="订单编号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="80">
      </el-table-column>
      <el-table-column
        label="是否付款"
        width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.order_pay === 1">付款</el-tag>
          <el-tag v-else type="danger">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="80">
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
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
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get('orders?pagenum=1&pagesize=10');
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data.goods;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>

</style>
