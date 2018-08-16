<template>
  <el-card class="card">
    <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>

    <div ref="chart" style="width: 800px; height: 600px; margin-top: 20px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts';
export default {
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const response = await this.$http.get('reports/type/1');
      // 从服务器获取数据
      let option = response.data.data;

      const data = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      };

      option = { ...data, ...option };

      option.xAxis[0].boundaryGap = false;

      // 初始化echarts
      const myChart = echarts.init(this.$refs.chart);

      myChart.setOption(option);
    }
  }
};
</script>

<style>

</style>
