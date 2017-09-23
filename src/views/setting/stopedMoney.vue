<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='' prop="id">

      </el-table-column>

      <el-table-column label="类别" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="最小下注" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="拦货金额" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="赔率上限" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="单注上限" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="单项上限" align="center" prop="amount1">
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
      listLoading: false,
      listQuery: {
        title: null
      }
    }
  },
  created() {
  },
  methods: {
    handleCreate() {
    }
  }
}
</script>
