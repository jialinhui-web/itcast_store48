<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-button @click="handleOpenAddDialog" type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="400"
        treeKey="cat_id"
        levelKey="cat_level"
        childKey="children"
        parentKey="cat_pid">
      </el-table-tree-column>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="400">
      </el-table-column> -->
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
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
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addDialogFormVisible">
      <el-form
        :model="form"
        label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类列表">
          <!-- 
            expand-trigger="hover"  鼠标悬停的时候触发
            options 绑定的数据
            v-model 双向绑定
            change-on-select  运行用户选择任意一级选项
            props 设置下拉框中显示数据源中的哪个属性的值
           -->
          <el-cascader
            placeholder="默认添加一级分类"
            clearable
            change-on-select
            expand-trigger="hover"
            :options="options"
            :props="defaultProps"
            v-model="catIds">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 加载treegrid组件  - 局部组件
import ElementTreegrid from 'element-tree-grid';

export default {
  components: {
    'el-table-tree-column': ElementTreegrid
  },
  data() {
    return {
      data: [],
      // 分页数据
      pagenum: 1,
      pagesize: 6,
      // 总共有多少条数据
      total: 0,
      loading: true,
      // 添加商品分类需要的数据
      addDialogFormVisible: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      // 绑定多级选择器使用的数据
      options: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      catIds: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 组件创建完毕，加载分类数据 3层的
    async loadData() {
      this.loading = true;

      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);

      this.loading = false;

      // 判断请求是否成功
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.total = response.data.data.total;
        this.data = response.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 点击添加分类按钮的时候，显示添加分类对话框
    async handleOpenAddDialog() {
      this.addDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      this.options = response.data.data;
    }
  }
};
</script>

<style>
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
