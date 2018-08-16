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
          placeholder="请选择商品分类"
          expand-trigger="hover"
          :options="options"
          :props="{ label: 'cat_name', value: 'cat_id' }"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button :disabled="this.selectedOptions.length !== 3" type="primary">添加动态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              <el-tag
                :key="item"
                v-for="item in scope.row.params"
                closable
                @close="handleClose(item, scope.row)">
                {{ item }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="商品参数"
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
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button :disabled="this.selectedOptions.length !== 3" type="primary">添加静态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值"
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
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
      activeName: 'many',
      data: [],
      // 添加动态参数，绑定的数据
      inputVisible: false,
      inputValue: ''
    };
  },
  created() {
    this.loadOptions();
  },
  methods: {
    // 多级下拉，选中内容改变之后
    handleChange() {
      this.loadData();
    },
    // 点击tab栏的时候执行
    handleTabClick() {
      this.loadData();
    },
    // 加载多级下拉的数据
    async loadOptions() {
      const response = await this.$http.get('categories?type=3');
      this.options = response.data.data;
    },
    // 加载表格数据
    async loadData() {
      this.data.length = 0;
      if (this.selectedOptions.length === 3) {
        const response = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`);

        const { meta: { status, msg } } = response.data;

        if (status === 200) {
          this.data = response.data.data;

          // 如果是动态参数的时候。要把attr_vals转换成数组
          if (this.activeName === 'many') {
            this.data.forEach((item) => {
              // 动态给对象增加的成员。vue不会监视它的变化
              // item.params = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');

              const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
              this.$set(item, 'params', arr);
            });
          }
        } else {
          this.$message.error(msg);
        }
      }
    },
    // 点击关闭
    async handleClose(tag, param) {
      // console.log(tag);
      // console.log(param);
      // tag 是标签里面显示的文字
      // param 是动态参数对象  param.params
      // 分类的id     this.selectedOptions
      // 参数的id     param.attr_id
      // categories/:id/attributes/:attrid

      // 删除成功，从界面上把元素删除
      const index = param.params.findIndex((item) => {
        if (tag === item) {
          return true;
        }
      });
      param.params.splice(index, 1);

      const response = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${param.attr_id}`, {
        'attr_vals': param.params.join(','),
        'attr_sel': this.activeName,
        'attr_name': param.attr_name
      });

      // 判断成功还是失败
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 添加动态参数
    handleInputConfirm(row) {
      let inputValue = this.inputValue;
      if (!inputValue) {
        return;
      }

      row.params.push(inputValue);
      // 向服务器发送请求
      

      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.alert {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
