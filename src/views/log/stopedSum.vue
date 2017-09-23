<template>
  <div class="app-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      show-summary
      style="width: 100%">
      <el-table-column
        prop="id"
        label="操作账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="被操作账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="操作内容"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="操作时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="操作ip"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [{
        id: 0,
        amount1: 5,
        qihao: '2017091822',
        amount2: 10

      },{
        id: 1,
        amount1: 10,
        qihao: '2017092212',
        amount2: 20

      }],
      form: {
        number: ''
      },

      listLoading: false
    }
  },
  methods: {
    handleSearch(){},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

