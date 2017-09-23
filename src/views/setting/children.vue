<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-button type="primary" icon="plus" @click="onSubmit" style="margin-bottom: 20px">添加子账号</el-button>

      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column align="center" label='' prop="id">

        </el-table-column>

        <el-table-column label="序号" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="账号" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="昵称" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="修改时间" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="修改者" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="状态" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="IP" align="center" prop="amount1">
        </el-table-column>
        <el-table-column label="操作" align="center" prop="amount1">
        </el-table-column>
      </el-table>
    </el-form>
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
        region: '0',
        resource: '0'
      },
      listLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>
